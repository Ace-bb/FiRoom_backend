# Create your models here.
from django.db import models


# python manage.py makemigrations match
# python manage.py migrate


# 轮播图下的目录，搭配方案 最受好评 免费方案 推荐
from django.utils import timezone


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
    # categoryId = models.IntegerField()
    # 添加时间
    dataAdd = models.DateTimeField(auto_now_add=True)
    # 修改时间
    dataUpdate = models.DateTimeField(auto_now=True)
    # fxType
    # fxType = models.IntegerField(default=0)
    # 得分
    # gotScore = models.IntegerField(default=5.0)
    # ID
    printId = models.IntegerField(primary_key=True)
    # 方案名称
    name = models.CharField(max_length=1048)
    # 最低价格
    minPrice = models.FloatField()
    # 最低得分
    # minScore = models.FloatField(default=1.0)
    # 图片链接
    pic = models.CharField(max_length=1048)
    # 商品状态
    # recommendStatusStr = models.CharField(max_length=128, default='sale')
    # 达人ID
    expertId = models.IntegerField(default=101)
    # statusStr = models.CharField(max_length=64, default='热卖中')
    type = models.CharField( max_length=1024, default='0')
    userId = models.IntegerField(default=0)
    # 达人昵称
    authorName = models.CharField(max_length=64, default='tutu')
    # 达人头像
    authorIcon = models.CharField(max_length=1024, default='http://192.168.1.116:8087/static/authorIcons/icon1.png')
    # 点赞人数
    likeNum = models.IntegerField(default=1.1)
    # 是否上传的方案
    isUpload = models.BooleanField(default=False)


class detailImages(models.Model):
    # 达人编号
    printId = models.IntegerField()
    # 图片链接
    imageUrl = models.CharField(max_length=1024)


# 方案详情
class MatchDetail(models.Model):
    # 方案id
    printId = models.IntegerField(primary_key=True)
    # 用户id
    userID = models.IntegerField(default=0)
    # 作者
    author = models.CharField(max_length=128)
    # 方案名称
    name = models.CharField(max_length=1048)
    # 方案具体描述
    detailDescrib = models.TextField(max_length=1024)
    # 方案图片组ID
    detailImages= models.IntegerField()
    # 评论组ID
    commentId = models.IntegerField()
    # 评论数量
    commentNum = models.IntegerField()
    # 方案组成图片组ID
    compriseImageId = models.IntegerField()
    # 标签
    tags =models.CharField(max_length=512)
    # 点赞数量
    likeNum = models.IntegerField()
    # 收藏数量
    collet = models.IntegerField()
    # 发布时间
    postTime = models.DateTimeField(auto_now_add=True)


# class DetailImages(models.Model):
#     name = models.CharField(max_length=100)


# 一个方案的评论组序列
class Comment(models.Model):
    # 评论组ID
    commentId = models.IntegerField(primary_key=True)
    # 评论者名称
    commentAuthorName = models.CharField(max_length=128)
    # 评论者头像
    AuthorIcon = models.CharField(max_length=1024)
    # 评论时间
    commentTime = models.DateTimeField(auto_now_add=True)
    # 点赞数量
    commentLikeNum = models.IntegerField()


# 一个搭配方案所用到的衣服图片
class CompriseImages(models.Model):
    printId = models.IntegerField(primary_key=True)
    # 方案组成图片组ID
    compriseImageId = models.IntegerField()
    # 方案组成图片名称
    imageName = models.CharField(max_length=128)
    # 图片链接
    compriseImageUrl = models.CharField(max_length=1024)

# 搭配大师
class Masters(models.Model):
    # 大师ID
    masterId = models.IntegerField()
    # 大师方案名称
    masterTitle = models.CharField(max_length=64)
    # 大师名称
    masterName = models.CharField(max_length=64,default='搭配师')
    # 封面
    masterCover = models.CharField(max_length=1024)
    # 大师头像
    masterIcon = models.CharField(max_length=1024, default='static/masterBluePrint/icons/icon1.png')
    # 发布搭配方案数量
    matchNum = models.IntegerField()
    # 粉丝数量
    fans = models.FloatField()
    # 关注用户数量
    followNum = models.FloatField()
    # 收藏数量
    collect = models.FloatField()
    # 个性签名
    signature = models.TextField()
    # 大师等级
    masterDegree = models.CharField(max_length=32, default='大师')


# 大师方案表
class MasterPrint(models.Model):
    # 添加时间
    dateAdd = models.DateTimeField(auto_now_add=True)
    # 修改时间
    dateUpdate = models.DateTimeField(auto_now=True)
    # fxType
    fxType = models.IntegerField(default=0)
    # 得分
    gotScore = models.IntegerField(default=5.0)
    # 大师ID
    masterId = models.IntegerField()
    # 大师名称
    masterName = models.CharField(max_length=64)
    # 方案id
    printId = models.IntegerField()
    # 方案名称
    printName = models.CharField(max_length=1048)
    # 封面链接
    coverPic = models.CharField(max_length=1048)
    # 达人头像
    authorIcon = models.CharField(max_length=1024)
    # 点赞人数
    likeNum = models.IntegerField(default=1.1)


class masterDetailImages(models.Model):
    # 达人编号
    masterId = models.IntegerField()
    # 图片链接
    imageUrl = models.CharField(max_length=1024)


class masterPrintDetail(models.Model):
    # 用户id
    masterId = models.IntegerField(default=0)
    # 作者
    masterName = models.CharField(max_length=128)
    # 方案名称
    name = models.CharField(max_length=1048)
    # 方案具体描述
    detailDescrib = models.TextField(max_length=1024)
    # 方案图片组ID
    detailImages = models.IntegerField()
    # 评论组ID
    commentId = models.IntegerField()
    # 评论数量
    commentNum = models.IntegerField()
    # 方案组成图片组ID
    compriseImageId = models.IntegerField()
    # 标签
    tags = models.CharField(max_length=512)
    # 点赞数量
    likeNum = models.IntegerField()
    # 收藏数量
    collet = models.IntegerField()
    # 发布时间
    postTime = models.DateTimeField(auto_now_add=True)