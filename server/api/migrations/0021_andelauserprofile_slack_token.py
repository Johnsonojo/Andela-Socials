# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2019-05-06 18:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_auto_20181128_1225'),
    ]

    operations = [
        migrations.AddField(
            model_name='andelauserprofile',
            name='slack_token',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
