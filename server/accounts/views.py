from django.views.decorators.csrf import csrf_protect,csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from .serializers import UserSerializer
from .models import StudentProfile,Alumni
from .serializers import StudentProfileSerializer,AlumniSerializer
from rest_framework import status
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MultiLabelBinarizer
import numpy as np

User = get_user_model()


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def SignupView(request):
    data = request.data

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    password2 = data.get('password2')

    if not name or not email or not password or not password2:
        return Response({'error': 'All fields are required'}, status=400)

    if password == password2:
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=400)
        else:
            if len(password) < 3:
                return Response({'error': 'Password must be at least 6 characters'}, status=400)
            else:
                user = User.objects.create_user(email=email, password=password, name=name)
                user.save()
                return Response({'success': 'User created successfully'}, status=201)
    else:
        return Response({'error': 'Passwords do not match'}, status=400)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, pk=None, email=None):
        if pk:
            try:
                user = User.objects.get(id=pk)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=404)
        elif email:
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=404)
        else:
            return Response({'error': 'User ID or Email must be provided'}, status=400)

        serializer = UserSerializer(user)
        return Response(serializer.data)
    
class UserListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class StudentProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = StudentProfile.objects.get(user=request.user)
            serializer = StudentProfileSerializer(profile)
            return Response(serializer.data)
        except StudentProfile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=404)

    def post(self, request):
        # Only allow creation if profile does not exist
        if StudentProfile.objects.filter(user=request.user).exists():
            return Response({'error': 'Profile already exists'}, status=400)
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = StudentProfileSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def put(self, request):
        try:
            profile = StudentProfile.objects.get(user=request.user)
        except StudentProfile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=404)
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = StudentProfileSerializer(profile, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

class AlumniRecommendationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            student_profile = StudentProfile.objects.get(user=request.user)
        except StudentProfile.DoesNotExist:
            return Response({'error': 'Student profile not found'}, status=404)

        # Get all alumni profiles
        alumni_profiles = Alumni.objects.all()
        
        if not alumni_profiles:
            return Response({'error': 'No alumni profiles found'}, status=404)

        # Create DataFrames for the recommendation system
        student_data = {
            'Name': [student_profile.name],
            'Skills': [student_profile.skills]
        }
        student_df = pd.DataFrame(student_data)

        alumni_data = {
            'Name': [alumni.name for alumni in alumni_profiles],
            'Skills': [alumni.skills for alumni in alumni_profiles],
            'id': [alumni.id for alumni in alumni_profiles]
        }
        alumni_df = pd.DataFrame(alumni_data)

        # Convert skills to list format
        alumni_skills = [str(skills).split(",") for skills in alumni_df['Skills']]
        student_skills = [str(skills).split(",") for skills in student_df['Skills']]

        # Fit and transform skills using MultiLabelBinarizer
        mlb = MultiLabelBinarizer()
        mlb.fit(alumni_skills + student_skills)
        
        alumni_skills_binary = mlb.transform(alumni_skills)
        student_skills_binary = mlb.transform(student_skills)

        # Compute cosine similarity
        cosine_sim = cosine_similarity(alumni_skills_binary, student_skills_binary)

        # Get top 10 recommendations
        similarity_scores = cosine_sim[:, 0]  # Get similarity scores for the student
        top_alumni_indices = np.argsort(similarity_scores)[::-1][:10]  # Get top 10 most similar alumni
        
        # Get the recommended alumni profiles
        recommended_alumni_ids = [alumni_df.iloc[i]['id'] for i in top_alumni_indices]
        recommended_alumni = Alumni.objects.filter(id__in=recommended_alumni_ids)
        
        # Sort the recommended_alumni based on the order in recommended_alumni_ids
        recommended_alumni = sorted(
            recommended_alumni,
            key=lambda x: recommended_alumni_ids.index(x.id)
        )

        serializer = AlumniSerializer(recommended_alumni, many=True)
        return Response({
            'recommendations': serializer.data,
            'similarity_scores': similarity_scores[top_alumni_indices].tolist()
        })

class AlumniListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        alumni = Alumni.objects.all()
        serializer = AlumniSerializer(alumni, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        # Check if user already has an alumni profile
        if Alumni.objects.filter(user=request.user).exists():
            return Response({'error': 'Alumni profile already exists'}, status=400)
        
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = AlumniSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)






