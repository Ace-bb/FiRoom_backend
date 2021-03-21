from django.urls import path

from . import views

urlpatterns = [
    path('recommend/category', views.listCategorys),
    path('recommend/swiper', views.listSwiper),
    path('recommend/notice', views.listNotice),
    path('recommend/blueprint', views.listBluePrint),
    path('recommend/masters', views.listMasters),
    path('recommend/blueDetail', views.listBlueDetail),
    path('recommend/masterDetail', views.listMasterDetail),
    path('recommend/masterPrint', views.listMasterPrint),
    path('recommend/masterPrintDetail', views.listMasterPrintDetail),
    path('recommend/DetailImages', views.listDetailImages),
    path('recommend/test', views.uploadUserShot),
    path('recommend/test2', views.uploadClothes),
    path('post/uploadPrintImages', views.uploadPrintImages),
    path('post/uploadSingleImages', views.uploadSingleImages),
    path('post/savePrintData', views.savePrintData),
]