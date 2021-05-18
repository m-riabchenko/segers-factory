## Used Stack

#### Python, Django Rest Framework
#### PostgreSQL, Redis
#### Celery
#### Elasticsearch
#### React (Hooks)

## About
Project is designed for a garment factory. 
Implemented functionality: online-shop, publication of vacancies, email newsletter, form for feedback.

Frontend built as a single page application using **React**.
Backend designed based on **REST API** using **Django REST Framework**.
Was necessary to create new type products with different specific attributes without changing database structure. So, the structure of the product catalog was developed by storing special attributes in **JSONB** field, which has **PostgreSQL**. That gives the necessary flexibility to manage attributes and allows to create new types of products using the user interface.
Product filtering is implemented by facet search using **Elasticsearch**.
