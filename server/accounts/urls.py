from django.urls import path
from .views import SignupView, UserDetailView, UserListView, StudentProfileView, AlumniRecommendationView, AlumniListView

urlpatterns = [
    path('signup/', SignupView),
    path('user/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('users/', UserListView.as_view(), name='all-user-detail'),
    path('profile/', StudentProfileView.as_view(), name='student-profile'),
    path('alumni/recommend/', AlumniRecommendationView.as_view(), name='alumni-recommend'),
    path('alumni/', AlumniListView.as_view(), name='alumni-list'),
]