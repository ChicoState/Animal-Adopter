from django.http import JsonResponse, HttpResponseRedirect
from datetime import datetime
from .models import AnimalModel, UserModel, GoogleUser
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login

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


def google_login(request):
    # This is a simplified example. You'll need to use a library like django-allauth or a Django view to handle the OAuth flow.
    google_id = request.GET.get('google_id')
    user, created = GoogleUser.objects.get_or_create(google_id=google_id)

    # Potentially add additional session management logic here
    login(request, user)  # Assuming `user` is an instance of Django's User model or a model that supports Django's auth system.

    if created:
        return redirect('/createProfile')  # New user
    else:
        return redirect('/')  # Existing user