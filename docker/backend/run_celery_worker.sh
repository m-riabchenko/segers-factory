#!/bin/sh -x
cd backend
celery -A factory worker -l info