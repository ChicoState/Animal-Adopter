from django.http import JsonResponse, HttpResponseRedirect
from datetime import datetime
from .models import AnimalModel, UserModel
from django.shortcuts import redirect, render
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse

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

from django.contrib.auth.decorators import login_required

@login_required
def user_profile(request):
    user = request.user
    profile_data = {
        'username': user.username,
        'email': user.email,
        # Add more profile data as needed
    }
    return JsonResponse(profile_data)


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




def google_login(request):
    if request.method == 'POST':
        print("Google login view accessed!")  # Add this line to check if the view is being accessed
        
        # Assuming you retrieve the Google user ID from the POST request
        user_id = request.POST.get('user_id')
        
        # Check if the user exists in the database
        user_exists = UserModel.objects.filter(user_id=user_id).exists()
        if not user_exists:
            print("User does not exist. Redirecting to createProfile...")  # Add this line to check the redirection logic
            
            # If it's the first time login, create a UserModel instance and save the user ID
            user = UserModel(user_id=user_id)
            user.save()
            # Redirect to profile creation page with the user ID
            return redirect(reverse('create_profile') + f'?user_id={user.id}')
        else:
            print("User exists. Redirecting to userProfile...")  # Add this line to check the redirection logic
            
            # If the user exists, redirect to the user's profile page
            return redirect(reverse('user_profile'))
    else:
        print("Google login view accessed!")  # Add this line to check if the view is being accessed
        return redirect('login_page')



@csrf_exempt
def create_profile(request):
    if request.method == 'POST':
        # Assuming the form fields are named name, age, gender, location, contact, is_shelter, user_id
        name = request.POST.get('name')
        age = request.POST.get('age')
        gender = request.POST.get('gender')
        location = request.POST.get('location')
        contact = request.POST.get('contact')
        is_shelter = request.POST.get('is_shelter')
        user_id = request.POST.get('user_id')  # Assuming you have a hidden input field to store user ID

        # Create and save the UserModel instance
        user = UserModel(
            name=name,
            age=age,
            gender=gender,
            location=location,
            contact=contact,
            isShelter=is_shelter,
            user_id=user_id
        )
        user.save()

        return JsonResponse({'id': user.id})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
