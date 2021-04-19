from django.shortcuts import render
from rest_framework import viewsets

from factory.contact import serializers
from factory.contact.models import ContactUs, NewsletterEmail


class ContactUsViewSet(viewsets.ModelViewSet):
    queryset = ContactUs.objects.all()
    serializer_class = serializers.ContactUsSerializer


class NewsletterEmailViewSet(viewsets.ModelViewSet):
    queryset = NewsletterEmail.objects.all()
    serializer_class = serializers.NewsletterEmailSerializer
