from django.db import models

# Create your models here.
class Entry(models.Model):
    id = models.AutoField(primary_key=True)
    english = models.TextField()
    creole = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Prompt(models.Model):
    id = models.AutoField(primary_key=True)
    english2creole = models.TextField()
    creole2english = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)