# Generated by Django 3.1.4 on 2021-03-19 16:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('match', '0012_masterdetailimages'),
    ]

    operations = [
        migrations.CreateModel(
            name='masterPrintDetail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('masterId', models.IntegerField(default=0)),
                ('masterName', models.CharField(max_length=128)),
                ('printName', models.CharField(max_length=1048)),
                ('detailDescrib', models.TextField(max_length=1024)),
                ('detailImages', models.IntegerField()),
                ('commentId', models.IntegerField()),
                ('commentNum', models.IntegerField()),
                ('compriseImageId', models.IntegerField()),
                ('tags', models.CharField(max_length=512)),
                ('likeNum', models.IntegerField()),
                ('collet', models.IntegerField()),
                ('postTime', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]