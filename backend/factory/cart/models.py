from django.contrib.auth import get_user_model
from django.db import models

from factory.catalog.models import Product

User = get_user_model()


class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.DecimalField("price the product", default=0.00, max_digits=10, decimal_places=2)
    total = models.DecimalField("total price", default=0.00, max_digits=10, decimal_places=2)
    count = models.PositiveIntegerField("count of products")

    def __str__(self):
        return f"CartItem <product: {self.product.name}, count: {self.count}>"

    def get_item_total_price(self):
        return self.price * self.count

    class Meta:
        ordering = ["id"]


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total = models.DecimalField("total price", default=0.00, max_digits=10, decimal_places=2)
    items = models.ManyToManyField(CartItem, verbose_name="products")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart <total: {self.total}>"

    def get_cart_total_price(self):
        return sum(item.get_item_total_price() for item in self.items.all())

