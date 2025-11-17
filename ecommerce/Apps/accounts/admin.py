from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Profile, BankInfo
from django.utils.translation import gettext_lazy as _




class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'profile'




@admin.register(User)
class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline,)
    list_display = ('email', 'first_name', 'last_name', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active', 'is_superuser')
    ordering = ('email',)
    search_fields = ('email', 'first_name', 'last_name')


    fieldsets = (
    (None, {'fields': ('email', 'password')}),
    (_('Personal info'), {'fields': ('first_name', 'last_name')}),
    (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    (_('Important dates'), {'fields': ('date_joined',)}),
)




@admin.register(BankInfo)
class BankInfoAdmin(admin.ModelAdmin):
    list_display = ('user', 'bank_name', 'account_number', 'is_verified')
    search_fields = ('user__email', 'bank_name', 'account_number')

