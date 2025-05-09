from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserAccountManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)

        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self, email, name, password):
        user = self.create_user(email, name, password)

        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        return self.name
    
    def get_short_name(self):
        return self.name
    
    def __str__(self):
        return self.email

class StudentProfile(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE, related_name='student_profile')
    name = models.CharField(max_length=255)
    branch = models.CharField(max_length=100)
    grad_year = models.PositiveIntegerField()
    skills = models.TextField(help_text='Comma-separated list of skills')
    # Add more relevant fields as needed

    def __str__(self):
        return f"{self.name} ({self.user.email})"

class Alumni(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE, related_name='alumni')
    name = models.CharField(max_length=255)
    graduation_year = models.PositiveIntegerField()
    branch = models.CharField(max_length=100)
    current_designation = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    skills = models.TextField(help_text='Comma-separated list of skills')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Alumni'
        verbose_name_plural = 'Alumni'
        ordering = ['-graduation_year']

    def __str__(self):
        return f"{self.name} - {self.graduation_year} ({self.branch})"
