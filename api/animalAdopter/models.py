from django.db import models

def animal_image_upload(instance, filename):
    return f'animal_images/{filename}'

class AnimalModel(models.Model):
    name = models.CharField(max_length = 280, default = '')
    age = models.CharField(max_length = 280)
    gender = models.CharField(max_length = 280)
    price = models.CharField(max_length = 280)
    type = models.CharField(max_length = 280)
    specialNeeds = models.CharField(max_length = 280, default = '')
    about = models.CharField(max_length = 280)
    location = models.CharField(max_length = 280)
    contact = models.CharField(max_length = 280, default = '')
    images = models.ManyToManyField('AnimalImage')
    specialNeeds = models.CharField(max_length = 280, default = 'false')
    about = models.CharField(max_length = 280)
    specialOne = models.CharField(max_length = 280, default = 'false')
    specialTwo = models.CharField(max_length = 280, default = 'false')
    specialThree = models.CharField(max_length = 280, default = 'false')

class AnimalImage(models.Model):
    image = models.ImageField(upload_to='animal_images')

class UserModel(models.Model):
    name = models.CharField(max_length = 280, default = '')
    age = models.CharField(max_length = 280)
    gender = models.CharField(max_length = 280)
    location = models.CharField(max_length = 280)
    contact = models.CharField(max_length = 280, default = '')
    isShelter = models.CharField(max_length = 280, default = 'no')
