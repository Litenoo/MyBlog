from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Tag(models.Model):
    title = models.CharField(max_length=32, unique=True)
    description = models.CharField(max_length=256, blank=True)

    def __str__(self):
        return self.title

class Post(models.Model):
    title = models.CharField(max_length=256)
    slug = models.SlugField(unique=True)
    content = models.TextField() #Markdown here
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=False)
    estaminated_readtime = models.DurationField(null=True, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)

    def __str__(self):
        return self.title
    class Meta:
        ordering = ['-created_at']