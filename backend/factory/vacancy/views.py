from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser

from factory.vacancy import serializers
from factory.vacancy.models import Vacancy, Resume


class VacancyViewSet(viewsets.ModelViewSet):
    queryset = Vacancy.objects.filter(available=True)
    serializer_class = serializers.VacancySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ResumeViewSet(viewsets.ModelViewSet):
    queryset = Resume.objects.all()
    serializer_class = serializers.ResumeSerializer
    parser_classes = (MultiPartParser,)
