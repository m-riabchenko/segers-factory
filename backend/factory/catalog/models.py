from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.template.defaultfilters import slugify
from mptt.models import MPTTModel, TreeForeignKey

from factory.catalog.storage import OverwriteStorage

User = get_user_model()


class Category(MPTTModel):
    """
    Tree model of categories for product
    """
    name = models.CharField(max_length=50, unique=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    schema_attributes = models.JSONField(null=True, blank=True)
    parent = TreeForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True, related_name='children'
    )

    class MPTTMeta:
        order_insertion_by = ['name']

    class Meta:
        verbose_name = "Категорія"
        verbose_name_plural = "Категорії"

    def __str__(self):
        return f"{self.name}"


def product_file_name(instance, filename):
    return '/'.join(['products', instance.product.name, filename])


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="product")
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    available = models.BooleanField(default=True)
    rating_avg = models.FloatField(blank=True, null=True,
                                   validators=[MinValueValidator(1), MaxValueValidator(5)])
    sale = models.IntegerField('Percentage discount', blank=True, default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True, blank=True, null=True)
    attributes = models.JSONField()

    class Meta:
        ordering = ('name',)
        verbose_name = "Продукт"
        verbose_name_plural = "Продукти"

    def __str__(self):
        return f"{self.name}"

    def save(self, *args, **kwargs):
        self.slug = slugify(f'{self.name} {self.id}')
        super(Product, self).save(*args, **kwargs)


class Image(models.Model):
    name = models.CharField(max_length=30)
    image = models.ImageField(upload_to=product_file_name, storage=OverwriteStorage(), blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Зображення"
        verbose_name_plural = "Зображення"

    def __str__(self):
        return f"{self.product.name} - {self.name} - {self.image}"


class Review(MPTTModel):
    """
    Tree model of reviews for product
    """
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    text = models.TextField("content review", max_length=5000)
    parent = TreeForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True, related_name='children'
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField("rating value", blank=True, null=True,
                                         validators=[MinValueValidator(1), MaxValueValidator(5)])
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Відгук"
        verbose_name_plural = "Відгуки"

    def __str__(self):
        return f"{self.full_name} - {self.product.name}"
