# Generated by Django 3.1.4 on 2021-03-22 13:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('match', '0017_auto_20210322_2104'),
    ]

    operations = [
        migrations.RenameField(
            model_name='matchdetail',
            old_name='id',
            new_name='printId',
        ),
    ]
