# Generated by Django 4.2.10 on 2024-03-05 01:41

import animalAdopter.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('animalAdopter', '0002_animalmodel_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='animalmodel',
            name='contact',
            field=models.CharField(default='', max_length=280),
        ),
        migrations.AlterField(
            model_name='animalmodel',
            name='image',
            field=models.ImageField(max_length=144, null=True, upload_to=animalAdopter.models.animal_image_upload),
        ),
    ]
