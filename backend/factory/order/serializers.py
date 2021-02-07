from django.shortcuts import get_object_or_404
from rest_framework import serializers

from factory.cart.models import Cart
from factory.order.models import Order, OrderItem


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["first_name", "last_name", "email", "address", "postal_code", "city"]

    def create(self, validated_data):
        cart = get_object_or_404(Cart, user=self.context['request'].user)
        order = Order.objects.create(**validated_data)
        for items in cart.items.all():
            OrderItem.objects.create(order=order, product=items.product, price=items.price,
                                     quantity=items.count)
        cart.delete()
        return order
