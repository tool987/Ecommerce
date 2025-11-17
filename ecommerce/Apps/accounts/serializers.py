from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, Profile, BankInfo


# ---------------------------------
# Profile Serializer
# ---------------------------------
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['phone', 'address', 'avatar']


# ---------------------------------
# Bank Info Serializer
# ---------------------------------
class BankInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankInfo
        fields = ['account_name', 'account_number', 'bank_name', 'is_verified']
        read_only_fields = ['is_verified']

    def validate(self, data):
        request = self.context.get('request')
        user = request.user

        full_name = f"{user.first_name} {user.last_name}".strip().lower()
        account_name = data.get('account_name')

        if account_name and account_name.strip().lower() != full_name:
            raise serializers.ValidationError('Bank account name does not match registered name')

        return data

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user

        validated_data['user'] = user
        validated_data['is_verified'] = True  # Verified because name matched in validate()

        bank_info, _ = BankInfo.objects.update_or_create(
            user=user,
            defaults=validated_data
        )

        return bank_info

    def update(self, instance, validated_data):
        instance.account_name = validated_data.get('account_name', instance.account_name)
        instance.account_number = validated_data.get('account_number', instance.account_number)
        instance.bank_name = validated_data.get('bank_name', instance.bank_name)

        user = self.context['request'].user
        full_name = f"{user.first_name} {user.last_name}".strip().lower()

        # Re-validate account name
        if instance.account_name.strip().lower() == full_name:
            instance.is_verified = True
        else:
            instance.is_verified = False

        instance.save()
        return instance


# ---------------------------------
# User Serializer
# ---------------------------------
class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    bank_info = BankInfoSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'profile', 'bank_info']
        read_only_fields = ['email']

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})

        # Update user info
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()

        # Update profile info
        profile = instance.profile
        profile.phone = profile_data.get('phone', profile.phone)
        profile.address = profile_data.get('address', profile.address)

        avatar = profile_data.get('avatar')
        if avatar is not None:
            profile.avatar = avatar

        profile.save()
        return instance


# ---------------------------------
# Register Serializer
# ---------------------------------
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(password=password, **validated_data)

        # Ensure profile exists (signal handles it but just in case)
        Profile.objects.get_or_create(user=user)
        return user


# ---------------------------------
# Login Serializer
# ---------------------------------
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        user = authenticate(username=email, password=password)

        if user and user.is_active:
            return user

        raise serializers.ValidationError('Invalid credentials')


# ---------------------------------
# Change Password Serializer
# ---------------------------------
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, min_length=8)

    def validate_old_password(self, value):
        user = self.context['request'].user

        if not user.check_password(value):
            raise serializers.ValidationError('Old password is not correct')

        return value
