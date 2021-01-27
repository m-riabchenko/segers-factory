from rest_framework import serializers

from factory.cart.models import Cart, CartItem


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'

    def create(self, validated_data):
        cart, _ = Cart.objects.get_or_create(user=self.context['request'].user)
        cart_item = None
        for item in cart.items.all():
            if validated_data["product"].id == item.product.id:
                item.count += validated_data["count"]
                cart_item = item

        if not cart_item:
            cart_item = CartItem.objects.create(**validated_data)
            cart.items.add(cart_item)

        cart_item.price = cart_item.product.price
        cart_item.total = cart_item.get_item_total_price()
        cart_item.save()

        cart.total = cart.get_cart_total_price()
        cart.save()
        return cart_item

    def update(self, instance, validated_data):
        instance.count = validated_data.get('count', instance.count)
        instance.product = validated_data.get('product', instance.product)
        instance.total = instance.get_item_total_price()
        instance.save()
        cart = Cart.objects.get(user=self.context['request'].user)
        cart.total = cart.get_cart_total_price()
        cart.save()
        return instance


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = ['items', 'total']
