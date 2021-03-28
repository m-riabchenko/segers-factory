from django.db.models import Avg
from django.shortcuts import get_object_or_404
from rest_framework import serializers

from factory.catalog.models import Category, Product, Review
from factory.catalog.services import get_filters_data
from factory.users.serializers import UserSerializer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "schema_attributes", "parent"]


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "slug", "price", "description", "category", "attributes", "rating_avg"]

    def create(self, validated_data):
        """
        Add new data in category field schema_filters after product create
        """
        product = Product.objects.create(**validated_data)
        category_id = validated_data["category"].id
        category_obj = get_object_or_404(Category, id=category_id)
        data = get_filters_data(Product.objects.filter(category_id=category_id))
        for key in data:
            data[key] = list(set(str(data[key]).split(',')))
        category_obj.schema_filters = data
        category_obj.save()
        return product


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ["id", "text", "parent", "product", 'user', 'rating']

    def get_fields(self):
        fields = super(ReviewSerializer, self).get_fields()
        fields['children'] = ReviewSerializer(read_only=True, many=True)
        return fields

    def create(self, validated_data):
        review = Review.objects.create(**validated_data)
        product_id = validated_data["product"].id
        product_obj = get_object_or_404(Product, id=product_id)
        count_avg = round(product_obj.review_set.aggregate(avg=Avg('rating'))['avg'], 1)
        product_obj.rating_avg = count_avg
        product_obj.save()
        return review
