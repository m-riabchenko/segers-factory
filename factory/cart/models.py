from django.contrib.auth.models import User
from django.db import models


from factory.catalog.models import Product


class CartItem(models.Model):
    product = models.ForeignKey(Product, null=True, on_delete=models.CASCADE)
    count = models.PositiveIntegerField()

    def __str__(self):
        return f"CartItem <product: {self.product.name}, count: {self.count}>"


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total = models.DecimalField(default=0.00, max_digits=10, decimal_places=2)
    items = models.ManyToManyField(CartItem)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart <total: {self.total}>"

    def get_total_price(self):
        total_price = 0
        for item in self.items.all():
            item_total_price = item.product.price*item.count
            total_price += item_total_price
        return total_price
