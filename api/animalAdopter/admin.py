from django.contrib import admin
from . import models
from .models import UserModel

admin.site.register(models.AnimalModel)

@admin.register(UserModel)
class UserModelAdmin(admin.ModelAdmin):
    list_display = [field.name for field in UserModel._meta.fields]  # This will display all fields