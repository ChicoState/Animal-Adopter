from django.db import models

def animal_image_upload(instance, filename):
    return f'api/animalAdopter/{filename}'

class AnimalModel(models.Model):
    age = models.CharField(max_length = 280)
    gender = models.CharField(max_length = 280)
    price = models.CharField(max_length = 280)
    type = models.CharField(max_length = 280)
    location = models.CharField(max_length = 280)
    image = models.ImageField(upload_to=animal_image_upload, max_length = 144, null=True)
