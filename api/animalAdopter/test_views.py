from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from .models import AnimalModel, UserModel
from .views import *
import json
from django.core.files.uploadedfile import SimpleUploadedFile


# Factories for creating test instances (if needed)
import factory

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User
    username = factory.Sequence(lambda n: 'user_%d' % n)
    email = factory.LazyAttribute(lambda o: f'{o.username}@example.com')
    password = factory.PostGenerationMethodCall('set_password', 'password')

class UserProfileViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = UserFactory.create()
        self.profile = UserModel.objects.create(user=self.user)
        self.url = reverse('user-profile', kwargs={'username': self.user.username})

    def test_post_method_not_allowed(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, 405)

    def test_non_existent_user_profile(self):
        response = self.client.get(reverse('user-profile', kwargs={'username': 'noone'}))
        self.assertEqual(response.status_code, 404)

class UserAnimalsViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = UserFactory.create()
        self.url = reverse('user-animals', kwargs={'username': self.user.username})

    def test_user_with_no_animals(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)

    def test_non_existent_user_animals(self):
        response = self.client.get(reverse('user-animals', kwargs={'username': 'noone'}))
        self.assertEqual(response.status_code, 404)

class SignUpViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_signup(self):
        url = reverse('signup')
        data = {'username': 'newuser', 'password': 'newpassword123', 'email': 'newuser@example.com'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('token', response.data)

class LoginLogoutTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = UserFactory.create(username='testuser', password='testpass')
        self.user.save()

    def test_login(self):
        url = reverse('login')
        data = {'username': 'testuser', 'password': 'testpass'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)

    def test_logout(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('logout')
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)

class CreateAnimalModelTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = UserFactory.create(username='testuser')
        self.user.set_password('password')
        self.user.save()

    def test_create_animal(self):
        self.client.login(username='testuser', password='password')
        url = reverse('create_animal_model')
        image = SimpleUploadedFile(name='test_image.jpg', content=b'simple image data', content_type='image/jpeg')
        data = {
            'username': 'testuser',
            'name': 'Buddy',
            'age': '5',
            'gender': 'Male',
            'type': 'Dog',
            'location': 'Park',
            'price': '300',
            'contact': '1234567890',
            'about': 'Friendly',
            'doesntLikeKids': 'false',
            'doesntLikeMen': 'false',
            'isEnergetic': 'true',
            'isFixed': 'true',
            'image': image,
            'image2': image,
            'image3': image,
            'image4': image,
            'image5': image
        }
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class UserProfileViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword', email='test@example.com')
        self.profile = UserModel.objects.create(user=self.user, name="Test User", age="30", gender="Male", location="Test Location")

    def test_get_user_profile(self):
        self.client.login(username='testuser', password='testpassword')
        url = reverse('user-profile', kwargs={'username': self.user.username})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content.decode())
        self.assertEqual(response_data['name'], self.profile.name)

class UserAnimalsViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='animallover', password='securepassword')
        self.animal = AnimalModel.objects.create(user=self.user, name="Buddy", age="5", type="Dog")

    def test_user_animals_view(self):
        self.client.login(username='animallover', password='securepassword')
        url = reverse('user-animals', kwargs={'username': self.user.username})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content.decode())
        self.assertEqual(len(response_data), 1)
        self.assertEqual(response_data[0]['name'], "Buddy")
