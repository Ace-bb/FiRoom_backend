from django.urls import path

from . import views

urlpatterns = [
    path('clothes/basket', views.listClothesHamber),
    path('userBodyShow/images', views.listUserBodyShot),
]