from django.db import models
from django.contrib.auth.models import AbstractUser
# from ..movies.models import Genre

# Create your models here.
class User(AbstractUser):
    interested_genre1 = models.CharField(max_length=30, null=True)
    interested_genre2 = models.CharField(max_length=30, null=True)
    interested_genre3 = models.CharField(max_length=30, null=True)