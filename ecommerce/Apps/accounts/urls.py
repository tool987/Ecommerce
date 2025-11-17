from django.urls import path
from .views import (
RegisterView, LoginView, ProfileView, ChangePasswordView,
DeleteAccountView, BankInfoView
)
from django.contrib.auth import views as auth_views


urlpatterns = [
path('register/', RegisterView.as_view(), name='register'),
path('login/', LoginView.as_view(), name='login'),
path('profile/', ProfileView.as_view(), name='profile'),
path('change-password/', ChangePasswordView.as_view(), name='change-password'),
path('delete-account/', DeleteAccountView.as_view(), name='delete-account'),
path('bank-info/', BankInfoView.as_view(), name='bank-info'),


# Optional: use Django's built-in password reset flow (templates required)
path('password-reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
path('password-reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
path('password-reset-confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
path('password-reset-complete/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
]