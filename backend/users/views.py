# from django.shortcuts import render
from rest_framework.views import APIView
# from rest_framework import generics
from .models import UserProfile, UserContact, UserEducation, UserWorkExperience, UserSkill, UserProject, UserCertification, UserInterest, UserSocialMedia, UserLanguage
from .serializers import UserProfileSerializer, UserContactSerializer, UserEducationSerializer, UserWorkExperienceSerializer, UserSkillSerializer, UserProjectSerializer, UserCertificationSerializer, UserInterestSerializer, UserSocialMediaSerializer, UserLanguageSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.http import Http404
from django.shortcuts import get_object_or_404
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

    def get(self, request):
        user_profile = get_object_or_404(UserProfile, user=request.user)
        serializer = UserProfileSerializer(user_profile, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        user_profile = get_object_or_404(UserProfile, user=request.user)
        serializer = UserProfileSerializer(user_profile, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        
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
            serializer = UserContactSerializer(user=request.user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': 'Invalid data provided', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
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
