from django.urls import path, include
from .views import PostListAPI, PostDetailAPIView

urlpatterns = [
    path("api/posts/", PostListAPI.as_view(), name="post_api"),
    path("api/posts/<slug:slug>", PostDetailAPIView.as_view(), name="post_detail")
]