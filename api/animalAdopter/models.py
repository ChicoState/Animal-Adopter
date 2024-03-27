from django.db import models

def animal_image_upload(instance, filename):
    return f'animal_images/{filename}'

class AnimalModel(models.Model):
    name = models.CharField(max_length = 280, default = '')
    age = models.CharField(max_length = 280)
    gender = models.CharField(max_length = 280)
    price = models.CharField(max_length = 280)
    type = models.CharField(max_length = 280)
    location = models.CharField(max_length = 280)
    contact = models.CharField(max_length = 280, default = '')
    image = models.ImageField(upload_to=animal_image_upload, max_length = 144, null=True)
    specialNeeds = models.CharField(max_length = 280, default = '')
    about = models.CharField(max_length = 280)
