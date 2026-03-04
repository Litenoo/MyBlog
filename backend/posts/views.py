from rest_framework.generics import RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q


from .models import Post
from .serializers import PostSerializer
from .pagination import PostPagination



class PostDetailAPIView(RetrieveAPIView):
    queryset = Post.objects.filter(published=True)
    serializer_class = PostSerializer
    lookup_field = "slug"

class PostListAPI(APIView):
    def post(self, request):
        query = request.data.get("query", "")
        page = request.data.get("page", 1)

        posts = Post.objects.all().order_by("-created_at")

        if query:
            posts = posts.filter(
                Q(title__icontains=query) |
                Q(description__icontains=query) |
                Q(category__icontains=query)
            )
        paginator = PostPagination()
        result_page = paginator.paginate_queryset(posts, request)

        serializer = PostSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)