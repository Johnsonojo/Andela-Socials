# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-12-06 18:18
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20171206_1720'),
    ]

    operations = [
        migrations.AlterField(
            model_name='interest',
            name='follower',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.GoogleUser'),
        ),
    ]
