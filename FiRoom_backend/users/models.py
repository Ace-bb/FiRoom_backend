from django.db import models

# Create your models here.
class Users(models.Model):
    # id
    userId = models.IntegerField()
    username = models.CharField(max_length=100)