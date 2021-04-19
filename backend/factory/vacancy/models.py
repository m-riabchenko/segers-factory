from django.db import models


class Vacancy(models.Model):
    position = models.CharField(max_length=255)
    description = models.TextField()
    available = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return f"{self.position}"


class Resume(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=13)
    email = models.EmailField(blank=True, null=True)
    cover_letter = models.TextField(blank=True, null=True)
    resume = models.FileField(upload_to='resume')
    vacancy = models.ForeignKey(Vacancy, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True, blank=True, null=True)
