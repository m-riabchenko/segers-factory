from rest_framework import serializers

from factory.catalog.models import Category, Product
from factory.catalog.services import get_filters_data


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "schema_attributes", "parent"]


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ["id", "name", "slug", "price", "description", "category", "attributes"]

    def create(self, validated_data):
        product = Product.objects.create(**validated_data)
        category_id = validated_data["category"].id
        category_obj = Category.objects.get(id=category_id)
        category_obj.schema_filters = get_filters_data(category_id)
        category_obj.save()
        return product
