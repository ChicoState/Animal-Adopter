from django.test import TestCase
import factory
from django.urls import reverse
from django.contrib.auth.models import User
from .models import AnimalModel, UserModel, user_image_upload, get_default_user, animal_image_upload
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APIClient
from rest_framework import status


# Define a factory for the User model
class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User
    username = factory.Sequence(lambda n: f'user{n}')
    password = factory.PostGenerationMethodCall('set_password', 'defaultpassword')

# Define a factory for the AnimalModel
class AnimalModelFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = AnimalModel
    user = factory.SubFactory(UserFactory)
    name = "Charlie"
    age = "3"
    gender = "Male"
    type = "Dog"
    price = "200"
    location = "City Park"

class AnimalTestCase(TestCase):
    def setUp(self):
        self.user = UserFactory.create()
        self.animal = AnimalModelFactory.create(user=self.user)

    def test_animal_association_with_user(self):
        self.assertEqual(self.animal.user, self.user)

    def test_animal_attributes(self):
        self.assertEqual(self.animal.name, "Charlie")
        self.assertEqual(self.animal.age, "3")
        self.assertEqual(self.animal.gender, "Male")
        self.assertEqual(self.animal.type, "Dog")
        self.assertEqual(self.animal.price, "200")
        self.assertEqual(self.animal.location, "City Park")

class UserModelFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = UserModel
    user = factory.SubFactory(UserFactory)
    name = "John Doe"
    age = "30"
    gender = "Male"
    location = "123 Test Lane"
    contact = "555-1234"
    isShelter = "no"
    image = factory.django.ImageField(color='blue')

class UserModelTestCase(TestCase):
    def setUp(self):
        self.user = UserFactory.create()
        self.user_model = UserModelFactory.create(user=self.user)

    def test_user_model_creation(self):
        self.assertEqual(self.user_model.user, self.user)
        self.assertEqual(self.user_model.name, "John Doe")
        self.assertEqual(self.user_model.age, "30")
        self.assertEqual(self.user_model.gender, "Male")
        self.assertEqual(self.user_model.location, "123 Test Lane")
        self.assertEqual(self.user_model.contact, "555-1234")
        self.assertEqual(self.user_model.isShelter, "no")

    def test_user_model_image_path(self):
        filename = 'testprofile.jpg'
        path = user_image_upload(self.user_model, filename)
        self.assertEqual(path, f'user_images/{filename}')

class DefaultUserTestCase(TestCase):
    def test_default_user_creation(self):
        user_id = get_default_user()
        user = User.objects.get(id=user_id)
        self.assertEqual(user.username, 'admin')
        self.assertTrue(user.check_password('adminpass'))

class AnimalImageUploadTestCase(TestCase):
    def setUp(self):
        self.animal = AnimalModel(name="Test Animal", age="5", gender="Male", type="Dog")

    def test_animal_image_upload_path(self):
        filename = 'test_image.jpg'
        path = animal_image_upload(self.animal, filename)
        self.assertEqual(path, f'animal_images/{filename}')

class MultipleImageUploadTestCase(TestCase):
    def setUp(self):
        self.user = UserFactory.create()
        self.animal = AnimalModelFactory.create(user=self.user)

    def test_multiple_image_uploads(self):
        files = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg']
        for i, file_name in enumerate(files, start=1):
            path = animal_image_upload(self.animal, file_name)
            expected_path = f'animal_images/{file_name}'
            self.assertEqual(path, expected_path)
            self.assertIn(file_name, path)