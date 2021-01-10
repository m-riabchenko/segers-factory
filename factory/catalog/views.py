from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.exceptions import ParseError
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response

from factory.catalog.models import Category, Product
from factory.catalog.serializers import CategorySerializer, ProductSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    parser_classes = (MultiPartParser,)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

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
