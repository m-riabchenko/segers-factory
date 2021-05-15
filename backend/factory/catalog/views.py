from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.exceptions import ParseError
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
        limit = int(request.GET.get('limit', '20'))
        offset = int(request.GET.get('offset', '0'))
        if limit > 100:
            return Response(data={"error": "limit parameters can't be more than 100"})
        product_filters = services.preparation_query_params(request.GET, ProductFacetedSearch().facets)
        res = ProductFacetedSearch(filters=product_filters)[offset:offset + limit].execute()
        return Response(
            data={
                "count": res.hits.total.value,
                "options": services.get_options_in_needed_format(res.facets),
                "products": services.extract_fields_from_faceted_response(res),
                "range_price": {
                    "max": res.aggs.max_price.value,
                    "min": res.aggs.min_price.value}},
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
