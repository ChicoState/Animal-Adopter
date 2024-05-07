from django.test import TestCase, RequestFactory
from django.contrib.auth.models import User
from rest_framework import serializers
from .serializers import UserSerializer, UserModelSerializer, AnimalModelSerializer
from .models import UserModel, AnimalModel
import factory

# Assuming other necessary imports and factory setups are already in place


# Factory for User
class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Sequence(lambda n: 'user_%d' % n)
    email = factory.LazyAttribute(lambda obj: '%s@example.com' % obj.username)
    password = factory.PostGenerationMethodCall('set_password', 'password')

# Factory for UserModel
class UserModelFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = UserModel

    user = factory.SubFactory(UserFactory)

# Factory for AnimalModel
class AnimalModelFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = AnimalModel

    name = "Lucky"
    age = "5"
    gender = "Female"
    type = "Cat"
    location = "Home"


class UserSerializerTest(TestCase):
    def test_create_user(self):
        # Data for creating a new user
        user_data = {'username': 'newuser', 'password': 'newpassword', 'email': 'test@example.com'}
        serializer = UserSerializer(data=user_data)
        self.assertTrue(serializer.is_valid())

        user = serializer.save()
        self.assertEqual(user.username, user_data['username'])
        self.assertTrue(user.check_password(user_data['password']))
        self.assertEqual(user.email, user_data['email'])

    def test_password_is_write_only(self):
        user = UserFactory.create()
        serializer = UserSerializer(user)
        self.assertNotIn('password', serializer.data)


class UserModelSerializerTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpassword')

    def test_create_user_model(self):
        # Creating a mock request object for context
        request = self.factory.get('/')  # Using GET here just to create a request object, you can use post if you are posting data
        request.user = self.user

        # Setting up serializer context
        context = {'request': request}
        data = {'name': 'John Doe', 'age': '30', 'gender': 'Male', 'location': 'City Park'}

        serializer = UserModelSerializer(data=data, context=context)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        user_model = serializer.save()
        self.assertEqual(user_model.user, self.user)
        self.assertEqual(user_model.name, data['name'])



class AnimalModelSerializerTest(TestCase):
    def test_animal_data(self):
        animal = AnimalModelFactory.create()
        serializer = AnimalModelSerializer(animal)
        data = serializer.data
        self.assertEqual(data['name'], animal.name)
        self.assertEqual(data['age'], animal.age)
        self.assertEqual(data['gender'], animal.gender)
        self.assertEqual(data['type'], animal.type)
        self.assertEqual(data['location'], animal.location)
