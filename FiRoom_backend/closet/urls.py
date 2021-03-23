from django.urls import path

from . import views

urlpatterns = [
    path('clothes/basket', views.listClosetClothes),
    path('clothes/addToBasket', views.addToBasket),
    path('clothes/uploadCloth', views.uploadCloth),
]