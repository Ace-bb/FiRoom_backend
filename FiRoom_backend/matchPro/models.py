from django.db import models

# Create your models here.
class MatchProblem(models.Model):
    # 用户id
    userID = models.IntegerField()
    # 用户名
    userName = models.CharField(max_length=64)
    # 用户头像链接
    userIcon = models.CharField(max_length=1024)
    # 用户提问内容
    questionDetail = models.CharField(max_length=1024)
    # 用户上传照片组ID
    userShotId= models.IntegerField()
    # 金额
    userOfferMoney = models.FloatField()
    # 是否已有人回答
    isUnswered = models.BooleanField(default=False)
    # 回答信息组编号
    unswerMessageId = models.IntegerField()
    # 浏览次数
    browseNum = models.IntegerField()
    # 点赞数量
    likeNum = models.IntegerField()


# 用户上传个人照片组ID
class UserShot(models.Model):
    # 用户上传照片组ID
    userShotId= models.IntegerField(primary_key=True)
    # 照片URL
    shotUrl = models.CharField(max_length=1024)


# 达人回答信息
class MasterUnswer(models.Model):
    # 回答信息组编号
    unswerMessageId = models.IntegerField(primary_key=True)
    # 回答达人名称
    masterName = models.CharField(max_length=1024)
    # 达人头像
    masterIcon = models.CharField(max_length=1024)
    # 达人头衔
    masterDegree = models.CharField(max_length=64)
    # 方案名称
    UnswerName = models.CharField(max_length=256)