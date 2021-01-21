from django.contrib import admin
from mptt.admin import MPTTModelAdmin

from factory.catalog.models import Category, Product

admin.site.register(Category, MPTTModelAdmin)
admin.site.register(Product)
