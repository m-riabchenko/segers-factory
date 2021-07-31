import json
import os
import subprocess
from elasticsearch.exceptions import ConnectionError
from elasticsearch_dsl import Search, Q
from elasticsearch_dsl.aggs import Nested, Terms
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.exceptions import ParseError
from rest_framework.generics import get_object_or_404
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.response import Response

from factory.catalog.documents import ProductFacetedSearch
from factory.catalog.models import Category, Product, Review, Image
from factory.catalog import serializers, services, tasks


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = serializers.CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(methods=['get'], detail=True)
    def unique_values(self, request, pk=None):
        """
        Response unique products attribute values
        """
        schema = Category.objects.get(pk=pk).schema_attributes
        s = Search().query('nested', path='category', query=Q("match", category__id=pk))
        for attr in schema:
            s.aggs.bucket(attr["name"],
                          Nested(aggs={'inner': Terms(field=f'attributes.{attr["name"]}')},
                                 path='attributes'))
        try:
            response = s.execute()
        except ConnectionError:
            return Response(data={"error": "Failed connection to Elasticsearch"},
                            status=status.HTTP_404_NOT_FOUND)
        unique_attr_values = {}
        for attr in schema:
            buckets = response.aggs[attr['name']]['inner']['buckets']
            unique_attr_values[attr['name']] = []
            for value in buckets:
                unique_attr_values[attr['name']].append(value['key'])
        return Response(data={"filters": unique_attr_values}, status=status.HTTP_200_OK)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(available=True).prefetch_related('image_set')
    serializer_class = serializers.ProductSerializer
    parser_classes = (MultiPartParser, JSONParser)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    ordering_fields = ["price"]

    def list(self, request, *args, **kwargs):
        try:
            limit = int(request.GET.get('limit', 20))
            offset = int(request.GET.get('offset', 0))
            if limit > 100:
                return Response(data={"error": "limit parameters can't be more than 100"},
                                status=status.HTTP_400_BAD_REQUEST)

            max_price = request.GET.get('max_price', None)
            min_price = request.GET.get('min_price', None)
            if max_price and min_price:
                max_price = int(max_price)
                min_price = int(min_price)
            category_id = int(request.GET.get("category", 0))
            ordering = request.GET.get('ordering', "-rating_avg")
        except ValueError:
            return Response(
                data={"error": "ValueError. Query parameter has incorrect input value type"},
                status=status.HTTP_400_BAD_REQUEST)

        product_filters = services.preparation_query_params(request.query_params,
                                                            ProductFacetedSearch.facets)
        faceted_search = ProductFacetedSearch(
            query={
                "search": request.GET.get('search', None),
                "price": {"max_price": max_price, "min_price": min_price},
            },
            filters=product_filters, sort=[ordering])

        if not product_filters:
            # sets default facets
            faceted_search.facets = services.generate_facets(schema=[])

        if category_id:
            # set facets which belong only chosen category
            category = get_object_or_404(Category, id=category_id)
            faceted_search.facets = services.generate_facets(category.schema_attributes)

        try:
            response = faceted_search[offset:offset + limit].execute()
        except ConnectionError:
            return Response(data={"error": "Failed connection to Elasticsearch"},
                            status=status.HTTP_404_NOT_FOUND)
        return Response(
            data={
                "count": response.hits.total.value,
                "options": services.get_options_in_needed_format(response.facets),
                "products": services.extract_fields_from_faceted_response(response),
                "range_price": {
                    "max": response.aggs.max_price.value,
                    "min": response.aggs.min_price.value}},
            status=status.HTTP_200_OK
        )

    @action(methods=['put'], detail=True)
    def upload_image(self, request, pk=None):
        """Upload image and save"""
        try:
            files = request.FILES.getlist('files')
        except KeyError:
            raise ParseError('Request has no resource file attached')
        for image in files:
            image_obj, _ = Image.objects.get_or_create(name=image.name.split('.')[0], product_id=pk)
            image_obj.image = image
            image_obj.save()
        return Response(data=self.serializer_class(Product.objects.get(pk=pk)).data,
                        status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True)
    def reviews(self, request, pk=None):
        product = Product.objects.get(id=pk)
        reviews = product.review_set.filter(parent__isnull=True).distinct()
        serializer = serializers.ReviewSerializer(reviews, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.filter(children__isnull=False)
    serializer_class = serializers.ReviewSerializer
