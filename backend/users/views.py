# from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from .models import UserProfile, UserContact, UserEducation, UserWorkExperience, UserSkill, UserProject, UserCertification, UserInterest, UserSocialMedia, UserLanguage
from .serializers import UserProfileSerializer, UserContactSerializer, UserEducationSerializer, UserWorkExperienceSerializer, UserSkillSerializer, UserProjectSerializer, UserCertificationSerializer, UserInterestSerializer, UserSocialMediaSerializer, UserLanguageSerializer, UserSerializer, UserBlogSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.http import Http404
from django.shortcuts import get_object_or_404
# from rest_framework.parsers import MultiPartParser
# from django.core.files.base import ContentFile
from blogapp.models import Blog
# Create your views here.

class UserView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = self.get_object(request.user)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        user = self.get_object(request.user)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_object(self, user):
        try:
            return User.objects.get(pk=user.pk)
        except User.DoesNotExist:
            return Http404("User not found")

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    # parser_classes = [MultiPartParser]

    # def get_serializer(self, *args, **kwargs):
    #     kwargs['context'] = {'request': self.request}
    #     return UserProfileSerializer(*args, **kwargs)

    def get(self, request):
        try:
            user_profile = get_object_or_404(UserProfile, user=request.user)
            serializer = UserProfileSerializer(user_profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"message": "No profile found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            serializer = UserProfileSerializer(user_profile, data=request.data)
        except UserProfile.DoesNotExist:
            # If the profile doesn't exist, create a new one
            serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data)
        # print(serializer.error_messages)
        # print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserContactView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user_contacts = UserContact.objects.filter(user=request.user)
        serializer = UserContactSerializer(user_contacts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        try:
            serializer = UserContactSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
        try:
            user_contact = UserContact.objects.get(pk=pk)
            if user_contact.user != request.user:
                return Response({'error': 'User does not have permission for this action'}, status=status.HTTP_403_FORBIDDEN)
            
            serializer = UserContactSerializer(user_contact, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid data provided', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except UserContact.DoesNotExist:
            return Response({'error': 'UserContact not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

    def delete(self, request, pk):
        try:
            user_contact = UserContact.objects.get(pk=pk)
            if user_contact.user != request.user:
                return Response({'error': 'User does not have permission for this action'}, status=status.HTTP_403_FORBIDDEN)
            user_contact.delete()  # Delete the UserContact instance
            return Response({'message': 'UserContact deleted successfully'}, status=status.HTTP_200_OK)
        except UserContact.DoesNotExist:
            return Response({'error': 'UserContact not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserEducationView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user_educations = UserEducation.objects.filter(user=request.user)
        serializer = UserEducationSerializer(user_educations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserEducationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        user_education = get_object_or_404(UserEducation, pk=pk)
        if user_education.user != request.user:
            return Response({'error': 'User does not have permission for this action'}, status=status.HTTP_403_FORBIDDEN)
        serializer = UserEducationSerializer(user_education, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user_education = get_object_or_404(UserEducation, pk=pk)
        if user_education.user != request.user:
            return Response({'error': 'User does not have permission for this action'}, status=status.HTTP_403_FORBIDDEN)
        user_education.delete()  # Delete the UserEducation instance
        return Response({'message': 'UserEducation deleted successfully'}, status=status.HTTP_200_OK)



class UserWorkExperienceView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user_work_experiences = UserWorkExperience.objects.filter(user=request.user)
        serializer = UserWorkExperienceSerializer(user_work_experiences, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserWorkExperienceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        user_work_experience = get_object_or_404(UserWorkExperience, pk=pk)
        if user_work_experience.user != request.user:
            return Response({'error': 'User does not have permission for this action'}, status=status.HTTP_403_FORBIDDEN)
        serializer = UserWorkExperienceSerializer(user_work_experience, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        user_work_experience = get_object_or_404(UserWorkExperience, pk=pk)
        if user_work_experience.user != request.user:
            return Response({'error': 'User does not have permission for this action'}, status=status.HTTP_403_FORBIDDEN)
        user_work_experience.delete()  # Delete the UserWorkExperience instance
        return Response({'message': 'UserWorkExperience deleted successfully'}, status=status.HTTP_200_OK)


class UserSkillView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user_skills = UserSkill.objects.filter(user=request.user)
        serializer = UserSkillSerializer(user_skills, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserSkillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        user_skill = get_object_or_404(UserSkill, pk=pk)
        if user_skill.user != request.user:
            return Response({'error': 'User does not have permission for this action'}, status=status.HTTP_403_FORBIDDEN)
        serializer = UserSkillSerializer(user_skill, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        user_skill = get_object_or_404(UserSkill, pk=pk)
        if user_skill.user != request.user:
            return Response({'error': 'User does not have permission for this action'}, status=status.HTTP_403_FORBIDDEN)
        user_skill.delete()  # Delete the UserSkill instance
        return Response({'message': 'UserSkill deleted successfully'}, status=status.HTTP_200_OK)


class UserProjectView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user_projects = UserProject.objects.filter(user=request.user)
        serializer = UserProjectSerializer(user_projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        user_project = get_object_or_404(UserProject, pk=pk)
        if user_project.user != request.user:
            return Response({'error': 'User does not have permission for this action'}, status=status.HTTP_403_FORBIDDEN)
        serializer = UserProjectSerializer(user_project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        user_project = get_object_or_404(UserProject, pk=pk)
        if user_project.user != request.user:
            return Response({'error': 'User does not have permission for this action'}, status=status.HTTP_403_FORBIDDEN)
        user_project.delete()  # Delete the UserProject instance
        return Response({'message': 'UserProject deleted successfully'}, status=status.HTTP_200_OK)


class UserCertificationView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user_certifications = UserCertification.objects.filter(user=request.user)
        serializer = UserCertificationSerializer(user_certifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserCertificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        user_certification = get_object_or_404(UserCertification, pk=pk)
        if user_certification.user != request.user:
            return Response({'error': 'User does not have permission for this action'}, status=status.HTTP_403_FORBIDDEN)
        serializer = UserCertificationSerializer(user_certification, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user_certification = get_object_or_404(UserCertification, pk=pk)
        if user_certification.user != request.user:
            return Response({'error': 'User does not have permission for this action'}, status=status.HTTP_403_FORBIDDEN)
        user_certification.delete()  # Delete the UserCertification instance
        return Response({'message': 'UserCertification deleted successfully'}, status=status.HTTP_200_OK)


class UserInterestView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user_interests = UserInterest.objects.filter(user=request.user)
        serializer = UserInterestSerializer(user_interests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserInterestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        user_interest = get_object_or_404(UserInterest, pk=pk)
        if user_interest.user != request.user:
            return Response({'error': 'User does not have permission for this action'}, status=status.HTTP_403_FORBIDDEN)
        serializer = UserInterestSerializer(user_interest, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user_interest = get_object_or_404(UserInterest, pk=pk)
        if user_interest.user != request.user:
            return Response({'error': 'User does not have permission for this action'}, status=status.HTTP_403_FORBIDDEN)
        user_interest.delete()  # Delete the UserInterest instance
        return Response({'message': 'UserInterest deleted successfully'}, status=status.HTTP_200_OK)


class UserSocialMediaView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user_social_media = UserSocialMedia.objects.filter(user=request.user)
        serializer = UserSocialMediaSerializer(user_social_media, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserSocialMediaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        user_social_media = get_object_or_404(UserSocialMedia, pk=pk)
        if user_social_media.user != request.user:
            return Response({'error': 'User does not have permission for this action'}, status=status.HTTP_403_FORBIDDEN)
        serializer = UserSocialMediaSerializer(user_social_media, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user_social_media = get_object_or_404(UserSocialMedia, pk=pk)
        if user_social_media.user != request.user:
            return Response({'error': 'User does not have permission for this action'}, status=status.HTTP_403_FORBIDDEN)
        user_social_media.delete()  # Delete the UserSocialMedia instance
        return Response({'message': 'UserSocialMedia deleted successfully'}, status=status.HTTP_200_OK)


class UserLanguageView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user_languages = UserLanguage.objects.filter(user=request.user)
        serializer = UserLanguageSerializer(user_languages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserLanguageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        user_language = get_object_or_404(UserLanguage, pk=pk)
        if user_language.user != request.user:
            return Response({'error': 'User does not have permission for this action'}, status=status.HTTP_403_FORBIDDEN)
        serializer = UserLanguageSerializer(user_language, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user_language = get_object_or_404(UserLanguage, pk=pk)
        if user_language.user != request.user:
            return Response({'error': 'User does not have permission for this action'}, status=status.HTTP_403_FORBIDDEN)
        user_language.delete()  # Delete the UserLanguage instance
        return Response({'message': 'UserLanguage deleted successfully'}, status=status.HTTP_200_OK)


class UserDetailsAPIView(APIView):
    def get(self, request, username):
        try:
            user = User.objects.get(username=username, is_active=True, is_staff=False)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        user_serializer = UserSerializer(user)
        user_data = user_serializer.data

        try:
            profile = UserProfile.objects.get(user=user)
            user_data['profile'] = UserProfileSerializer(profile).data
        except UserProfile.DoesNotExist:
            user_data['profile'] = None
        
        try:
            user_data['contacts'] = UserContactSerializer(UserContact.objects.filter(user=user), many=True).data
        except:
            user_data['contacts'] = None
        
        try:
            user_data['educations'] = UserEducationSerializer(UserEducation.objects.filter(user=user), many=True).data
        except:
            user_data['educations'] = None
        
        try:
            user_data['experiences'] = UserWorkExperienceSerializer(UserWorkExperience.objects.filter(user=user), many=True).data
        except:
            user_data['experiences'] = None
        
        try:
            user_data['skills'] = UserSkillSerializer(UserSkill.objects.filter(user=user), many=True).data
        except:
            user_data['skills'] = None
        
        try:
            user_data['projects'] = UserProjectSerializer(UserProject.objects.filter(user=user), many=True).data
        except:
            user_data['projects'] = None
        
        try:
            user_data['certifications'] = UserCertificationSerializer(UserCertification.objects.filter(user=user), many=True).data
        except:
            user_data['certifications'] = None
        
        try:
            user_data['interests'] = UserInterestSerializer(UserInterest.objects.filter(user=user), many=True).data
        except:
            user_data['interests'] = None
        
        try:
            user_data['social_media'] = UserSocialMediaSerializer(UserSocialMedia.objects.filter(user=user), many=True).data
        except:
            user_data['social_media'] = None
        
        try:
            user_data['languages'] = UserLanguageSerializer(UserLanguage.objects.filter(user=user), many=True).data
        except:
            user_data['languages'] = None
        
        try:
            user_data['blogs'] = UserBlogSerializer(Blog.objects.filter(user=user), many=True).data
        except:
            user_data['blogs'] = None

        return Response(user_data, status=status.HTTP_200_OK)


# class UserDetailsAPIView(APIView):
#     def get(self, request, username):
#         try:
#             # Retrieve user by username
#             user = User.objects.get(username=username)

#             # Serialize user details
#             serializer = UserDetailSerializer(user)

#             return Response(serializer.data, status=status.HTTP_200_OK)

#         except User.DoesNotExist:
#             return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# class UserDetailsAPIView(APIView):
#     def get(self, request, username):
#         try:
#             # Retrieve user by username
#             user = User.objects.get(username=username)
#             user_serializer = UserSerializer(user)

#             profile_serializer = None
#             contact_serializer = None
#             education_serializer = None
#             experience_serializer = None
#             skill_serializer = None
#             project_serializer = None
#             certification_serializer = None
#             interest_serializer = None
#             social_media_serializer = None
#             language_serializer = None
#             blog_serializer = None


#             try:
#                 profile_serializer = UserProfileSerializer(UserProfile.objects.get(user=user))
#             except:
#                 pass
#             try:
#                 contact_serializer = UserContactSerializer(UserContact.objects.filter(user=user), many=True)
#             except:
#                 pass
#             try:
#                 education_serializer = UserEducationSerializer(UserEducation.objects.filter(user=user), many=True)
#             except:
#                 pass
#             try:
#                 experience_serializer = UserWorkExperienceSerializer(UserWorkExperience.objects.filter(user=user), many=True)
#             except:
#                 pass
#             try:
#                 skill_serializer = UserSkillSerializer(UserSkill.objects.filter(user=user), many=True)
#             except:
#                 pass
#             try:
#                 project_serializer = UserProjectSerializer(UserProject.objects.filter(user=user), many=True)
#             except:
#                 pass
#             try:
#                 certification_serializer = UserCertificationSerializer(UserCertification.objects.filter(user=user), many=True)
#             except:
#                 pass
#             try:
#                 interest_serializer = UserInterestSerializer(UserInterest.objects.filter(user=user), many=True)
#             except:
#                 pass
#             try:
#                 social_media_serializer = UserSocialMediaSerializer(UserSocialMedia.objects.filter(user=user), many=True)
#             except:
#                 pass
#             try:
#                 language_serializer = UserLanguageSerializer(UserLanguage.objects.filter(user=user), many=True)
#             except:
#                 pass
#             try:
#                 blog_serializer = UserBlogSerializer(Blog.objects.filter(user=user), many=True)
#             except:
#                 pass

#             # Construct response data
#             user_data = user_serializer.data
#             user_data['profile'] = profile_serializer.data if profile_serializer else None
#             user_data['contacts'] = contact_serializer.data if contact_serializer else None
#             user_data['educations'] = education_serializer.data if education_serializer else None
#             user_data['experiences'] = experience_serializer.data if experience_serializer else None
#             user_data['skills'] = skill_serializer.data if skill_serializer else None
#             user_data['projects'] = project_serializer.data if profile_serializer else None
#             user_data['certifications'] = certification_serializer.data if certification_serializer else None
#             user_data['interests'] = interest_serializer.data if interest_serializer else None
#             user_data['social_media'] = social_media_serializer.data if social_media_serializer else None
#             user_data['languages'] = language_serializer.data if language_serializer else None
#             user_data['blogs'] = blog_serializer.data if blog_serializer else None

#             return Response(user_data, status=status.HTTP_200_OK)

#         except User.DoesNotExist:
#             return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
