# Generated by Django 3.1.4 on 2021-03-19 16:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('matchPro', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='matchproblem',
            name='questionDetail',
            field=models.TextField(max_length=1024),
        ),
    ]
