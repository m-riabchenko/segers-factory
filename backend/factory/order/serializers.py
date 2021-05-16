from rest_framework import serializers

from factory.order.models import Order, OrderItem, Delivery


class OrderSerializer(serializers.ModelSerializer):
    cart_items = serializers.ListField(required=True, write_only=True)
    delivery = serializers.DictField(required=False, write_only=True)

    class Meta:
        model = Order
        fields = ["first_name", "last_name", "email", "phone", "order_message", "delivery",
                  "cart_items"]

    def create(self, validated_data):
        cart_items = validated_data.pop('cart_items')
        if 'delivery' in validated_data:
            delivery = validated_data.pop("delivery")
            order = Order.objects.create(**validated_data)
            Delivery.objects.create(order_id=order.id, **delivery)
        else:
            order = Order.objects.create(**validated_data)
        for item in cart_items:
            OrderItem.objects.create(order=order, product_id=item['id'], price=item['price'],
                                     quantity=item['quantity'])
        return order
