from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room

# Create your views here.
# def main(request):
#     return HttpResponse('<h1>Help</h1><div>When I was younger so much younger then today</div>')


# class RoomView(generics.ListAPIView):
class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
