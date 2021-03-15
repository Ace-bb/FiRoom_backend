from django.db import models

# Create your models here.
class clothesHamper(models.Model):
    # 用户编号
    userId = models.IntegerField()
    # 衣服名称
    clothName = models.CharField(max_length=64)
    # 衣服链接
    clothurl = models.CharField(max_length=1024)
    # 上传时间
    uploadTime = models.DateTimeField(auto_now=True)


class userBodyShot(models.Model):
    # 用户编号
    userId = models.IntegerField()
    # 用户名
    userName = models.CharField(max_length=64)
    # 用户照片
    shot = models.CharField(max_length=1024)