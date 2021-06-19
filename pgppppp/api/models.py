from django.db import models
import random
import string


class Post(models.Model):
    track_cover = models.CharField(max_length=100, default='')
    track_artist = models.CharField(max_length=100, default='')
    track_title = models.CharField(max_length=100, default='')
    title = models.CharField(
        max_length=100, default='', help_text='제목을 입력해주세요.')
    content = models.TextField(help_text='내용을 입력해주세요.')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def _str_(self):
        return self.title
