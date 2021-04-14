import os

from django.db.models import Max, Min, Count
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.exceptions import ParseError
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from factory.catalog.models import Category, Product, Review, Image
from factory.catalog import serializers, services
from factory.catalog.serializers import ProductSerializer
from django_filters import rest_framework as filters


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = serializers.CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(methods=['get'], detail=True)
    def filters(self, request, pk=None):
        return Response(data={"filters": Category.objects.get(pk=pk).schema_filters},
                        status=status.HTTP_200_OK)


class ProductFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')
    attr = filters.CharFilter(field_name="attributes", method='filter_product_attr')

    @staticmethod
    def filter_product_attr(queryset, name, value):
        """
        Filter product by attributes which saved in json field
        """
        attr_params_dict = services.format_attr_params_to_dict(value)
        queries = services.get_queries_by_attr_params(attr_params_dict)
        return queryset.filter(queries)

    class Meta:
        model = Product
        fields = ['category', 'min_price', 'max_price']


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().prefetch_related('image_set')
    serializer_class = serializers.ProductSerializer
    parser_classes = (MultiPartParser, JSONParser)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = ProductFilter
    ordering_fields = ["price"]

    def list(self, request):
        if request.GET.get('attr') and not request.GET.get('category'):
            return Response(
                data={"message": "Chose category. Category params is required!"},
                status=status.HTTP_404_NOT_FOUND
            )
        products = self.filter_queryset(self.get_queryset())
        serializer = ProductSerializer(products, many=True)
        aggregate = products.aggregate(Max('price'), Min('price'), count=Count('id'))
        return Response(data={
            "options": services.get_options_for_product_filter(products, request.GET.get('attr'),
                                                               request.GET.get('category')),
            "quantity": aggregate['count'],
            "products": serializer.data,
            "range_price": {
                "min": aggregate["price__min"],
                "max": aggregate["price__max"]
            }
        })

    @action(methods=['put'], detail=True)
    def upload_image(self, request, pk=None):
        """Upload image and save"""
        try:
            files = request.FILES.getlist('files')
            print(request.FILES.getlist('files'))
        except KeyError:
            raise ParseError('Request has no resource file attached')
        for image in files:
            image_obj, _ = Image.objects.get_or_create(name=image.name.split('.')[0], product_id=pk)
            image_obj.image = image
            image_obj.save()
        return Response(status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True)
    def reviews(self, request, pk=None):
        product = Product.objects.get(id=pk)
        reviews = product.review_set.filter(parent__isnull=True).distinct()
        serializer = serializers.ReviewSerializer(reviews, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.filter(children__isnull=False)
    serializer_class = serializers.ReviewSerializer

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)
