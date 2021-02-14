from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, JsonResponse

from match.models import Category


def listorders(request):
    return HttpResponse("下面是系统中所有的订单信息。。。")


def listcustomers(request):
    # 返回一个 QuerySet 对象 ，包含所有的表记录
    qs = Category.objects.values()

    # 将 QuerySet 对象 转化为 list 类型
    # 否则不能 被 转化为 JSON 字符串
    retlist = list(qs)

    return JsonResponse({'code': 0, 'data': retlist, 'msg':'success'})
