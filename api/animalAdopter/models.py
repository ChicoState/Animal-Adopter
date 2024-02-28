from django.db import models

class AnimalModel(models.Model):
    age = models.CharField(max_length = 280)
    gender = models.CharField(max_length = 280)
    price = models.CharField(max_length = 280)
    type = models.CharField(max_length = 280)
    location = models.CharField(max_length = 280)
    image = models.ImageField(max_length = 144, null=True)
