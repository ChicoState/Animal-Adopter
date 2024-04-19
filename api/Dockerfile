FROM python:3.8.13-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /api

# Copy requirements.txt first to leverage Docker cache
COPY requirements.txt /api/

# Install dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application
COPY . .

EXPOSE 8000