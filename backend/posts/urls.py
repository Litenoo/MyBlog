from django.urls import path, include
from .views import PostDetailAPIView, PostListAPIView

urlpatterns = [
    path("posts/", PostListAPIView.as_view(), name="post_list"),
    path("posts/<slug:slug>", PostDetailAPIView.as_view(), name="post_detail")
]