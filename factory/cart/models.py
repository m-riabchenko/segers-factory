from django.contrib.auth.models import User
from django.db import models

from factory.catalog.models import Product


class CartItem(models.Model):
    product = models.ForeignKey(Product, null=True, on_delete=models.CASCADE)
    price = models.DecimalField("price the product", default=0.00, max_digits=10, decimal_places=2)
    count = models.PositiveIntegerField("count of products")

    def __str__(self):
        return f"CartItem <product: {self.product.name}, count: {self.count}>"

    def get_cost(self):
        return self.price * self.count


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total = models.DecimalField("total price", default=0.00, max_digits=10, decimal_places=2)
    items = models.ManyToManyField(CartItem, verbose_name="products")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart <total: {self.total}>"

    def get_total_cost(self):
        return sum(item.get_cost() for item in self.items.all())

