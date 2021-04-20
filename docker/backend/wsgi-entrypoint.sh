#!/bin/sh

until cd /app/backend
do
    echo "Waiting for server volume..."
done

python manage.py makemigrations

until python manage.py migrate
do
    echo "Waiting for db to be ready..."
    sleep 2
done

python manage.py collectstatic --noinput

gunicorn factory.wsgi --bind 0.0.0.0:8000 --workers 4 --threads 4