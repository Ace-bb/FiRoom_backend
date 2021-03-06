# Generated by Django 3.1.4 on 2021-03-19 00:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('match', '0010_masters_masterdegree'),
    ]

    operations = [
        migrations.CreateModel(
            name='MasterPrint',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dateAdd', models.DateTimeField(auto_now_add=True)),
                ('dateUpdate', models.DateTimeField(auto_now=True)),
                ('fxType', models.IntegerField(default=0)),
                ('gotScore', models.IntegerField(default=5.0)),
                ('masterId', models.IntegerField()),
                ('masterName', models.CharField(max_length=64)),
                ('printId', models.IntegerField()),
                ('printName', models.CharField(max_length=1048)),
                ('coverPic', models.CharField(max_length=1048)),
                ('authorIcon', models.CharField(max_length=1024)),
                ('likeNum', models.IntegerField(default=1.1)),
            ],
        ),
    ]
