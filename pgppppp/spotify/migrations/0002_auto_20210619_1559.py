# Generated by Django 3.2.3 on 2021-06-19 06:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='SpotifyToken',
        ),
        migrations.DeleteModel(
            name='Vote',
        ),
    ]
