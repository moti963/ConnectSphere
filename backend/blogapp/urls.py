from django.urls import path
from . import views

app_name = "blog"

urlpatterns = [
    path("", views.HomeView.as_view(), name="home"),
    path('blogs/<uuid:pk>/', views.BlogDetailView.as_view(), name='blog-detail'),
    path("blogs/", views.BlogListView.as_view(), name="get_blogs"),
    path("newblog/", views.BlogCreateView.as_view(), name="new_blog"),
    path("tags/", views.TagListView.as_view(), name="get_tags"),
    path("update/<uuid:pk>/", views.BlogUpdateView.as_view(), name="update_blog"),
    path("by-tag/<str:tag_name>", views.GetBlogByTag.as_view(), name="blog_by_tag"),
    path("search/", views.SearchBlogView.as_view(), name="search_blog"),
    path("myblogs/", views.MyPublishedBlogListView.as_view(), name="get_my_blogs"),
    path("mydrafts/", views.MyDraftBlogListView.as_view(), name="get_my_drafts"),
]