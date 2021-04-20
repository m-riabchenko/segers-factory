from rest_framework import serializers

from factory.order.models import Order, OrderItem


class OrderSerializer(serializers.ModelSerializer):
    cart_items = serializers.ListField(required=True, write_only=True)

    class Meta:
        model = Order
        fields = ["first_name", "last_name", "email", "phone", "order_message", "delivery",
                  "street", "house_number", "region", "city", "zip_code", "delivery_message",
                  "cart_items"]

    def create(self, validated_data):
        cart_items = validated_data.pop('cart_items')
        order = Order.objects.create(**validated_data)
        for item in cart_items:
            OrderItem.objects.create(order=order, product_id=item['id'], price=item['price'],
                                     quantity=item['quantity'])
        return order
