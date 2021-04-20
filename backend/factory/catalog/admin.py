from django.contrib import admin
from django.utils.safestring import mark_safe
from django_admin_listfilter_dropdown.filters import  RelatedDropdownFilter
from mptt.admin import MPTTModelAdmin

from factory.catalog.models import Category, Product

from factory.settings import HOST


@admin.register(Category)
class CategoryAdmin(MPTTModelAdmin):
    list_display = ['name', 'date_created', 'date_updated']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    fields = (('name', 'price'), 'description', 'category')
    readonly_fields = ('created', 'updated')
    list_display = (
        'name', 'price', 'category', 'rating_avg', 'sale', 'get_image', 'available', 'created',
        'updated', 'update_product')
    list_editable = ('price', 'sale', 'available')
    list_filter = (
        ('category', RelatedDropdownFilter),
        ('available', admin.BooleanFieldListFilter),
    )
    search_fields = ('name', 'category__name')
    ordering = ('-created',)
    list_display_links = ('update_product',)
    change_list_template = "admin/change_list_product.html"

    def has_add_permission(self, request):
        return False

    def get_image(self, obj):
        image = obj.image_set.get(name="main-image")
        return mark_safe(f'<img src={image.image.url} width="50">')

    def update_product(self, obj):
        return mark_safe(
            f'<a href="{HOST}/dashboard/product-update/{obj.pk}" target="_blank"><input type="button" value="update" /></a>')
