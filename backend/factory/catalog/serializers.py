from django.shortcuts import get_object_or_404
from rest_framework import serializers

from factory.catalog.models import Category, Product, Review, Rating
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
        """
        Add new data in category field schema_filters after product create
        """
        product = Product.objects.create(**validated_data)
        category_id = validated_data["category"].id
        category_obj = get_object_or_404(Category, id=category_id)
        category_obj.schema_filters = get_filters_data(category_id)
        category_obj.save()
        return product


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["id", "text", "parent", "product"]

    def get_fields(self):
        fields = super(ReviewSerializer, self).get_fields()
        fields['children'] = ReviewSerializer(read_only=True, many=True)
        return fields


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ["id", "product", "rating"]
