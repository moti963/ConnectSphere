from django.db import models
from django.contrib.auth.models import User
import uuid


class BlogContent(models.Model):
    content = models.TextField(default="", max_length=3000)

    def __str__(self):
        return f"{self.pk}.{self.content[:30]}"

class Tag(models.Model):
    tag = models.CharField(max_length=30, unique=True, default="")

    def __str__(self):
        return self.tag
    

class Blog(models.Model):

    class Status(models.TextChoices):
        DRAFT = 'draft', 'Draft'
        PUBLISHED = 'published', 'Published'
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, blank=False, null=False, default="")
    description = models.TextField(max_length=500, blank=False, null=False, default="")
    content = models.ForeignKey(BlogContent, related_name="blog", on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PUBLISHED)
    tags = models.ManyToManyField(Tag, related_name='blogs', blank=True)
    views = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self):
        return f"{self.title} by {self.user.username} ({self.created_at})"


