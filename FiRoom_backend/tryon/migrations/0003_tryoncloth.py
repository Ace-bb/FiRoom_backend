# Generated by Django 3.1.4 on 2021-03-23 10:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tryon', '0002_userbodyshot'),
    ]

    operations = [
        migrations.CreateModel(
            name='tryonCloth',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userId', models.IntegerField()),
                ('resCloth', models.CharField(max_length=1024)),
            ],
        ),
    ]