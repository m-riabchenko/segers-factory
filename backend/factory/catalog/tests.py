from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken

from factory.catalog.models import Category

User = get_user_model()


class CategoryTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_superuser(email="example@mail.com", password="pass")
        self.token = AccessToken.for_user(self.user)
        self.category = Category.objects.create(
            name="Test",
            schema_attributes=[
                {"name": "color", "type": "string", "label": "color", "required": 1},
            ],
            schema_filters={"size": ["S", "M"], "color": ["white", "green"]},
            parent=None)
        self.valid_payload = {
            'name': 'Test_payload',
            'schema_attributes': [
                {"name": "color", "type": "string", "label": "color", "required": 1},
                {"name": "size", "type": "string", "label": "size", "required": 1},
            ],
            'schema_filters': {"size": ["S", "M"], "color": ["white", "green"]},
            'parent': None
        }
        self.invalid_payload = {
            'name': '',
            'schema_attributes': 4,
            'schema_filters': 5,
            'parent': None
        }

    def test_get_valid_single_category(self):
        response = self.client.get(f'/shop/categories/{self.category.id}/')
        self.assertEqual(Category.objects.get().name, 'Test')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_category(self):
        response = self.client.get('/shop/categories/30/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_valid_category(self):
        url = "/shop/categories/"
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.post(url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_category(self):
        url = "/shop/categories/"
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.post(url, self.invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_invalid_category_without_token(self):
        url = "/shop/categories/"
        response = self.client.post(url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_valid_update_category(self):
        url = f"/shop/categories/{self.category.id}/"
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.put(url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_update_category(self):
        url = f"/shop/categories/{self.category.id}/"
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.put(url, self.invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
