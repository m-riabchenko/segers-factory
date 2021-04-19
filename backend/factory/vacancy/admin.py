from ckeditor.widgets import CKEditorWidget
from django.contrib import admin

# Register your models here.
from django import forms

from factory.vacancy.models import Vacancy, Resume


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'updated')
    list_display = ("first_name",  "last_name", "phone", "email", "resume")
    search_fields = ('first_name', 'last_name', 'phone', 'email')
    ordering = ('-created',)

class VacancyAdminForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorWidget())
    class Meta:
        model = Vacancy
        fields = "__all__"


class VacancyAdmin(admin.ModelAdmin):
    form = VacancyAdminForm
    readonly_fields = ('created', 'updated')
    list_display = ("position", "available")
    list_editable = ('available',)
    search_fields = ('position',)
    ordering = ('-created',)


admin.site.register(Vacancy, VacancyAdmin)
