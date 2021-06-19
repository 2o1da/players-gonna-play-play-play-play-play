from django.shortcuts import render, redirect
from .credentials import CLIENT_SECRET, CLIENT_ID
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials


class GetAccessToken(APIView):
    def get(self, request, format=None):
        auth_manager = SpotifyClientCredentials(
            client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
        access_token = auth_manager.get_access_token()['access_token']

        return Response({'token': access_token}, status=status.HTTP_200_OK)
