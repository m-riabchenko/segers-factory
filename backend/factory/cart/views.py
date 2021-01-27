from rest_framework import generics, permissions, status
from rest_framework.response import Response

from factory.cart.models import CartItem, Cart
from factory.cart.serializers import CartItemSerializer, CartSerializer


class CartList(generics.ListAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        user = self.request.user
        if not user.id:
            return Response(data=None)
        else:
            cart = Cart.objects.get(user=user)
            serializer = self.get_serializer(cart)
            return Response(serializer.data)


class CartItemList(generics.ListCreateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]


class CartItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def destroy(self, *args, **kwargs):
        serializer = self.get_serializer(self.get_object())
        super().destroy(*args, **kwargs)
        cart = Cart.objects.get(user=self.request.user)
        cart.total = cart.get_cart_total_price()
        cart.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
