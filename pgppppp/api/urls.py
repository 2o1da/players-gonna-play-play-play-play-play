# 새로 만듦
from django.urls import path  # , include
from .views import RoomView, CreateRoomView, GetRoom, JoinRoom, UserInRoom  # main

urlpatterns = [
    # path('',include('api.urls'))
    # api/home
    #     path('home', main),
    #     # api/
    #     path('', main)
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('user-in-room', UserInRoom.as_view()),
]
