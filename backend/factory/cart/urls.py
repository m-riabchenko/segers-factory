from django.urls import path, include

from factory.cart import views

urlpatterns = [
    path('cart/', views.CartItemList.as_view(), name="cart-list"),
    path('cart/<int:pk>/', views.CartItemDetail.as_view(), name="cart-detail"),
]
