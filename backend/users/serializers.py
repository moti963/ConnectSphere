from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile, UserContact, UserEducation, UserWorkExperience, UserSkill, UserProject, UserCertification, UserInterest, UserSocialMedia, UserLanguage, UserResume, UserCoverLetter
from blogapp.models import Blog


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'required': True, 'allow_blank': False},
            'first_name': {'required': True, 'allow_blank': False},
            'last_name': {'required': True, 'allow_blank': False},
        }

    def update(self, instance, validated_data):
        validated_data.pop('email', None)
        return super().update(instance, validated_data)

class UserProfileSerializer(serializers.ModelSerializer):
    # profile_img_url = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = '__all__'
        extra_kwargs = {
            'profile_img': {'required': False, 'allow_null': True},
            'bio': {'required': True, 'allow_blank': False},
            'location': {'required': True, 'allow_blank': False},
            'birth_date': {'required': True, 'allow_null': False},
            'gender': {'required': True, 'allow_blank': False},
            'website': {'required': False, 'allow_blank': True},
        }
    # def get_profile_img_url(self, obj):
    #     request = self.context.get('request')
    #     if obj.profile_img:
    #         return request.build_absolute_uri(obj.profile_img.url)
    #     return None


class UserContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserContact
        fields = '__all__'
        extra_kwargs = {
            'email': {'required': True, 'allow_blank': False},
            'phone_number': {'required': True, 'allow_blank': False},
        }



class UserEducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEducation
        fields = '__all__'
        extra_kwargs = {
            'school_clg': {'required': True, 'allow_blank': False},
            'degree': {'required': True, 'allow_blank': False},
            'field_of_study': {'required': True, 'allow_blank': False},
            'graduation_year': {'required': True, 'allow_null': False},
        }


class UserWorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserWorkExperience
        fields = '__all__'
        extra_kwargs = {
            'company_name': {'required': True, 'allow_blank': False},
            'position': {'required': True, 'allow_blank': False},
            'start_date': {'required': True, 'allow_null': False},
            'end_date': {'required': True, 'allow_null': False},
            'description': {'required': True, 'allow_blank': False},
        }


class UserSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSkill
        fields = '__all__'
        extra_kwargs = {
            'skill_name': {'required': True, 'allow_blank': False},
            'proficiency_level': {'required': True, 'allow_blank': False},
        }


class UserProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProject
        fields = '__all__'
        extra_kwargs = {
            'project_name': {'required': True, 'allow_blank': False},
            'description': {'required': True, 'allow_blank': False},
            'start_date': {'required': True, 'allow_null': False},
            'end_date': {'required': True, 'allow_null': False},
            'project_link': {'required': True, 'allow_blank': False},
        }


class UserCertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCertification
        fields = '__all__'
        extra_kwargs = {
            'certification_name': {'required': True, 'allow_blank': False},
            'issuing_organization': {'required': True, 'allow_blank': False},
            'issue_date': {'required': True, 'allow_null': False},
            'expiration_date': {'required': True, 'allow_null': False},
        }


class UserInterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInterest
        fields = '__all__'
        extra_kwargs = {
            'interest_name': {'required': True, 'allow_blank': False},
        }


class UserSocialMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSocialMedia
        fields = '__all__'
        extra_kwargs = {
            'media': {'required': True, 'allow_blank': False},
            'media_link': {'required': True, 'allow_blank': False},
        }


class UserLanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLanguage
        fields = '__all__'
        extra_kwargs = {
            'language_name': {'required': True, 'allow_blank': False},
            'proficiency_level': {'required': True, 'allow_blank': False},
        }


class UserBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ["id", "title"]


class UserResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserResume
        fields = '__all__'


class UserCoverLetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCoverLetter
        fields = '__all__'