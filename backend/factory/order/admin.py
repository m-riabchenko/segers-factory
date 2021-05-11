from celery.result import AsyncResult
from django.contrib import admin

from factory.order.models import Order, OrderItem, Delivery
from factory.order import tasks


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'updated')
    list_display = (
        "first_name", "last_name", "email", "phone", "order_message", 'status', 'delivery'
    )
    list_editable = ('status',)
    search_fields = (
        'first_name', 'last_name', 'email', 'phone', 'order_message'
    )
    ordering = ('-created',)


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("order", "product", "price", "quantity")
    search_fields = ("order__first_name", "order__last_name", "order__phone",
                     "order__email", "product__name")


@admin.register(Delivery)
class DeliveryAdmin(admin.ModelAdmin):
    list_display = ("id", "order", "status", "code", "street",
                    "house_number", "region", "city", "zip_code")
    search_fields = ("order__first_name", "order__last_name", "order__phone",
                     "order__email", "id", "code", "street",
                     "house_number", "region", "city", "zip_code")
    list_editable = ('status', 'code')
    ordering = ('-created',)

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        # if updated code field send message with code to the order owner
        if obj.code:
            tasks.send_delivery_code.delay(code=obj.code, email=obj.order.email)
            obj.status = "Delivering"
            obj.save()

