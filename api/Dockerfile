FROM python:3.8.13-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /api

# Install dependencies
COPY requirements.txt /api/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container
COPY . /api

EXPOSE 8000
