from django.contrib import admin

from factory.order.models import Order, OrderItem


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'updated')
    list_display = (
        "first_name", "last_name", "email", "phone", "order_message", "delivery", 'done',
        "street", "house_number", "region", "city", "zip_code", "delivery_message",
    )
    list_editable = ('done',)
    search_fields = (
        'first_name', 'last_name', 'email', 'phone', 'street', 'house_number', 'region', 'city',
        'zip_code', 'order_message', 'delivery_message'
    )
    ordering = ('-created',)


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("order", "product", "price", "quantity")
    search_fields = ("order__first_name", "order__last_name", "order__phone", "order__email", "product__name")