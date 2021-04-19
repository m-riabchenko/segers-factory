from rest_framework import serializers

from factory.vacancy.models import Vacancy, Resume


class VacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = ["id", "position", "description"]


class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ["first_name", "last_name", "phone", "cover_letter", "resume", "vacancy"]
