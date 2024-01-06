from django.contrib import admin

# Register your models here.
from .models import (
    UserProfile,
    UserContact,
    UserEducation,
    UserWorkExperience,
    UserSkill,
    UserProject,
    UserCertification,
    UserInterest,
    UserSocialMedia,
    UserLanguage,
)

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'profile_img', 'bio', 'location', 'website']

@admin.register(UserContact)
class UserContactAdmin(admin.ModelAdmin):
    list_display = ['user', 'email', 'phone_number']

@admin.register(UserEducation)
class UserEducationAdmin(admin.ModelAdmin):
    list_display = ['user', 'school_clg', 'degree', 'field_of_study', 'graduation_year']

@admin.register(UserWorkExperience)
class UserWorkExperienceAdmin(admin.ModelAdmin):
    list_display = ['user', 'company_name', 'position', 'start_date', 'end_date']

@admin.register(UserSkill)
class UserSkillAdmin(admin.ModelAdmin):
    list_display = ['user', 'skill_name', 'proficiency_level']

@admin.register(UserProject)
class UserProjectAdmin(admin.ModelAdmin):
    list_display = ['user', 'project_name', 'start_date', 'end_date']

@admin.register(UserCertification)
class UserCertificationAdmin(admin.ModelAdmin):
    list_display = ['user', 'certification_name', 'issuing_organization', 'issue_date', 'expiration_date']

@admin.register(UserInterest)
class UserInterestAdmin(admin.ModelAdmin):
    list_display = ['user', 'interest_name']

@admin.register(UserSocialMedia)
class UserSocialMediaAdmin(admin.ModelAdmin):
    list_display = ['user', 'media', 'media_link']

@admin.register(UserLanguage)
class UserLanguageAdmin(admin.ModelAdmin):
    list_display = ['user', 'language_name', 'proficiency_level']