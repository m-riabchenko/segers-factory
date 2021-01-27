from itertools import chain
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


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ProductFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')
    category__name = filters.CharFilter(lookup_expr='icontains')
    attr = filters.CharFilter(field_name="attributes", method='filter_product_attributes')

    def filter_product_attributes(self, queryset, name, value):
        db_query = Q()
        for key, value_ in dict(map(lambda x: x.split("="), value.split("/"))).items():
            for item in value_.split(","):
                db_query |= Q(attributes__variant__contains=[{key: item}])
        return queryset.filter(db_query)

    class Meta:
        model = Product
        fields = ['category', 'min_price', 'max_price']


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    parser_classes = (MultiPartParser,)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
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
