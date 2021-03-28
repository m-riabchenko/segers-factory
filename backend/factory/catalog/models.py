from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from mptt.models import MPTTModel, TreeForeignKey

User = get_user_model()


class Category(MPTTModel):
    """
    Tree model of categories for product
    """
    name = models.CharField(max_length=50, unique=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    schema_attributes = models.JSONField(null=True, blank=True)
    schema_filters = models.JSONField(null=True, blank=True)
    parent = TreeForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True, related_name='children'
    )

    class MPTTMeta:
        order_insertion_by = ['name']

    def __str__(self):
        return f"{self.name}"


def product_file_name(instance, filename):
    return '/'.join(['products', str(instance.name), filename])


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="product")
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    image = models.ImageField(upload_to=product_file_name, blank=True)
    available = models.BooleanField(default=True)
    rating_avg = models.FloatField(blank=True, null=True,
                                   validators=[MinValueValidator(1), MaxValueValidator(5)])
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    attributes = models.JSONField()

    class Meta:
        ordering = ('name',)
        index_together = (('id', 'slug'),)

    def __str__(self):
        return f"{self.name}"


class Review(MPTTModel):
    """
    Tree model of reviews for product
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField("content review", max_length=5000)
    parent = TreeForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True, related_name='children'
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField("rating value", blank=True, null=True,
                                         validators=[MinValueValidator(1), MaxValueValidator(5)])

    def __str__(self):
        return f"{self.user.first_name} - {self.product.name}"
