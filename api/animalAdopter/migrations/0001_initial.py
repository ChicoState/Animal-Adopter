# Generated by Django 4.2.10 on 2024-02-26 21:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AnimalModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('age', models.CharField(max_length=280)),
                ('gender', models.CharField(max_length=280)),
                ('price', models.CharField(max_length=280)),
                ('type', models.CharField(max_length=280)),
                ('location', models.CharField(max_length=280)),
            ],
        ),
    ]