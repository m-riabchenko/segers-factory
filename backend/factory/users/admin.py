from django.contrib import admin

from factory.catalog.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'first_name', 'last_name', 'last_login',
                    'is_active', 'is_staff', 'is_admin')
    readonly_fields = ('last_login',)
    search_fields = ('email', 'first_name', 'last_name', 'username')
    list_filter = (
        ('is_active', admin.BooleanFieldListFilter),
        ('is_staff', admin.BooleanFieldListFilter),
        ('is_admin', admin.BooleanFieldListFilter),
        ('last_login', admin.DateFieldListFilter),
    )
