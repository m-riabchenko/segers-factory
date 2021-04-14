from django.urls import path, include

from factory.cart import views

urlpatterns = [
    path('cart-me/', views.CartList.as_view(), name="cart-list"),
    path('cart/', views.CartItemCreate.as_view(), name="cart-item-create"),
    path('cart/<int:pk>/', views.CartItemDetail.as_view(), name="cart-item-detail"),
]
