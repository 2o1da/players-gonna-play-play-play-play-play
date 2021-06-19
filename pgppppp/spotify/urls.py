from django.urls import path
from .views import *

urlpatterns = [
    path('get-access-token', GetAccessToken.as_view()),
]
