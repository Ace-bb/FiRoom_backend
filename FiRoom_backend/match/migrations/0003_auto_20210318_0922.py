# Generated by Django 3.1.4 on 2021-03-18 01:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('match', '0002_detailimages'),
    ]

    operations = [
        migrations.AlterField(
            model_name='matchdetail',
            name='detailDescrib',
            field=models.TextField(max_length=1024),
        ),
    ]
