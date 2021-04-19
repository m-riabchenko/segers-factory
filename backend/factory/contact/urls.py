from django.urls import path, include
from rest_framework.routers import DefaultRouter

from factory.contact import views

router = DefaultRouter()
router.register(r'contact-us', views.ContactUsViewSet)
router.register(r'newsletters', views.NewsletterEmailViewSet)

urlpatterns = [
    path('', include(router.urls)),
]