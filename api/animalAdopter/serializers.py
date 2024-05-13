from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import UserModel, AnimalModel

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super(UserSerializer, self).create(validated_data)

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'
        read_only_fields = ('user',)

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super(UserModelSerializer, self).create(validated_data)

class AnimalModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimalModel
        fields = ['name', 'age', 'gender', 'price', 'type', 'breed', 'specialNeeds', 'about', 'location', 'contact', 'doesntLikeKids', 'doesntLikeMen', 'isEnergetic', 'isFixed', 'image', 'image2', 'image3', 'image4', 'image5']