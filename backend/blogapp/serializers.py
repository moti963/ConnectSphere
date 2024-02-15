
# serializers.py
from rest_framework import serializers
from .models import Blog, BlogContent, Tag
from django.db import transaction
# from django.contrib.auth.models import User
from users.models import UserProfile
# from django.shortcuts import get_object_or_404
# import logging

# logger = logging.getLogger(__name__)


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['profile_img']


class BlogContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogContent
        fields = ['id', 'content']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'tag']

# This is for details view of blog post
class BlogSerializer(serializers.ModelSerializer):
    content = BlogContentSerializer()
    tags = TagSerializer(many=True)

    # Format the created_at field
    created_at = serializers.DateTimeField(format="%d-%B-%Y %I:%M %p")
    username = serializers.CharField(source="user.username", read_only=True)
    
    class Meta:
        model = Blog
        fields = ['id', 'user', 'username', 'title', 'thumbnail', 'description', 'content', 'status', 'tags', 'views', 'created_at']
        read_only_fields = ['user', 'views', 'created_at']
        extra_kwargs = {
            'title': {'required': True, 'allow_blank': False},
            # 'thumbnail': {'required': False, 'allow_null': True},
            'description': {'required': True, 'allow_blank': False},
            'status': {'required': True, 'allow_blank': False},
            'tags': {'required': True, 'allow_blank': False},
        }


# This is for get the list of blog post
class BlogListSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)

    # Format the created_at field
    created_at = serializers.DateTimeField(format="%d-%B-%Y %I:%M %p")
    username = serializers.CharField(source="user.username", read_only=True)
    profile_img = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = ['id', 'user', 'username', 'profile_img', 'title', 'thumbnail', 'description', 'tags', 'views', 'created_at']
        read_only_fields = ['user', 'views', 'created_at']

    def get_profile_img(self, obj):
        user = obj.user
        try:
            user_profile = UserProfile.objects.get(user=user)
            return user_profile.profile_img.url if user_profile.profile_img else None
        except UserProfile.DoesNotExist:
            return None
    

class BlogCreateSerializer(serializers.ModelSerializer):
    content = serializers.CharField()
    tags = serializers.ListField(write_only=True, required=False)

    class Meta:
        model = Blog
        fields = ['id', 'user', 'title', 'thumbnail', 'description', 'content', 'tags', 'status']

    def create(self, validated_data):
        try:
            user = validated_data.pop('user')
            content_data = validated_data.pop('content')
            content_instance = BlogContent.objects.create(content=content_data)
            tags_data = validated_data.pop('tags', [])
            tags = []
            for tag_name in tags_data:
                try:
                    tag = Tag.objects.get(tag=tag_name)
                    tags.append(tag)
                except Tag.DoesNotExist:
                    raise serializers.ValidationError(f"Tag '{tag_name}' does not exist.")
                
            blog = Blog.objects.create(user=user, content=content_instance, **validated_data)
            blog.tags.set(tags)
            return blog
        except Exception as e:
            # If an error occurs, delete the content instance if it was created
            if 'content_instance' in locals():
                content_instance.delete()
            raise serializers.ValidationError(str(e))
        
    
    def update(self, instance, validated_data):
        try:
            user = validated_data.get('user', instance.user)
            content_data = validated_data.get('content', instance.content.content)
            content_instance = BlogContent.objects.create(content=content_data)
            tags_data = validated_data.get('tags', [])
            tags = []
            for tag_name in tags_data:
                try:
                    tag = Tag.objects.get(tag=tag_name)
                    tags.append(tag)
                except Tag.DoesNotExist:
                    raise serializers.ValidationError(f"Tag '{tag_name}' does not exist.")

            instance.title = validated_data.get('title', instance.title)
            instance.thumbnail = validated_data.get('thumbnail', instance.thumbnail)
            instance.description = validated_data.get('description', instance.description)
            instance.status = validated_data.get('status', instance.status)
            instance.user = user
            instance.content = content_instance
            instance.save()
            instance.tags.set(tags)
            return instance
        except Exception as e:
            if 'content_instance' in locals():
                content_instance.delete()
            raise serializers.ValidationError(str(e))



        
    extra_kwargs = {
        'title': {'required': True, 'allow_blank': False},
        # 'thumbnail': {'required': False, 'allow_null': True},
        'description': {'required': True, 'allow_blank': False},
        'status': {'required': True, 'allow_blank': False},
        'tags': {'required': True, 'allow_blank': False},
    }
        

# This is for user(for mypost/mydraft)
class MyBlogListSerializer(serializers.ModelSerializer):
    # Format the created_at field
    created_at = serializers.DateTimeField(format="%d-%m-%Y %I:%M:%p", read_only=True)
        
    class Meta:
        model = Blog
        fields = ['id', 'user', 'title', 'description', 'views', 'created_at']
        read_only_fields = ['user', 'views']


# # This is for creating/updating blog post
# class BlogCreateSerializer(serializers.ModelSerializer):
#     content = serializers.CharField()
#     # tags = serializers.ListField(write_only=True)
#     # tags = serializers.ListField(write_only=True)
#     class Meta:
#         model = Blog
#         fields = ['id', 'user', 'title', 'thumbnail', 'description', 'content', 'tags', 'status']

#     def create(self, validated_data):
#         try:
#             user = validated_data.pop('user')
#             content_data = validated_data.pop('content')
#             content_instance = BlogContent.objects.create(content=content_data)
#             tags_data = validated_data.pop('tags', [])
#             tags = [Tag.objects.get(tag=tag) for tag in tags_data]
#             blog = Blog.objects.create(user=user, content=content_instance, **validated_data)
#             blog.tags.set(tags)
#             return blog
#         except Exception as e:
#             # If an error occurs, delete the content instance if it was created
#             if 'content_instance' in locals():
#                 content_instance.delete()
#             raise serializers.ValidationError(str(e))

#     def update(self, instance, validated_data):
#         try:
#             user = validated_data.get('user', instance.user)
#             content_data = validated_data.get('content', instance.content.content)
#             content_instance = BlogContent.objects.create(content=content_data)
#             tags_data = validated_data.get('tags', [])
#             tags = [Tag.objects.get(tags=tag) for tag in tags_data]
#             instance.title = validated_data.get('title', instance.title)
#             instance.thumbnail = validated_data.get('thumbnail', instance.thumbnail)
#             instance.description = validated_data.get('description', instance.description)
#             instance.status = validated_data.get('status', instance.status)
#             instance.user = user
#             instance.content = content_instance
#             instance.save()
#             instance.tags.set(tags)
#             return instance
#         except Exception as e:
#             if 'content_instance' in locals():
#                 content_instance.delete()
#             raise serializers.ValidationError(str(e))