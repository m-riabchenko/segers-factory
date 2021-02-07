from urllib.parse import parse_qs

from django.db.models import Q
from django_filters import rest_framework as filters
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.exceptions import ParseError
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from factory.catalog.models import Category, Product
from factory.catalog.serializers import CategorySerializer, ProductSerializer
from factory.catalog.services import get_filters_data


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(methods=['get'], detail=True)
    def filters(self, request, pk=None):
        return Response(data={"filters": Category.objects.get(pk=pk).schema_filters},
                        status=status.HTTP_200_OK)


class ProductFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')
    order_by = filters.CharFilter(method='order_by_product')
    attr = filters.CharFilter(field_name="attributes", method='filter_product_attributes')

    def filter_product_attributes(self, queryset, name, value):
        queries = Q()
        query_params_list = [item for item in value.split("/") if item.strip()]
        for key, value_ in dict(map(lambda x: x.split("="), query_params_list)).items():
            query = Q()
            for item in value_.split(","):
                query |= Q(attributes__variant__contains=[{key: item}])
            queries &= query
        return queryset.filter(queries)

    def order_by_product(self, queryset, name, value):
        if value == "low-price":
            return queryset.order_by("price")
        elif value == "high-price":
            return queryset.order_by("-price")
        return queryset

    class Meta:
        model = Product
        fields = ['category', 'min_price', 'max_price']


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    parser_classes = (MultiPartParser,)
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter

    @action(methods=['put'], detail=True)
    def upload_image(self, request, pk=None):
        try:
            file = request.data['image']
        except KeyError:
            raise ParseError('Request has no resource file attached')
        product = self.get_queryset().filter(pk=pk).first()
        if product is None:
            return Response(data={"msg": "Product not fount"}, status=status.HTTP_404_NOT_FOUND)
        product.image = file
        product.save()
        return Response(data={"msg": "Image save"}, status=status.HTTP_200_OK)
