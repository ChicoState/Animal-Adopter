# from django.contrib.auth.models import User
# from rest_framework import serializers
# from .models import UserModel


# class UserModelSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserModel
#         fields = ['name', 'age', 'gender', 'location', 'contact', 'isShelter']

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'password']
#         extra_kwargs = {'password': {'write_only': True, 'required': True}}

#     def create(self, validated_data):
#         user = User.objects.create_user(**validated_data)
#         return user

#     def update(self, instance, validated_data):
#         instance.username = validated_data.get('username', instance.username)
#         instance.email = validated_data.get('email', instance.email)
#         instance.set_password(validated_data.get('password'))
#         instance.save()
#         return instance



from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import UserModel

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
