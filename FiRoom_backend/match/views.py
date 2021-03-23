import json

from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, JsonResponse

from match.models import Category, Swiper, Notice, BluePrint, MatchDetail, detailImages, Masters, MasterPrint, \
    masterDetailImages, masterPrintDetail, CompriseImages
import os


def listorders(request):
    return HttpResponse("下面是系统中所有的订单信息。。。")


def listCategorys(request):
    # 返回一个 QuerySet 对象 ，包含所有的表记录
    qs = Category.objects.values()

    # 将 QuerySet 对象 转化为 list 类型
    # 否则不能 被 转化为 JSON 字符串
    retlist = list(qs)

    return JsonResponse({'code': 0, 'data': retlist, 'msg': 'success'})


def listSwiper(request):
    swiper_data = Swiper.objects.values()
    swiper_list = list(swiper_data)
    return JsonResponse({'code': 0, 'data': swiper_list, 'msg': 'success'})


def listNotice(request):
    notice_data = Notice.objects.values()
    notice_data = list(notice_data)
    noticeList = {
        'dataList': notice_data,
        'totalPage': 1,
        'totalRow': len(notice_data)
    }
    return JsonResponse({'code': 0, 'data': noticeList, 'msg': 'success'})


def listBluePrint(request):
    blueprint_data = BluePrint.objects.values()
    blueprint_list = list(blueprint_data)
    pageNum = int(request.GET.get('pageNum'))
    print(pageNum)
    resBluePrint = []
    itemNum = 0
    maxItemNum = pageNum * 2
    for item in blueprint_list:
        if itemNum < maxItemNum:
            resBluePrint.append(item)
            itemNum += 1

    return JsonResponse({'code': 0, 'data': resBluePrint, 'msg': 'success'})


def listMasters(request):
    masters = Masters.objects.values()
    masters_list = list(masters)
    pageNum = int(request.GET.get('pageNum'))
    print(pageNum)
    resMasters = []
    itemNum = 0
    maxItemNum = pageNum * 2
    for item in masters_list:
        if itemNum < maxItemNum:
            resMasters.append(item)
            itemNum += 1
    return JsonResponse({'code': 0, 'data': resMasters, 'msg': 'success'})


def listBlueDetail(request):
    MatchDetails = MatchDetail.objects.values()
    print(MatchDetails)
    id = request.GET.get('detailId', None)
    print(id)

    if id:
        MatchDetails = MatchDetails.filter(printId=id)
    MatchDetails = list(MatchDetails)
    details = MatchDetails[0]['detailDescrib'].split("\r\n\r\n")
    detailList = []
    for item in details:
        detailList.append({'mes': item})
    print('detailsList:', detailList)
    MatchDetails[0]['detailDescrib'] = detailList
    return JsonResponse({'code': 0, 'data': MatchDetails, 'msg': 'success'})


def listDetailImages(request):
    type = request.GET.get('type', None)
    print('type:', type)
    if type == 'master':
        Images = masterDetailImages.objects.values()
    elif type == 'dresser':
        Images = detailImages.objects.values()
    else:
        Images = detailImages.objects.values()

    id = request.GET.get('userId', None)
    print(id)

    if type == 'dresser':
        Images = Images.filter(printId=id)
    elif type == 'master':
        Images = Images.filter(masterId=id)
    Images = list(Images)
    return JsonResponse({'code': 0, 'data': Images, 'msg': 'success'})


def listMasterDetail(request):
    Masters_List = Masters.objects.values()
    id = request.GET.get('masterId', None)
    print(id)

    if id:
        Masters_List = Masters_List.filter(masterId=id)
    Masters_List = list(Masters_List)
    print(Masters_List)
    return JsonResponse({'code': 0, 'data': Masters_List, 'msg': 'success'})


def listMasterPrint(request):
    masterPrint_List = MasterPrint.objects.values()
    id = request.GET.get('masterId', None)
    print(id)

    if id:
        masterPrint_List = masterPrint_List.filter(masterId=id)
    masterPrint_List = list(masterPrint_List)
    return JsonResponse({'code': 0, 'data': masterPrint_List, 'msg': 'success'})


