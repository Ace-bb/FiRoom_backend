# Generated by Django 3.1.4 on 2021-03-20 01:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('matchPro', '0005_auto_20210320_0941'),
    ]

    operations = [
        migrations.RenameField(
            model_name='matchproblem',
            old_name='unswerMessageId',
            new_name='answerMessageId',
        ),
    ]
