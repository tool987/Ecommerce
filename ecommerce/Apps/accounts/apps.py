# from django.apps import AppConfig


# class AccountsConfig(AppConfig):
#     default_auto_field = 'django.db.models.BigAutoField'
#     name = 'apps.accounts'
  
from django.apps import AppConfig




class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.accounts'


    def ready(self):
    # import signals to ensure they are registered
        import apps.accounts.signals # noqa