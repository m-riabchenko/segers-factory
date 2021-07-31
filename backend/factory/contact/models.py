from django.db import models


class NewsletterEmail(models.Model):
    email = models.EmailField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True, blank=True, null=True)

    class Meta:
        verbose_name = "Підписка на розсилку"
        verbose_name_plural = "Підписки на розсилку"

    def __str__(self):
        return f"{self.email}"


class ContactUs(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20)
    message = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True, blank=True, null=True)

    class Meta:
        verbose_name = "Повідомлення з форми зворотного зв'язку"
        verbose_name_plural = "Повідомлення з форми зворотного зв'язку"

    def __str__(self):
        return f"{self.full_name}"