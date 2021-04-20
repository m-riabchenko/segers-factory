from rest_framework import viewsets, permissions

from factory.order.models import Order
from factory.order.serializers import OrderSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


