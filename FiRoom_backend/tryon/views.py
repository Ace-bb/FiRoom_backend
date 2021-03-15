from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, JsonResponse

from tryon.models import clothesHamper, userBodyShot
import os


def listClothesHamber(request):
    clothes_data = clothesHamper.objects.values()
    clothes_list = list(clothes_data)
    return JsonResponse({'code': 0, 'data': clothes_list, 'msg': 'success'})


def listUserBodyShot(request):
    userShot_data = userBodyShot.objects.values()
    userShot_list = list(userShot_data)
    return JsonResponse({'code': 0, 'data': userShot_list, 'msg': 'success'})
