"""
URL configuration for animalAdopter project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from .views import index, get_animal_models, create_animal_model, google_login, create_profile, user_profile
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),  # Assuming you have an index view
    path('api/animalAdopter/models', get_animal_models, name='get_animal_models'),
    path('api/animalAdopter/create_animal_model', create_animal_model, name='create_animal_model'),
    path('google_login/', google_login, name='google_login'),
    path('api/animalAdopter/create_profile', create_profile, name='create_profile'),
    path('api/animalAdopter/user_profile', user_profile, name='user_profile'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
