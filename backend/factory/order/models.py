from django.db import models

from factory.catalog.models import Product


class Order(models.Model):
    STATUS = [
        ('Waiting', 'Waiting for confirmation'),
        ('Accepted', 'Accepted'),
        ('In processing', 'In processing'),
        ('Done', 'Done'),
    ]
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    phone = models.CharField(max_length=13)
    order_message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS, default="Waiting")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created',)
        verbose_name = "Замовлення"
        verbose_name_plural = "Замовлення"

    def __str__(self):
        return f'Order {self.first_name} {self.last_name} {self.phone}'


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='order_items', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        verbose_name = "Елемент замовлення"
        verbose_name_plural = "Елементи замовлення"

    def __str__(self):
        return f'OrderItem {self.id}'


class Delivery(models.Model):
    STATUS = [
        ('Waiting', 'Waiting'),
        ('Delivering', 'Delivering'),
        ('Delivered', 'Delivered'),
    ]
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="delivery")
    message = models.TextField()
    code = models.CharField(max_length=20, blank=True, null=True)
    street = models.CharField(max_length=255)
    house_number = models.CharField(max_length=255)
    region = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=10)
    status = models.CharField(max_length=10, choices=STATUS, default="Waiting")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Доставка"
        verbose_name_plural = "Доставка"

    def __str__(self):
        return f'Delivery ({self.id})'