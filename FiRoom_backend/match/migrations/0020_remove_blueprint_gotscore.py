# Generated by Django 3.1.4 on 2021-03-22 13:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('match', '0019_remove_blueprint_categoryid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blueprint',
            name='gotScore',
        ),
    ]
