# Generated by Django 4.2.11 on 2024-03-13 18:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('animalAdopter', '0004_animalmodel_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='animalmodel',
            name='specialNeeds',
            field=models.CharField(default='', max_length=280),
        ),
    ]