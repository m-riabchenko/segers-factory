from rest_framework import serializers

from factory.cart.models import Cart, CartItem
from factory.catalog.models import Product


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'

    def create(self, validated_data):
        item = CartItem.objects.create(**validated_data)
        cart, _ = Cart.objects.get_or_create(user=self.context['request'].user)
        cart.total = cart.get_total_price()
        cart.items.add(item)
        cart.save()
        return item

    def update(self, instance, validated_data):
        instance.count = validated_data.get('count', instance.count)
        instance.product = validated_data.get('product', instance.product)
        instance.save()
        cart = Cart.objects.get(user=self.context['request'].user)
        cart.total = cart.get_total_price()
        cart.save()

        return instance
