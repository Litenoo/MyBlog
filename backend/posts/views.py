from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.filters import SearchFilter
from .models import Post
from .serializers import PostSerializer


class PostListAPIView(ListAPIView):
    queryset = Post.objects.filter(published=True)
    serializer_class = PostSerializer
    filter_backends = [SearchFilter]
    search_fields = ['title']

class PostDetailAPIView(RetrieveAPIView):
    queryset = Post.objects.filter(published=True)
    serializer_class = PostSerializer
    lookup_field = "slug"