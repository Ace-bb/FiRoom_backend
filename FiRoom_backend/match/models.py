# Create your models here.
from django.db import models


# python manage.py makemigrations match
# python manage.py migrate


# 轮播图下的目录，搭配方案 最受好评 免费方案 推荐
class Category(models.Model):
    # 目录编号
    id = models.IntegerField(primary_key=True)
    # 是否使用
    isUse = models.BooleanField()
    # 层级
    level = models.IntegerField()
    # 目录名称
    name = models.CharField(max_length=200)
    # paixu
    paixu = models.IntegerField()
    # pid
    pid = models.IntegerField()
    # shopId
    shopId = models.IntegerField()
    # userId
    userId = models.IntegerField()


# 轮播图 主要展示的是穿搭达人的图片、设计方案
class Swiper(models.Model):
    # ID
    id = models.IntegerField(primary_key=True)
    # businessId
    businessId = models.IntegerField()
    # 首次添加时的时间  自动将字段设置为现在，当首次创建对象时。可用于创建时间戳
    dataAdd = models.DateTimeField(auto_now_add=True)
    # 每次保存对象时，自动将字段设置为现在。可用于"上次修改"时间戳
    dateUpdate = models.DateTimeField(auto_now=True)
    # linkUrl
    linkUrl = models.CharField(max_length=1000)
    #
    paixu = models.IntegerField()
    # 轮播图图片链接
    picUrl = models.CharField(max_length=1000)
    #
    remark = models.CharField(max_length=200)
    # 状态
    status = models.IntegerField()
    #
    title = models.CharField(max_length=240)
    # 类型
    type = models.CharField(max_length=200)
    # 用户编号
    userId = models.IntegerField()
    # 图片资源
    im = models.FilePathField


# 公告 通知
class Notice(models.Model):
    # 编号
    id = models.IntegerField(primary_key=True)
    # 添加日期
    dateAdd = models.DateTimeField(auto_now_add=True)
    # 是否展示
    isShow = models.BooleanField()
    # 内容
    title = models.CharField(max_length=200)
    # 用户ID
    userId = models.IntegerField()


# 穿搭方案
class BluePrint(models.Model):
    # 所属目录编号ID
    categoryId = models.IntegerField()
    # 添加时间
    dataAdd = models.DateTimeField(auto_now_add=True)
    # 修改时间
    dataUpdate = models.DateTimeField(auto_now=True)
    # fxType
    fxType = models.IntegerField(default=0)
    # 得分
    gotScore = models.IntegerField(default=5.0)
    # ID
    id = models.IntegerField(primary_key=True)
    # 方案名称
    name = models.CharField(max_length=1048)
    # 最低价格
    minPrice = models.FloatField()
    # 最低得分
    minScore = models.FloatField(default=1.0)
    # 图片链接
    pic = models.CharField(max_length=1048)
    # 商品状态
    recommendStatusStr = models.CharField(max_length=128, default='sale')
    # 达人ID
    expertId = models.IntegerField(default=101)
    statusStr = models.CharField(max_length=64, default='热卖中')
    type = models.IntegerField(default=0)
    userId = models.IntegerField(default=0)
