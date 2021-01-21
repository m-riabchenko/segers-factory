from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.core.mail import send_mail


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, is_staff=False, is_admin=False):
        """
        Creates and saves a User with the given email and password.
        """

        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(
            email=email,
            staff=is_staff,
            admin=is_admin,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, password=None):
        return self.create_user(email, password, True, False)

    def create_superuser(self, email, password=None):
        return self.create_user(email, password, True, True)


class User(AbstractBaseUser):
    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        'username',
        max_length=150,
        validators=[username_validator],
        error_messages={
            'unique': "A user with that username already exists.",
        },
    )
    email = models.EmailField('email address', unique=True)
    first_name = models.CharField('first name', max_length=150, blank=True, null=True)
    last_name = models.CharField('last name', max_length=150, blank=True, null=True)
    phone_number = models.CharField('phone number', max_length=15, blank=True, null=True)
    active = models.BooleanField(
        'active',
        default=True,
        help_text=(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.')
    )
    staff = models.BooleanField(
        'staff status',
        default=False,
        help_text='Designates whether the user can log into this admin site.'
    )
    admin = models.BooleanField(
        'superuser status',
        default=False,
        help_text='Designates whether this user can be a super user.'
    )

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def __str__(self):
        return self.email

    def get_full_name(self):
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_active(self):
        return self.active

    @property
    def is_admin(self):
        return self.admin
