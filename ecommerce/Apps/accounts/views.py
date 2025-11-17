from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import update_session_auth_hash

from .serializers import (
    RegisterSerializer, LoginSerializer, UserSerializer,
    ChangePasswordSerializer, BankInfoSerializer
)
from .models import User, BankInfo


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)

        return Response({
            'user': UserSerializer(user, context={'request': request}).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })


class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self):
        return self.request.user

class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]


    def delete(self, request):
        user = request.user
        user.delete()
        return Response({'detail': 'Account deleted'}, status=status.HTTP_200_OK)
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        serializer = ChangePasswordSerializer(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)

        user = request.user
        user.set_password(serializer.validated_data['new_password'])
        user.save()

        # Update session if using session auth
        try:
            update_session_auth_hash(request, user)
        except Exception:
            pass

        return Response({'detail': 'Password updated successfully'})


class BankInfoView(generics.RetrieveUpdateAPIView):
    serializer_class = BankInfoSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        bank_info, _ = BankInfo.objects.get_or_create(user=user)
        return bank_info

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
