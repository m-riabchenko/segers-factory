from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.exceptions import ParseError
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from factory.catalog.models import Category, Product, Review, Rating
from factory.catalog import serializers
from factory.catalog.services import ProductFilter


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = serializers.CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(methods=['get'], detail=True)
    def filters(self, request, pk=None):
        return Response(data={"filters": Category.objects.get(pk=pk).schema_filters},
                        status=status.HTTP_200_OK)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = serializers.ProductSerializer
    parser_classes = (MultiPartParser, JSONParser)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter

    @action(methods=['put'], detail=True)
    def upload_image(self, request, pk=None):
        """Upload image and save"""
        try:
            file = request.data['image']
        except KeyError:
            raise ParseError('Request has no resource file attached')
        product = self.get_queryset().filter(pk=pk).first()
        if product is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        product.image = file
        product.save()
        return Response(status=status.HTTP_200_OK)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = serializers.ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = serializers.RatingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

