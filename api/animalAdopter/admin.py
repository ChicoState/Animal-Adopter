from django.contrib import admin
from . import models
from .models import UserModel, AnimalModel

@admin.register(UserModel)
class UserModelAdmin(admin.ModelAdmin):
    list_display = [field.name for field in UserModel._meta.fields]  # This will display all fields

@admin.register(AnimalModel)
class AnimalModelAdmin(admin.ModelAdmin):
    list_display = [field.name for field in AnimalModel._meta.fields]