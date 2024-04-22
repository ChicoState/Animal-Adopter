from django.http import JsonResponse
from datetime import datetime
from .models import AnimalModel, AnimalImage
from django.views.decorators.csrf import csrf_exempt

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