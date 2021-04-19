from django.urls import path, include
from rest_framework.routers import DefaultRouter

from factory.vacancy import views

router = DefaultRouter()
router.register(r'vacancies', views.VacancyViewSet)
router.register(r'resume', views.ResumeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]