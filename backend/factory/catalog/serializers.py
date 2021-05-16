from django.db.models import Avg
from django.shortcuts import get_object_or_404
from rest_framework import serializers

from factory.catalog.models import Category, Product, Review, Image
from factory.catalog.services import get_filters_data


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "schema_attributes", "parent"]


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ["image"]


class ProductSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField("get_images", read_only=True)

    class Meta:
        model = Product
        fields = ["id", "name", "price", "sale", "description", "category", "attributes",
                  "rating_avg", "images"]

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

    def validate_attributes(self, value):
        try:
            dict(value)
        except ValueError:
            raise serializers.ValidationError("Attributes must be a dict format")
        return value

    def get_images(self, product):
        response_obj = {}
        for img_obj in product.image_set.all():
            response_obj[img_obj.name] = img_obj.image.url
        return response_obj


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["id", "full_name", "email", "text", "parent", "product", "rating", "create"]

    def get_fields(self):
        fields = super(ReviewSerializer, self).get_fields()
        fields['children'] = ReviewSerializer(read_only=True, many=True)
        return fields

    def create(self, validated_data):
        review = Review.objects.create(**validated_data)
        product_id = validated_data["product"].id
        product_obj = get_object_or_404(Product, id=product_id)
        if 'rating' in validated_data:
            count_avg = round(product_obj.review_set.aggregate(avg=Avg('rating'))['avg'], 1)
            product_obj.rating_avg = count_avg
        product_obj.save()
        return review
