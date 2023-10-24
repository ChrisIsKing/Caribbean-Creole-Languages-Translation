from django.urls import path
from . import views

urlpatterns = [
    path('api/infer/', views.inferData),
    path('api/entries/', views.getEntries),
    path('api/entries/<int:pk>/', views.getEntry),
    path('api/entries/add/', views.addEntry),
    path('api/entries/edit/', views.editEntry),
    path('api/entries/delete/<int:pk>/', views.deleteEntry),
    path('api/bulkadd/', views.EntryListCreate.as_view()),
    path('api/entries/random/', views.getRandomEntry),
]