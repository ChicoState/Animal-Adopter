from datetime import datetime
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import AnimalModel, UserModel
from .serializers import UserSerializer

class SignUpView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'message': 'Login successful'})
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Logged out'})

def index(request):
    current_time = datetime.now().strftime("%-I:%S %p")
    current_date = datetime.now().strftime("%A %m %-Y")

    data = {
        'time': current_time,
        'date': current_date,
    }

    return JsonResponse(data)

def get_animal_models(request):
    animal_models = AnimalModel.objects.all().values()
    return JsonResponse({'pet': list(animal_models)})

def get_user_models(request):
    user_models = UserModel.objects.all().values()
    return JsonResponse({'user': list(user_models)})


@csrf_exempt
def create_animal_model(request):
    if request.method == 'POST':
        # Assuming the form fields are named age, gender, price, type, location, contact, name, image
        age = request.POST.get('age')
        gender = request.POST.get('gender')
        price = request.POST.get('price')
        type = request.POST.get('type')
        location = request.POST.get('location')
        contact = request.POST.get('contact')
        name = request.POST.get('name')
        specialNeeds = request.POST.get('specialNeeds')
        about = request.POST.get('about')
        specialOne = request.POST.get('specialOne')
        specialTwo = request.POST.get('specialTwo')
        specialThree = request.POST.get('specialThree')

        # Assuming you are storing the image file in the request.FILES dictionary
        image = request.FILES.get('image')

        # Create and save the AnimalModel instance
        animal = AnimalModel(
            age=age,
            gender=gender,
            price=price,
            type=type,
            location=location,
            contact=contact,
            name=name,
            specialNeeds=specialNeeds,
            about=about,
            image=image,
            specialOne=specialOne,
            specialTwo=specialTwo,
            specialThree=specialThree
        )
        animal.save()

        return JsonResponse({'id': animal.id})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)