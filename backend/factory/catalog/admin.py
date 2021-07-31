from django.contrib import admin
from django.utils.safestring import mark_safe
from django_admin_listfilter_dropdown.filters import RelatedDropdownFilter
from mptt.admin import MPTTModelAdmin

from factory.catalog.models import Category, Product, Review


@admin.register(Review)
class ReviewAdmin(MPTTModelAdmin):
    list_display = ["full_name", "email", "parent", "product", "created"]
    search_fields = ('full_name', "email")


@admin.register(Category)
class CategoryAdmin(MPTTModelAdmin):
    list_display = ['name', "parent", 'date_created', 'date_updated', "update_category"]
    search_fields = ('name',)
    change_list_template = "admin/change_list_category.html"
    list_display_links = ('update_category',)
    def has_add_permission(self, request):
        return False

    def update_category(self, obj):
        return mark_safe(
            f'<a href="/dashboard/category/{obj.pk}" target="_blank"><input type="button" value="оновити" /></a>')



@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    fields = ("category", ('name', "price"), "description", ("sale", "rating_avg"), "available",
              "attributes", ('created', 'updated'))
    readonly_fields = ('created', 'updated')
    list_display = (
        'id', 'name', 'price', 'category', 'rating_avg', 'sale', 'product_image', 'available',
        'created', 'updated', 'update_product')
    list_editable = ('price', 'sale', 'available')
    list_filter = (
        ('category', RelatedDropdownFilter),
        ('available', admin.BooleanFieldListFilter),
    )
    search_fields = ('name', 'category__name')
    ordering = ('-created',)
    list_display_links = ('update_product',)
    change_list_template = "admin/change_list_product.html"

    def get_form(self, request, *args, **kwargs):
        form = super(ProductAdmin, self).get_form(request, *args, **kwargs)
        form.request = request
        return form

    def has_add_permission(self, request):
        return False

    def product_image(self, obj):
        image = obj.image_set.get(name="main-image")
        return mark_safe(f'<img src={image.image.url} width="50">')

    def update_product(self, obj):
        return mark_safe(
            f'<a href="/dashboard/product-update/{obj.pk}" target="_blank"><input type="button" value="оновити" /></a>')
