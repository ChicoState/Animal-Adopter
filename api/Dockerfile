FROM  python:3.8.13-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /api

# Install Django, Django CORS Headers, Pillow, and Django REST Framework
RUN pip install django django-cors-headers Pillow djangorestframework

# Copy from the current directory of the Dockerfile to /api in the image
COPY . .

EXPOSE 8000
