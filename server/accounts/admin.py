from django.contrib import admin
from .models import UserAccount, StudentProfile, Alumni

admin.site.register(UserAccount)
admin.site.register(StudentProfile)
admin.site.register(Alumni)

