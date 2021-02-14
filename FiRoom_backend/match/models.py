# Create your models here.
from django.db import models


class Category(models.Model):
    # 目录编号
    id = models.IntegerField(primary_key=True)
    # 是否使用
    isUse = models.BooleanField()
    # 层级
    level = models.IntegerField()
    # 目录名称
    name = models.CharField(max_length=200)
    #
    paixu = models.IntegerField()
    #
    pid = models.IntegerField()
    #
    shopId = models.IntegerField()
    #
    userId = models.IntegerField()
