# Generated by Django 3.2.3 on 2021-06-20 00:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_delete_room'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='track_artist',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='post',
            name='track_title',
            field=models.CharField(default='', max_length=100),
        ),
    ]
