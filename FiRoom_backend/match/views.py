from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, JsonResponse

from match.models import Category, Swiper, Notice, BluePrint


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