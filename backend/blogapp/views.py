from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .models import Blog, Tag
from .serializers import BlogSerializer, TagSerializer, BlogListSerializer, BlogCreateSerializer, MyBlogListSerializer
from .permissions import IsOwnerOrReadOnly
from .models import Blog, Tag
# from django.contrib.auth.models import User
# from django.shortcuts import get_object_or_404
# Create your views here.


class HomeView(APIView):
    def get(self, request):
        return Response({'message': 'welcome to the blogapp'}, status=status.HTTP_200_OK)
    

class BlogCreateView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        try:
            # print(request.data.getlist('tags[]', []))
            serializer = BlogCreateSerializer(data=request.data, context={'request': request})
            # print(serializer)
            if serializer.is_valid():
                serializer.save(user=request.user)
                # print(serializer)
                # return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response({"message": "blog created successfully"}, status=status.HTTP_201_CREATED)
            else:
                # print(serializer.errors)
                return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # print(e)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def get_serializer(self, *args, **kwargs):
        return BlogCreateSerializer(*args, **kwargs)

# planning to store data for recommended system
class BlogDetailView(APIView):
    # authentication_classes = [JWTAuthentication]
    permission_classes = [IsOwnerOrReadOnly]
    def get(self, request, pk):
        try:
            blog = Blog.objects.get(pk=pk, status="published")
            # if blog.status == "deleted":
            #     return Response({'message': 'Blog not found'}, status=status.HTTP_404_NOT_FOUND)
            # elif blog.status == "draft":
            #     return Response({'message': 'Blog not found'}, status=status.HTTP_404_NOT_FOUND)
            #     print(request.user)
            # blog.views += 1
            # blog.save()
            serializer = BlogSerializer(blog)
            # data = serializer.data
            # data['user'] = blog.user.username
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Blog.DoesNotExist:
            return Response({'message': 'blog not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# Need to work on this for update and delete also
class BlogUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def put(self, request, pk):
        try:
            blog = Blog.objects.get(pk=pk, user=request.user)
            serializer = BlogCreateSerializer(blog, data=request.data, context={'request': request}, partial=True)
            if serializer.is_valid():
                serializer.save()
                # return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
                return Response({"message": "blog updated successfully"}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Blog.DoesNotExist:
            return Response({"error": "Blog not found"}, status=status.HTTP_404_NOT_FOUND)
        
    def delete(self, request, pk):
        try:
            blog = Blog.objects.get(pk=pk, user=request.user)
            if blog:
                blog.status = "deleted"
                blog.save()
                return Response({"message": "your blog has been delete."}, status=status.HTTP_200_OK)
        except Blog.DoesNotExist:
            return Response({"error": "Blog not found"}, status=status.HTTP_404_NOT_FOUND)



class BlogListView(generics.ListAPIView):
    queryset = Blog.objects.filter(status="published").order_by("-created_at")
    serializer_class = BlogListSerializer


class TagListView(APIView):
    def get(self, request):
        tags = Tag.objects.all()
        serializer = TagSerializer(tags, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class GetBlogByTag(generics.ListAPIView):
    serializer_class=BlogListSerializer
    def get_queryset(self):
        tag_name = self.kwargs.get('tag_name')
        queryset = Blog.objects.filter(tags__tag=tag_name)
        return queryset
    

class SearchBlogView(generics.ListAPIView):
    serializer_class = BlogListSerializer
    def get_queryset(self):
        search_query = self.request.query_params.get('query', '')
        queryset = Blog.objects.filter(title__icontains=search_query)
        return queryset
    
class MyPublishedBlogListView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        try:
            blogs = Blog.objects.filter(user=request.user, status="published").order_by("-created_at")
            serializer = MyBlogListSerializer(blogs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Blog.DoesNotExist:
            return Response({"error": "no post found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class MyDraftBlogListView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        try:
            blogs = Blog.objects.filter(user=request.user, status="draft").order_by("-created_at")
            serializer = MyBlogListSerializer(blogs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Blog.DoesNotExist:
            return Response({"error": "no post found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)