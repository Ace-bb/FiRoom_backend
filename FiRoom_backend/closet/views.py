from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, JsonResponse

from closet.models import addCloth
from tryon.models import clothesHamper
import os
import datetime
import json


def listClosetClothes(request):
    clothes_data = addCloth.objects.values()
    categry_type = request.GET.get('category')
    if categry_type == '已购':
        clothes_data = clothes_data.filter(isAlreadyBought=True)
    elif categry_type == '收藏':
        clothes_data = clothes_data.filter(isCollect=True)
    elif categry_type == '上衣':
        clothes_data = clothes_data.filter(isUpperGarment=True)
    elif categry_type == '下装':
        clothes_data = clothes_data.filter(isPants=True)
    elif categry_type == '鞋子':
        clothes_data = clothes_data.filter(isShoes=True)
    clothes_list = list(clothes_data)
    return JsonResponse({'code': 0, 'data': clothes_list, 'msg': 'success'})


def addToBasket(request):
    clothes = request.GET.get('clothes')
    clothes = json.loads(clothes)
    print(clothes)
    for cloth in clothes:
        userId = cloth['userId']
        clothName = cloth['clothName']
        clothCover = cloth['clothCover']
        clothesHamper.objects.create(userId=userId, clothName=clothName, clothurl=clothCover)
    return JsonResponse({'res': 0})


def uploadCloth(request):
    clothes = list(addCloth.objects.values())
    print(clothes[len(clothes)-1]['id'])
    image = request.FILES['uploadCloth']
    print(image)
    fileName = request.POST.get('fileName') + str(clothes[len(clothes)-1]['id'] + 1)
    clothName = request.POST.get('clothName')
    clothPrice = request.POST.get('clothPrice')
    clothStyle = request.POST.get('clothStyle')
    category = request.POST.getlist('category')
    category = json.loads(category[0])
    print(category)
    isAlreadyBought = False
    isCollect = False
    isUpperGarment = False
    isPants = False
    isShoes = False
    for item in category:
        print(item)
        if item == '已购':
            isAlreadyBought = True
        elif item == '收藏':
            isCollect = True
        elif item == '上衣':
            isUpperGarment = True
        elif item == '下装':
            isPants = True
        elif item == '鞋子':
            isShoes = True
    basedir = 'D:\\ProgramSoft\\Git\\Virtual-try-on\\FiRoom_backend\\static\\closet\\'
    if not os.path.exists(basedir + fileName + '.jpg'):
        with open(basedir + fileName + '.jpg   ', 'wb') as f:
            f.write(image.read())
            f.close()
    clothUrl = 'static/closet/' + fileName + '.jpg'
    res = addCloth.objects.create(clothName=clothName, clothCover=clothUrl, clothPrice=clothPrice, userId=1,
                                  matchStyle=clothStyle, isAlreadyBought=isAlreadyBought, isCollect=isCollect,
                                  isUpperGarment=isUpperGarment, isPants=isPants, isShoes=isShoes)
    print(res)
    return JsonResponse({'res': 0, 'resUrl': clothUrl})
