# accounts/serializers.py

from django.contrib.auth.models import User
from rest_framework import serializers

from .models import UserAccount, StudentProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields ='__all__'

class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = '__all__'
