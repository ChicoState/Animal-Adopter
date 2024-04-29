from django.db import models
from django.contrib.auth.models import User


def animal_image_upload(instance, filename):
    return f'animal_images/{filename}'

def get_default_user():
    return User.objects.get(username='admin').id


class AnimalModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='animals', default=get_default_user)
    name = models.CharField(max_length = 280, default = '')
    age = models.CharField(max_length = 280)
    gender = models.CharField(max_length = 280)
    price = models.CharField(max_length = 280)
    type = models.CharField(max_length = 280)
    specialNeeds = models.CharField(max_length = 280, default = '')
    about = models.CharField(max_length = 280)
    location = models.CharField(max_length = 280)
    contact = models.CharField(max_length = 280, default = '')
    image1 = models.ImageField(upload_to=animal_image_upload, max_length = 144, null=True)
    image2 = models.ImageField(upload_to=animal_image_upload, max_length = 144, null=True)
    image3 = models.ImageField(upload_to=animal_image_upload, max_length = 144, null=True)
    image4 = models.ImageField(upload_to=animal_image_upload, max_length = 144, null=True)
    image5 = models.ImageField(upload_to=animal_image_upload, max_length = 144, null=True)
    about = models.CharField(max_length = 280)
    doesntLikeKids = models.CharField(max_length = 280, default = 'false')
    doesntLikeMen = models.CharField(max_length = 280, default = 'false')
    isEnergetic = models.CharField(max_length = 280, default = 'false')
    isFixed = models.CharField(max_length = 280, default = 'false')

class UserModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', default = '')
    name = models.CharField(max_length=280, default='')
    age = models.CharField(max_length=280, default = '')
    gender = models.CharField(max_length=280, default = '')
    location = models.CharField(max_length=280, default = '')
    contact = models.CharField(max_length=280, default='')
    isShelter = models.CharField(max_length=280, default='no')

