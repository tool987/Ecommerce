from django.urls import path
from .views import RegisterView, LoginView ,ProfileView
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path("profile/", ProfileView.as_view(), name="profile"),
    path('password-reset/', 
         auth_views.PasswordResetView.as_view(), 
         name='password_reset'),

    path('password-reset-confirm/<uidb64>/<token>/', 
         auth_views.PasswordResetConfirmView.as_view(), 
         name='password_reset_confirm'),
]
