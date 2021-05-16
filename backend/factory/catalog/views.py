from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.exceptions import ParseError
from rest_framework.generics import get_object_or_404
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.response import Response

from factory.catalog.documents import ProductFacetedSearch
from factory.catalog.models import Category, Product, Review, Image
from factory.catalog import serializers, services


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = serializers.CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(methods=['get'], detail=True)
    def filters(self, request, pk=None):
        return Response(data={"filters": Category.objects.get(pk=pk).schema_filters},
                        status=status.HTTP_200_OK)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().prefetch_related('image_set')
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
        except ValueError:
            return Response(
                data={"error": "ValueError. Query parameter has incorrect input value type"},
                status=status.HTTP_400_BAD_REQUEST)

        product_filters = services.preparation_query_params(request.query_params,
                                                            ProductFacetedSearch.facets)
        faceted_search = ProductFacetedSearch(
            query={
                "search": request.GET.get('search', None),
                "price": {"max_price": max_price, "min_price": min_price}},
            filters=product_filters)

        if not product_filters:
            # sets default facets
            faceted_search.facets = services.generate_facets(schema=[])

        if category_id:
            # set facets which belong only chosen category
            category = get_object_or_404(Category, id=category_id)
            faceted_search.facets = services.generate_facets(category.schema_attributes)

        response = faceted_search[offset:offset + limit].execute()

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
