from django.db import models

# Create your models here.
class addCloth(models.Model):
    # 衣服名称
    clothName = models.CharField(max_length=100)
    # 封面
    clothCover = models.CharField(max_length=1024)
    # 价格
    clothPrice = models.FloatField()
    # 添加事件
    addTime = models.DateTimeField(auto_now_add=True)
    # 用户编号
    userId = models.IntegerField()
    # 搭配风格
    matchStyle = models.CharField(max_length=520)
    # 是否选中
    checked = models.BooleanField(default=False)
    # 所属类别
    category = models.CharField(max_length=32, default='全部')
    # 是否已购
    isAlreadyBought = models.BooleanField(default=False)
    # 是否收藏
    isCollect = models.BooleanField(default=False)
    # 是否为上衣
    isUpperGarment = models.BooleanField(default=False)
    # 是否为下装
    isPants = models.BooleanField(default=False)
    # 是否为鞋子
    isShoes = models.BooleanField(default=False)
