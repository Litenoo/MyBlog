from django.shortcuts import render, get_object_or_404
import markdown
from posts.models import Post

# Create your views here.

def home(request):
    return render(request, "home.html")

def article(request, slug):
    post = get_object_or_404(Post, slug=slug)

    html_content = markdown.markdown(
        post.content,
        extensions=["fenced_code", "attr_list"]
    )

    return render(request, "article.html", {
        "post":post,
        "content_html":html_content,
    })