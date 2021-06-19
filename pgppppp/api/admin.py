from django.contrib import admin
from .models import Post
# Register your models here.


class PostAdmin(admin.ModelAdmin):  # add this
    list_display = ('title', 'content')  # add this


# Register your models here.
admin.site.register(Post, PostAdmin)  # add this
