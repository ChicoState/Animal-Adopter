# Generated by Django 3.2.25 on 2024-05-05 21:26

import animalAdopter.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('animalAdopter', '0013_merge_0012_auto_20240429_1930_0012_usermodel_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='usermodel',
            name='image2',
            field=models.ImageField(max_length=144, null=True, upload_to=animalAdopter.models.user_image_upload),
        ),
        migrations.AddField(
            model_name='usermodel',
            name='image3',
            field=models.ImageField(max_length=144, null=True, upload_to=animalAdopter.models.user_image_upload),
        ),
        migrations.AddField(
            model_name='usermodel',
            name='image4',
            field=models.ImageField(max_length=144, null=True, upload_to=animalAdopter.models.user_image_upload),
        ),
        migrations.AddField(
            model_name='usermodel',
            name='image5',
            field=models.ImageField(max_length=144, null=True, upload_to=animalAdopter.models.user_image_upload),
        ),
    ]
