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
from .views import index
from .views import get_animal_models
from .views import create_animal_model, user_profile_view, user_animals_view, animals_by_type_view
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import LoginView, LogoutView, SignUpView, UserProfileCreateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index),
    path('api/animalAdopter/models', get_animal_models, name='get_animal_models'),
    path('api/animalAdopter/create_animal_model', create_animal_model, name='create_animal_model'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/signup/', SignUpView.as_view(), name='signup'),
    path('api/user_profile/', UserProfileCreateView.as_view(), name='user_profile_create'),
    path('api/user/profile/<str:username>/', user_profile_view, name='user-profile'),
    path('api/user/animals/<str:username>/', user_animals_view, name='user-animals'),
    path('api/animals/<str:animal_type>/', animals_by_type_view, name='animals_by_type'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
