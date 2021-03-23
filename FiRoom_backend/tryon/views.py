from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, JsonResponse

from tryon.models import clothesHamper, userBodyShot
import os
import datetime


def listClothesHamber(request):
    clothes_data = clothesHamper.objects.values()
    clothes_list = list(clothes_data)
    return JsonResponse({'code': 0, 'data': clothes_list, 'msg': 'success'})


def listUserBodyShot(request):
    userShot_data = userBodyShot.objects.values()
    userShot_list = list(userShot_data)
    return JsonResponse({'code': 0, 'data': userShot_list, 'msg': 'success'})


def uploadUserShot(request):
    shots = userBodyShot.objects.values()
    shots = list(shots)
    image = request.FILES['name']
    print(image)
    print('uploadUserShot')
    type = request.POST.get('type')
    print(type)
    type = type + str(len(shots)) + str(1)
    basedir = 'D:\\ProgramSoft\\Git\\Virtual-try-on\\FiRoom_backend\\static\\userBodyShot\\'
    if not os.path.exists(basedir + type + '.jpg'):
        with open(basedir + type + '.jpg', 'wb') as f:
            f.write(image.read())
            f.close()
    shotUrl = 'static/userBodyShot/' + type + '.jpg'
    userBodyShot.objects.create(userId=len(shots) + 1, userName='清风', shot=shotUrl)
    return JsonResponse({'res': 0, 'resUrl': shotUrl})


def uploadClothes(request):
    clothes = clothesHamper.objects.values()
    clothes = list(clothes)
    image = request.FILES['name']
    print(image)
    print('uploadClothes')
    type = request.POST.get('type')
    type = type + str(len(clothes)) + str(1)
    basedir = 'D:\\ProgramSoft\\Git\\Virtual-try-on\\FiRoom_backend\\static\\clothes_hamper\\'
    if not os.path.exists(basedir + type + '.jpg'):
        with open(basedir + type + '.jpg   ', 'wb') as f:
            f.write(image.read())
            f.close()
    clothUrl = 'static/clothes_hamper/' + type + '.jpg'
    clothesHamper.objects.create(userId=len(clothes) + 1, clothName='T恤', clothurl=clothUrl,
                                 uploadTime=datetime.datetime.now())

    tryon = request.POST.get('isTryon')
    #if tryon:
        # 调用试穿函数

    return JsonResponse({'res': 0, 'resUrl': clothUrl})
