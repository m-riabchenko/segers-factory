from django.contrib import admin

from factory.contact.models import ContactUs, NewsletterEmail


@admin.register(NewsletterEmail)
class NewsletterEmailUsAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'updated')
    list_display = ("email",  "created")
    search_fields = ('email',)
    ordering = ('-created',)


@admin.register(ContactUs)
class ContactUsAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'updated')
    list_display = ("full_name", "phone", "email", "message", "created")
    search_fields = ('full_name', 'phone', "email")
    ordering = ('-created',)
