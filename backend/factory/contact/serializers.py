from rest_framework import serializers

from factory.contact.models import ContactUs, NewsletterEmail


class NewsletterEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterEmail
        fields = ('id', 'email')


class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = ("id", "full_name", "email", "phone", "message")
