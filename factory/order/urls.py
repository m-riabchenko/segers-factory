from django.urls import include, path
from rest_framework.routers import DefaultRouter

from factory.order import views

router = DefaultRouter()
router.register(r'orders', views.OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
