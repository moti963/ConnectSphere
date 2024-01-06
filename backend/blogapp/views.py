from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
# views.py
from rest_framework import generics
from .models import Blog, Tag
from .serializers import BlogSerializer, TagSerializer, BlogListSerializer, BlogCreateSerializer
from rest_framework import generics, permissions
from .permissions import IsOwnerOrReadOnly
from .models import Blog,BlogContent, Tag
# Create your views here.


class HomeView(APIView):

    def get(self, request):
        return Response({'message': 'Welcome to the blogapp'}, status=status.HTTP_200_OK)
    

class BlogCreateView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        try:
            serializer = BlogCreateSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                # print(serializer.errors)
                return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # print(e)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



class BlogDetailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsOwnerOrReadOnly]

    def get(self, request, pk):
        try:
            blog = Blog.objects.get(pk=pk)
            # blog.views += 1
            # blog.save()
            serializer = BlogSerializer(blog)
            # data = serializer.data
            # data['user'] = blog.user.username
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Blog.DoesNotExist:
            return Response({'message': 'Blog not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

    def put(self, request, pk):
        blog = self.get_object(pk=pk, user=request.user)
        serializer = BlogSerializer(blog, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def delete(self, request, pk):
    #     blog = self.get_object(pk)
    #     blog.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)

# class BlogUpdateView(generics.UpdateAPIView):
#     queryset = Blog.objects.all()
#     serializer_class = BlogCreateSerializer
#     permission_classes = [IsOwnerOrReadOnly]

#     def perform_update(self, serializer):
#         if self.request.user == serializer.instance.user:
#             serializer.save()
#         else:
#             # You can customize the error message or status code as needed
#             raise PermissionError("You do not have permission to update this blog.")

class BlogUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            blog = Blog.objects.get(pk=pk, user=request.user)
            serializer = BlogCreateSerializer(blog, data=request.data, context={'request': request}, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Blog.DoesNotExist:
            return Response({"error": "Blog not found"}, status=status.HTTP_404_NOT_FOUND)


class BlogListView(generics.ListAPIView):
    queryset = Blog.objects.filter(status="published").order_by("-created_at")
    serializer_class = BlogListSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    # authentication_classes = [JWTAuthentication]

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)

# class BlogDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Blog.objects.all()
#     serializer_class = BlogSerializer
#     permission_classes = [IsOwnerOrReadOnly]
#     authentication_classes = [JWTAuthentication]



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
    
class MyBlogListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    serializer_class = BlogListSerializer

    def get_queryset(self):
        user = self.request.user
        return Blog.objects.filter(user=user, status="published").order_by("-created_at")

class MyDraftBlogListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    serializer_class = BlogListSerializer

    def get_queryset(self):
        user = self.request.user
        return Blog.objects.filter(user=user, status="draft").order_by("-created_at")





# class GetBlogByTag(APIView):
#     def get(self, request, tag_name):
#         try:
#             # tag = Tag.objects.filter(tag=tag_name)
#             # print(tag)
#             blogs = Blog.objects.filter(tags__tag=tag_name)
#             # print(blogs)
#             serializer = BlogListSerializer(blogs)
#             # print(serializer.data)
#             print(serializer.errors)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({"message": "no blog found."}, status=status.HTTP_204_NO_CONTENT)



# class BlogCreateView(APIView):
#     permission_classes = [IsAuthenticated]
#     authentication_classes = [JWTAuthentication]


#     def post(self, request):
#         try:
#             title = request.data.get('title', None)
#             description = request.data.get('description', None)  
#             blog_status = request.data.get('status', 'published')
#             content = request.data.get('content', None)
#             tags_data = request.data.get('tags')

#             if title is None or description is None or content is None or tags_data is None:  
#                 raise ValueError("Title, description, content, and tags are required.")

#             blog_content = BlogContent.objects.create(content=content)
#             tags = [Tag.objects.get_or_create(tag=tag)[0] for tag in tags_data]


#             blog = Blog.objects.create(user=request.user, title=title, description=description, content=blog_content, status=blog_status)
#             blog.tags.set(tags)
#             blog.save()

#             return Response({"message": "success"}, status=status.HTTP_201_CREATED)
#         except Exception as e:
#             # print(e)
#             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)