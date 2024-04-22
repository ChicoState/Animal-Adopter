from datetime import datetime
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from datetime import datetime
from .models import AnimalModel, AnimalImage
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from .models import AnimalModel, UserModel
from .serializers import UserSerializer, UserModelSerializer, AnimalModelSerializer
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny


@csrf_exempt
def user_profile_view(request, username):
    if request.method == 'GET':
        User = get_user_model()
        user = get_object_or_404(User, username=username)
        user_profile = get_object_or_404(UserModel, user=user)
        serializer = UserModelSerializer(user_profile)
        return JsonResponse(serializer.data, safe=False)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def user_animals_view(request, username):
    if request.method == 'GET':
        User = get_user_model()
        user = get_object_or_404(User, username=username)
        animals = AnimalModel.objects.filter(user=user)
        serializer = AnimalModelSerializer(animals, many=True)
        return JsonResponse(serializer.data, safe=False)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

class UserProfileCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = UserModelSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SignUpView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)  # Ensure Token is used correctly
            return Response({
                'user_id': user.id,
                'username': user.username,
                'token': token.key
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user_id': user.id, 'username': user.username}, status=status.HTTP_200_OK)
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
    animal_images = AnimalImage.objects.all().values()

    serialized_models = serializers.serialize('json', animal_models)
    serialized_images = serializers.serialize('json', animal_images)
    
    data = {
        'pet': serialized_models,
        'animal_images': serialized_images
    }

    return JsonResponse(data)

def get_user_models(request):
    user_models = UserModel.objects.all().values()
    return JsonResponse({'user': list(user_models)})

@csrf_exempt
def create_animal_model(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        try:
            user = User.objects.get(username=username)  # Attempt to fetch the user
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)  # Return an error if user is not found

        # Continue processing if user is found
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
            specialOne=specialOne,
            specialTwo=specialTwo,
            specialThree=specialThree
        )
        animal.save()

        # Assuming you are storing the image file in the request.FILES dictionary
        images = request.FILES.getlist('image')
        
        for image in images:
            animal.images.create(image=image)


        return JsonResponse({'id': animal.id})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)