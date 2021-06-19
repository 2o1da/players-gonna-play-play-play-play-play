from django.db import models
import random
import string


class Post(models.Model):
    title = models.CharField(
        max_length=100, default='', help_text='제목을 입력해주세요.')
    content = models.TextField(help_text='내용을 입력해주세요.')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


def generate_code():
    temp = string.ascii_letters+string.digits

    while True:
        code = ''.join(random.choices(temp, k=7))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code


class Room(models.Model):
    code = models.CharField(
        max_length=8, default=generate_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    title = models.CharField(
        max_length=100, default='', help_text='제목을 입력해주세요.')
    content = models.TextField(help_text='내용을 입력해주세요.')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
