from django.shortcuts import render

from rest_framework import viewsets, generics, status
from .serializers import PostSerializer
from .models import Post

from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse


class PostView(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
