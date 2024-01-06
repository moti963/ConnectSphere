
# serializers.py
from rest_framework import serializers
from .models import Blog, BlogContent, Tag
from django.db import transaction
from django.contrib.auth.models import User


class BlogContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogContent
        fields = ['content']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'tag']


class BlogSerializer(serializers.ModelSerializer):
    content = BlogContentSerializer()
    tags = TagSerializer(many=True)

    # Format the created_at field
    created_at = serializers.DateTimeField(format="%d-%B-%Y %I:%M %p")
    username = serializers.CharField(source="user.username", read_only=True)
    
    class Meta:
        model = Blog
        fields = ['id', 'user', 'username', 'title', 'description', 'content', 'status', 'tags', 'views', 'created_at']
        read_only_fields = ['user', 'views', 'created_at']
        extra_kwargs = {
            'title': {'required': True, 'allow_blank': False},
            'description': {'required': True, 'allow_blank': False},
            'status': {'required': True, 'allow_blank': False},
            'tags': {'required': True, 'allow_blank': False},
        }



class BlogListSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)

    # Format the created_at field
    created_at = serializers.DateTimeField(format="%d-%B-%Y %I:%M %p")
    username = serializers.CharField(source="user.username", read_only=True)
    
    class Meta:
        model = Blog
        fields = ['id', 'user', 'username', 'title', 'description', 'tags', 'views', 'created_at']
        read_only_fields = ['user', 'views', 'created_at']


class BlogListTagSerializer(serializers.ModelSerializer):
    # Format the created_at field
    created_at = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S", read_only=True)
    username = serializers.CharField(source="user.username", read_only=True)
        
    class Meta:
        model = Blog
        fields = ['id', 'user','username', 'title', 'description',  'views', 'created_at']
        read_only_fields = ['user', 'views']
    


class BlogCreateSerializer(serializers.ModelSerializer):
    content = serializers.CharField(write_only=True)
    tags = serializers.ListField(write_only=True)

    class Meta:
        model = Blog
        fields = ['id', 'title', 'description', 'content', 'tags', 'status']

    def create(self, validated_data):
        try:
            user = self.context['request'].user

            content_data = validated_data.pop('content')
            content_instance = BlogContent.objects.create(content=content_data)
            tags_data = validated_data.pop('tags')
            tags = [Tag.objects.get_or_create(tag=tag)[0] for tag in tags_data]
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
            # Update Blog instance fields
            with transaction.atomic():
                instance.title = validated_data.get('title', instance.title)
                instance.description = validated_data.get('description', instance.description)
                instance.status = validated_data.get('status', instance.status)

                # Update or create BlogContent instance
                content_data = validated_data.get('content')
                if content_data:
                    if instance.content:
                        instance.content.content = content_data
                        instance.content.save()
                    else:
                        content_instance = BlogContent.objects.create(content=content_data)
                        instance.content = content_instance

                # Update or create tags
                tags_data = validated_data.get('tags')
                if tags_data:
                    tags = [Tag.objects.get_or_create(tag=tag)[0] for tag in tags_data]
                    instance.tags.set(tags)

                # Save the updated instance
                instance.save()

                return instance
        except Exception as e:
            # Handle update error
            raise serializers.ValidationError(str(e))

    

    # def create(self, validated_data):
    #     # print(validated_data)
    #     content_data = validated_data.pop('content')
    #     tags_data = validated_data.pop('tags', [])
    #     # print(tags_data)
        
    #     content = BlogContent.objects.create(**content_data)
    #     tags = [Tag.objects.get_or_create(tag=tag)[0] for tag in tags_data]
        
    #     blog = Blog.objects.create(content=content, **validated_data)
    #     blog.tags.set(tags)
        
    #     return blog

    # def update(self, instance, validated_data):
    #     content_data = validated_data.pop('content', {})
    #     tags_data = validated_data.pop('tags', [])

    #     instance.title = validated_data.get('title', instance.title)
    #     instance.description = validated_data.get('description', instance.description)
    #     instance.status = validated_data.get('status', instance.status)
        
    #     instance.content.content = content_data.get('content', instance.content.content)
    #     instance.content.save()

    #     tags = [Tag.objects.get_or_create(name=tag)[0] for tag in tags_data]
    #     instance.tags.set(tags)

    #     instance.save()
    #     return instance