def listMasterPrintDetail(request):
    masterPrintDetails = masterPrintDetail.objects.values()
    id = request.GET.get('masterId', None)
    print(id)

    if id:
        masterPrintDetails = masterPrintDetails.filter(masterId=id)
    masterPrintDetails = list(masterPrintDetails)
    printDetail = masterPrintDetails[0]['detailDescrib'].split("\r\n\r\n")
    detailList = []
    for item in printDetail:
        detailList.append({'mes': item})
    print(masterPrintDetail)
    masterPrintDetails[0]['detailDescrib'] = detailList
    return JsonResponse({'code': 0, 'data': masterPrintDetails, 'msg': 'success'})


def uploadPrintImages(request):
    print('uploadPrintImages')
    image = request.FILES['printImages']
    print(image)
    print('uploadClothes')
    type = request.POST.get('fileName')
    printId = request.POST.get('printId')
    detailImage_list = detailImages.objects.values()
    detailImage_list = list(detailImage_list)
    type = type + str(len(detailImage_list) + 1)
    print(type)
    basedir = 'D:\\ProgramSoft\\Git\\Virtual-try-on\\FiRoom_backend\\static\\BluePrintImage\\detail\\upload1\\'
    if not os.path.exists(basedir + type + '.jpg'):
        with open(basedir + type + '.jpg   ', 'wb') as f:
            f.write(image.read())
            f.close()
    imgUrl = 'static/BluePrintImage/detail/upload1/' + type + '.jpg'
    record = detailImages.objects.create(printId=printId, imageUrl=imgUrl)
    print(record)
    return JsonResponse({'res': 0, 'imgUrl': imgUrl, 'msg': 'success'})


def uploadSingleImages(request):
    singleImages = CompriseImages.objects.values()
    singleImages = list(singleImages)
    id = len(singleImages) + 1
    print('uploadSingleImages')
    singleImage = request.FILES['singleImages']
    print(singleImage)
    print('singleImages')
    type = request.POST.get('fileName')
    printId = request.POST.get('printId')
    compriseImageId = request.POST.get('compriseImageId')
    print(type)
    basedir = 'D:\\ProgramSoft\\Git\\Virtual-try-on\\FiRoom_backend\\static\\BluePrintImage\\detail\\upload1\\single\\'
    success = False
    if not os.path.exists(basedir + type + '.jpg'):
        with open(basedir + type + '.jpg   ', 'wb') as f:
            f.write(singleImage.read())
            success = True
            f.close()
    singleUrl = 'static/BluePrintImage/detail/upload1/single/' + type + '.jpg'
    record = CompriseImages.objects.create(printId=printId, compriseImageId=compriseImageId, imageName='单件',
                                           compriseImageUrl=singleUrl)
    print(record)
    return JsonResponse({'res': 0, '': singleUrl, 'msg': 'success'})


def savePrintData(request):
    print('savePrintData')
    printData = json.loads(request.body)
    upData = printData['printData']
    print(upData)
    bluePrint = BluePrint.objects.values()
    bluePrint = list(bluePrint)
    printImages = detailImages.objects.values()
    printImages = printImages.filter(printId=5)
    printImages = list(printImages)
    id = len(bluePrint) + 1
    name = upData['name']
    minPrice = upData['minPrice']
    pic = upData['coverUrl']['path']
    authorName = upData['authorName']
    authorIcon = upData['avatarUrl']
    mainText = upData['mainText']
    tags = upData['tags'][0]['tags']
    print(pic)
    compriseImageId = 100 + int(id)
    BluePrint.objects.create(printId=id, name=name, minPrice=minPrice, pic=pic, authorName=authorName,
                             authorIcon=authorIcon, likeNum=0)
    MatchDetail.objects.create(printId=id, author=authorName, name=name, detailDescrib=mainText,
                               detailImages=compriseImageId, commentId=compriseImageId, commentNum=0,
                               compriseImageId=compriseImageId, tags=tags, likeNum=0, collet=0)
    return JsonResponse({'res': 0, 'printId': id, 'compriseImageId': compriseImageId})


def searchMatch(request):
    method = request.GET.get('method')
    keyWord = request.GET.get('style')
    pageNumber = int(request.GET.get('pageNumber'))
    bluePrint = BluePrint.objects.values()
    bluePrint = list(bluePrint)
    resPrint = []
    itemNum = 0
    maxItemNum = pageNumber * 10
    for item in bluePrint:
        if item['name'].find(keyWord) != -1 and itemNum <= maxItemNum:
            resPrint.append(item)
            itemNum += 1

    print(resPrint)
    return JsonResponse({'res': 0, 'resSearchList': resPrint})
