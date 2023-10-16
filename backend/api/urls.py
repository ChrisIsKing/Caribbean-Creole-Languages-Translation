from django.urls import path
from . import views

urlpatterns = [
    path('api/infer/', views.inferData),
    path('api/entries/', views.getEntries),
    path('api/entries/<int:pk>/', views.getEntry),
    path('api/entries/add/', views.addEntry),
    path('api/entries/edit/', views.editEntry),
]