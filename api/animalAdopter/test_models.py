from django.test import TestCase
import factory
from django.contrib.auth.models import User
from .models import AnimalModel, UserModel, user_image_upload, get_default_user, animal_image_upload

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

    def test_user_password(self):
        self.assertTrue(self.user.check_password('defaultpassword'))

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

    user = factory.SubFactory(UserFactory)  # Reuse UserFactory
    name = "John Doe"
    age = "30"
    gender = "Male"
    location = "123 Test Lane"
    contact = "555-1234"
    isShelter = "no"
    image = factory.django.ImageField(color='blue')  # Example image field setup


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
        # Assuming you want to test the image upload path
        filename = 'testprofile.jpg'
        path = user_image_upload(self.user_model, filename)
        self.assertEqual(path, f'user_images/{filename}')

class DefaultUserTestCase(TestCase):
    def test_default_user_creation(self):
        # This tests that the default user is created correctly
        user_id = get_default_user()
        user = User.objects.get(id=user_id)
        self.assertEqual(user.username, 'admin')
        self.assertTrue(user.check_password('adminpass'))

def test_user_not_created_if_exists(self):
    # Create 'admin' user first
    User.objects.create_user('admin', password='oldpassword')
    user_id = get_default_user()
    user = User.objects.get(id=user_id)
    self.assertFalse(user.check_password('adminpass'))
    self.assertTrue(user.check_password('oldpassword'))

def test_multiple_image_uploads(self):
    files = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg']
    for i, file in enumerate(files, start=1):
        path = getattr(self.animal, f'image{i}').field.upload_to(self.animal, file)
        self.assertEqual(path, f'animal_images/{file}')


class AnimalImageUploadTestCase(TestCase):
    def test_animal_image_upload_path(self):
        # Create an instance of AnimalModel (assuming it has been imported)
        animal = AnimalModel(name="Test Animal", age="5", gender="Male", type="Dog")

        # Define a test filename
        filename = 'test_image.jpg'

        # Call the function with the instance and filename
        path = animal_image_upload(animal, filename)

        # Check if the path is correctly formatted
        self.assertEqual(path, f'animal_images/{filename}')