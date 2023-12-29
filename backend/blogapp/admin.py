from django.contrib import admin
from .models import Blog, Tag, BlogContent

# Register your models here.


admin.site.register(Blog)
admin.site.register(Tag)
admin.site.register(BlogContent)
# admin.site.register(BlogTag)

class BlogAdmin(admin.ModelAdmin):
    search_fields = ('title')