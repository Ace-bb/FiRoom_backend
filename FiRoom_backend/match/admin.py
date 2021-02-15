from django.contrib import admin

# Register your models here.
from .models import Category, Swiper, Notice, BluePrint

# Register your models here.
admin.site.register(Category)
admin.site.register(Swiper)
admin.site.register(Notice)
admin.site.register(BluePrint)
