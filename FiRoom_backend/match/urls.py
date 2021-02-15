from django.urls import path

from . import views

urlpatterns = [
    path('recommend/category', views.listCategorys),
    path('recommend/swiper', views.listSwiper),
    path('recommend/notice', views.listNotice),
    path('recommend/blueprint', views.listBluePrint),
]