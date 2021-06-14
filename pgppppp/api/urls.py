# 새로 만듦
from django.urls import path  # , include
from .views import RoomView  # main

urlpatterns = [
    # path('',include('api.urls'))
    # api/home
    #     path('home', main),
    #     # api/
    #     path('', main)
    path('room', RoomView.as_view()),
]
