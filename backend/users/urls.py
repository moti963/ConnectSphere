from django.urls import path

from . import views

app_name = "users"

urlpatterns = [
    path('user/', views.UserView.as_view(), name='user-account'),
    path('profile/', views.UserProfileView.as_view(), name='user-profile'),
    path('contacts/', views.UserContactView.as_view(), name='user-contacts-list'),
    path('contacts/<int:pk>/', views.UserContactView.as_view(), name='user-contact-detail'),
    path('educations/', views.UserEducationView.as_view(), name='user-education-list'),
    path('educations/<int:pk>/', views.UserEducationView.as_view(), name='user-education-detail'),
    path('work-experiences/', views.UserWorkExperienceView.as_view(), name='user-work-experience-list'),
    path('work-experiences/<int:pk>/', views.UserWorkExperienceView.as_view(), name='user-work-experience-detail'),
    path('skills/', views.UserSkillView.as_view(), name='user-skill-list'),
    path('skills/<int:pk>/', views.UserSkillView.as_view(), name='user-skill-detail'),
    path('projects/', views.UserProjectView.as_view(), name='user-project-list'),
    path('projects/<int:pk>/', views.UserProjectView.as_view(), name='user-project-detail'),
    path('certifications/', views.UserCertificationView.as_view(), name='user-certification-list'),
    path('certifications/<int:pk>/', views.UserCertificationView.as_view(), name='user-certification-detail'),
    path('interests/', views.UserInterestView.as_view(), name='user-interest-list'),
    path('interests/<int:pk>/', views.UserInterestView.as_view(), name='user-interest-detail'),
    path('social-media/', views.UserSocialMediaView.as_view(), name='user-social-media-list'),
    path('social-media/<int:pk>/', views.UserSocialMediaView.as_view(), name='user-social-media-detail'),
    path('languages/', views.UserLanguageView.as_view(), name='user-language-list'),
    path('languages/<int:pk>/', views.UserLanguageView.as_view(), name='user-language-detail'),
    path("user/<str:username>/", views.UserDetailsAPIView.as_view(), name="user-details"),
]
