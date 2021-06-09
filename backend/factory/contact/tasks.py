from django.core.mail import send_mail

from factory.celery import app
from factory.settings import EMAIL_HOST_USER
from factory.contact.models import NewsletterEmail


@app.task(name="send_newsletter")
def send_newsletter():
    all_emails = NewsletterEmail.objects.all()
    send_mail(
        'Subject here',
        'Here is the message.',
        EMAIL_HOST_USER,
        [item.email for item in all_emails],
        fail_silently=False,
    )
