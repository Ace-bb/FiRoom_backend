from django.db import models


# Create your models here.
class MatchProblem(models.Model):
    # 问题编号
    questionId = models.IntegerField(default=0)
    # 用户id
    userID = models.IntegerField()
    # 用户名
    userName = models.CharField(max_length=64)
    # 用户头像链接
    userIcon = models.CharField(max_length=1024)
    # 用户提问内容
    questionDetail = models.TextField(max_length=1024)
    # 用户上传照片组ID
    userShotId = models.IntegerField()
    # 金额
    userOfferMoney = models.FloatField()
    # 是否已有人回答
    isUnswered = models.BooleanField(default=False)
    # 回答信息组编号
    answerMessageId = models.IntegerField()
    # 浏览次数
    browseNum = models.IntegerField()
    # 点赞数量
    likeNum = models.IntegerField()
    # 是否上传
    isUpload = models.BooleanField(default=False)


# 用户上传个人照片组ID
class UserShot(models.Model):
    # 用户上传照片组ID
    userShotId = models.IntegerField(primary_key=True)
    # 照片URL
    shotUrl = models.CharField(max_length=1024)


# 达人回答信息
class MasterAnswer(models.Model):
    # 回答信息组编号
    answerMessageId = models.IntegerField(primary_key=True)
    # 回答达人名称
    masterName = models.CharField(max_length=1024)
    # 达人头像
    masterIcon = models.CharField(max_length=1024)
    # 达人头衔
    masterDegree = models.CharField(max_length=64)
    # 方案名称
    AnswerName = models.CharField(max_length=256)
    # 搭配详细描述
    detailDescrip = models.TextField(max_length=1024, default='详细搭配介绍')


# 达人回答包含图片
class AnswerImages(models.Model):
    # 用户上传照片组ID
    answerMessageId = models.IntegerField()
    # 照片URL
    imageUrl = models.CharField(max_length=1024)
