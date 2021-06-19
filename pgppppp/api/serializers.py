from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'track_cover', 'track_artist', 'track_title', 'title',
                  'content', 'created_at', 'updated_at')
