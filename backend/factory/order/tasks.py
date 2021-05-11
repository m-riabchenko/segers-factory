from django.core.mail import send_mail

from factory.celery import app
from factory.settings import EMAIL_HOST_USER


@app.task(name="send_delivery_code")
def send_delivery_code(code: str, email: str):
    send_mail(
        subject='Delivery Code',
        message=f"Your delivery code: {code}",
        from_email=EMAIL_HOST_USER,
        recipient_list=[email],
    )