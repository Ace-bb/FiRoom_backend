from django.contrib import admin

# Register your models here.
from .models import Category, Swiper, Notice, BluePrint, CompriseImages, MatchDetail, Comment, detailImages, Masters, MasterPrint,masterDetailImages, masterPrintDetail

# Register your models here.
admin.site.register(Category)
admin.site.register(Swiper)
admin.site.register(Notice)
admin.site.register(BluePrint)
admin.site.register(MatchDetail)
admin.site.register(detailImages)
admin.site.register(Comment)
admin.site.register(CompriseImages)
admin.site.register(Masters)
admin.site.register(MasterPrint)
admin.site.register(masterDetailImages)
admin.site.register(masterPrintDetail)
