import io

from PIL import Image
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken

from factory.catalog.models import Category, Product

User = get_user_model()


class CategoryTest(APITestCase):
    def setUp(self):
        self.url = "/api/shop/categories/"
        self.user = User.objects.create_superuser(email="example@mail.com", password="pass")
        self.token = AccessToken.for_user(self.user)
        self.category = Category.objects.create(
            name="TestCategory",
            parent=None,
            schema_attributes=[{
                "name": "color",
                "type": "string",
                "label": "color",
                "required": 1},
            ],
            schema_filters={})
        self.valid_payload = {
            'name': 'Test_payload',
            'schema_attributes': [{
                "name": "color",
                "type": "string",
                "label": "color",
                "required": 1},
            ],
            'schema_filters': {},
            'parent': None
        }
        self.invalid_payload = {
            'name': '',
            'schema_attributes': 4,
            'schema_filters': 5,
            'parent': None
        }

    def test_get_valid_single_category(self):
        response = self.client.get(f'{self.url}{self.category.id}/')
        self.assertEqual(Category.objects.get().name, 'TestCategory')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_category(self):
        response = self.client.get(f'{self.url}30/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_valid_category(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_category(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.post(self.url, self.invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_invalid_category_without_token(self):
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_valid_update_category(self):
        url = f"{self.url}{self.category.id}/"
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.put(url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_update_category(self):
        url = f"{self.url}{self.category.id}/"
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.put(url, self.invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class ProductTest(APITestCase):
    def setUp(self):
        self.url = "/api/shop/products/"
        self.user = User.objects.create_superuser(email="example@mail.com", password="pass")
        self.token = AccessToken.for_user(self.user)
        self.category = Category.objects.create(
            name="TestCategory",
            parent=None,
            schema_attributes=[{
                "name": "color",
                "type": "string",
                "label": "color",
                "required": 1},
            ],
            schema_filters={})
        self.product = Product.objects.create(
            category=self.category,
            name="TestProduct",
            description="description",
            price=145.5,
            attributes={"color": "white"}
        )
        self.valid_payload = {
            "category": self.category.id,
            'name': 'Test_payload',
            'description': "description",
            'price': 200,
            'sale': 10,
            'attributes': {"color": "white"}
        }
        self.invalid_payload = {
            "category": self.category.id,
            'name': 'Test_payload',
            'description': "description",
            'price': "200",
            'attributes': "color, white"
        }

    def test_get_valid_single_product(self):
        response = self.client.get(f'{self.url}{self.product.id}/')
        self.assertEqual(Product.objects.get().name, 'TestProduct')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_product(self):
        response = self.client.get(f'{self.url}30/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_valid_product(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.get(
            id=self.valid_payload['category']).schema_filters, {"color": ["white"]})

    def test_create_invalid_product(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.post(self.url, self.invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_valid_update_product(self):
        url = f"{self.url}{self.product.id}/"
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.put(url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_update_product(self):
        url = f"{self.url}{self.product.id}/"
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.put(url, self.invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_valid_patch_sale(self):
        url = f"{self.url}{self.product.id}/"
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.patch(url, {'sale': 10}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_patch_sale(self):
        url = f"{self.url}{self.product.id}/"
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.patch(url, {"sale": "10%"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def generate_image_list(self):
        image_list = []
        for index in range(4):
            file = io.BytesIO()
            image = Image.new('RGBA', size=(100, 100), color=(155, 0, 0))
            image.save(file, 'png')
            if not index:
                file.name = 'main_image.png'
            else:
                file.name = f'secondary_image_{index}.png'
            file.seek(0)
            image_list.append(file)
        return image_list

    def test_upload_images_product(self):
        url = f"{self.url}{self.product.id}/upload_image/"
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.put(url, {"files": self.generate_image_list()}, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data["images"],
            {
                'main_image': f'/media/products/{self.product.name}/main_image.png',
                'secondary_image_1': f'/media/products/{self.product.name}/secondary_image_1.png',
                'secondary_image_2': f'/media/products/{self.product.name}/secondary_image_2.png',
                'secondary_image_3': f'/media/products/{self.product.name}/secondary_image_3.png',
            })
