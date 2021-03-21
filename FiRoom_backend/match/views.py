from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, JsonResponse

from match.models import Category, Swiper, Notice, BluePrint, MatchDetail, detailImages, Masters, MasterPrint, \
    masterDetailImages, masterPrintDetail,CompriseImages
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
    return JsonResponse({'code': 0, 'data': blueprint_list, 'msg': 'success'})


def listMasters(request):
    masters = Masters.objects.values()
    masters_list = list(masters)
    return JsonResponse({'code': 0, 'data': masters_list, 'msg': 'success'})


def listBlueDetail(request):
    MatchDetails = MatchDetail.objects.values()
    print(MatchDetails)
    id = request.GET.get('detailId', None)
    print(id)

    if id:
        MatchDetails = MatchDetails.filter(id=id)
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
        Images = Images.filter(userId=id)
    elif type == 'master':
        Images = Images.filter(masterId=id)
    Images = list(Images)
    return JsonResponse({'code': 0, 'data': Images, 'msg': 'success'})


def uploadUserShot(request):
    image = request.FILES['name']
    print(image)
    print('uploadUserShot')
    type = request.POST.get('type')
    basedir = 'D:\\ProgramSoft\\Git\\Virtual-try-on\\FiRoom_backend\\static\\masterBluePrint\\compriseImages\\'
    if not os.path.exists(basedir + type + '.jpg'):
        with open(basedir + type + '.jpg', 'wb') as f:
            f.write(image.read())
            f.close()
    return JsonResponse({'res': 0})


def uploadClothes(request):
    image = request.FILES['name']
    print(image)
    print('uploadClothes')
    type = request.POST.get('type')
    basedir = 'D:\\ProgramSoft\\Git\\Virtual-try-on\\FiRoom_backend\\static\\masterBluePrint\\detailImages\\'
    if not os.path.exists(basedir + type + '.jpg'):
        with open(basedir + type + '.jpg   ', 'wb') as f:
            f.write(image.read())
            f.close()
    return JsonResponse({'res': 0})


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
    image = request.FILES['printImages']
    print(image)
    print('uploadClothes')
    type = request.POST.get('fileName')
    print(type)
    basedir = 'D:\\ProgramSoft\\Git\\Virtual-try-on\\FiRoom_backend\\static\\BluePrintImage\\detail\\upload1\\'
    success = False
    if not os.path.exists(basedir + type + '.jpg'):
        with open(basedir + type + '.jpg   ', 'wb') as f:
            f.write(image.read())
            success = True
            f.close()
    print(success)
    imgUrl = 'static/BluePrintImage/detail/upload1/' + type + '.jpg'
    record = detailImages.objects.create(userId=5, imageUrl=imgUrl)

    resUrl = {'imgUrl': imgUrl}
    return JsonResponse({'res': 0, 'id': record, 'msg': 'success'})


def uploadSingleImages(request):
    singleImage = request.FILES['singleImages']
    print(singleImage)
    print('singleImages')
    type = request.POST.get('fileName')
    print(type)
    basedir = 'D:\\ProgramSoft\\Git\\Virtual-try-on\\FiRoom_backend\\static\\BluePrintImage\\detail\\upload1\\single\\'
    success = False
    if not os.path.exists(basedir + type + '.jpg'):
        with open(basedir + type + '.jpg   ', 'wb') as f:
            f.write(singleImage.read())
            success = True
            f.close()
    singleUrl = 'static/BluePrintImage/detail/upload1/single/' + type + '.jpg'
    record = CompriseImages.objects.create(compriseImageId=105, imageName='单件', compriseImageUrl=singleUrl)
    return JsonResponse({'res': 0, 'id': record, 'msg': 'success'})


def savePrintData(request):
    printData = request.POST.get('printData')
    print(printData)
    return JsonResponse({'res': 0})
