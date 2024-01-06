# from django.db import models
# from django.contrib.auth.models import User


# class UserProfile(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
#     profile_img = models.ImageField(upload_to="profile/", default="")
#     bio = models.TextField(blank=True, max_length=1000)
#     location = models.CharField(max_length=255, blank=True, default="")
#     birth_date = models.DateField(null=True, blank=True)
#     gender = models.CharField(null=False, blank=False, max_length=15)
#     website = models.URLField(blank=True, max_length=255)
#     joined_at = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         indexes = [
#             models.Index(fields=['user'])
#         ]

#     def __str__(self):
#         return f"{self.user.username}'s Profile"


# class UserContact(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
#     email = models.EmailField(blank=True, max_length=255)
#     phone_number = models.CharField(max_length=15, blank=True, default="")

#     class Meta:
#         indexes = [
#             models.Index(fields=['user'])
#         ]

#     def __str__(self):
#         return f"{self.user.username}'s Contact Info"


# class UserEducation(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
#     school_name = models.CharField(max_length=255, default="")
#     degree = models.CharField(max_length=255, default="")
#     field_of_study = models.CharField(max_length=255, default="")
#     graduation_year = models.IntegerField(null=False, blank=False)

#     class Meta:
#         indexes = [
#             models.Index(fields=['user'])
#         ]

#     def __str__(self):
#         return f"{self.user.username}'s Education"


# class UserWorkExperience(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
#     company_name = models.CharField(max_length=255, default="")
#     position = models.CharField(max_length=255, default="")
#     start_date = models.DateField(null=False, blank=False)
#     end_date = models.DateField(null=False, blank=False)
#     description = models.TextField(null=False, blank=False, default="", max_length=500)

#     class Meta:
#         indexes = [
#             models.Index(fields=['user'])
#         ]

#     def __str__(self):
#         return f"{self.user.username}'s Work Experience"


# class UserSkill(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
#     skill_name = models.CharField(max_length=255, default="", null=False, blank=False)
#     proficiency_level = models.CharField(max_length=50, default="", null=False, blank=False)

#     class Meta:
#         indexes = [
#             models.Index(fields=['user'])
#         ]

#     def __str__(self):
#         return f"{self.user.username}'s Skill: {self.skill_name}"


# class UserProject(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
#     project_name = models.CharField(max_length=255, default="")
#     description = models.TextField(max_length=1000, default="NA")
#     start_date = models.DateField(null=False, blank=False)
#     end_date = models.DateField(null=True, blank=True)
#     project_link = models.URLField(blank=True, null=False, default="")

#     class Meta:
#         indexes = [
#             models.Index(fields=['user'])
#         ]

#     def __str__(self):
#         return f"{self.user.username}'s Project: {self.project_name}"


# class UserCertification(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
#     certification_name = models.CharField(max_length=255, default="", null=False, blank=False)
#     issuing_organization = models.CharField(max_length=255, default="", null=False, blank=False)
#     issue_date = models.DateField(null=False, blank=False)
#     expiration_date = models.DateField(null=True, blank=True)

#     class Meta:
#         indexes = [
#             models.Index(fields=['user'])
#         ]

#     def __str__(self):
#         return f"{self.user.username}'s Certification: {self.certification_name}"


# class UserInterest(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
#     interest_name = models.CharField(max_length=255, default="", null=False, blank=False)

#     class Meta:
#         indexes = [
#             models.Index(fields=['user'])
#         ]

#     def __str__(self):
#         return f"{self.user.username}'s Interest: {self.interest_name}"


# class UserSocialMedia(models.Model):
#     class SocialMedia(models.TextChoices):
#         INSTAGRAM = 'instagram', 'Instagram'
#         FACEBOOK = 'facebook', 'Facebook'
#         GITHUB = 'github', 'Github'
#         LINKEDIN = 'linkedin', 'Linkedin'
#         TWITTER = 'twitter', 'Twitter'
#         OTHER = 'other', 'Other'

#     user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
#     media = models.CharField(max_length=20, choices=SocialMedia.choices, default="", null=False, blank=False)
#     media_link = models.URLField(default="", max_length=100, null=False, blank=False)

#     class Meta:
#         indexes = [
#             models.Index(fields=['user'])
#         ]

#     def __str__(self):
#         return f"{self.user.username}'s Account"


# class UserLanguage(models.Model):
#     class ProficiencyLevel(models.TextChoices):
#         BEGINNER = 'beginner', 'Beginner'
#         ELEMENTARY = 'elementary', 'Elementary'
#         INTERMEDIATE = 'intermediate', 'Intermediate'
#         ADVANCED = 'advanced', 'Advanced'
#         FLUENT = 'fluent', 'Fluent'
#         NATIVE = 'native', 'Native'

#     user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
#     language_name = models.CharField(max_length=255, null=False, blank=False)
#     proficiency_level = models.CharField(
#         max_length=50,
#         choices=ProficiencyLevel.choices,
#         default=ProficiencyLevel.INTERMEDIATE,
#         null=False,
#         blank=False
#     )

#     class Meta:
#         indexes = [
#             models.Index(fields=['user'])
#         ]

#     def __str__(self):
#         return f"{self.user.username}'s Language: {self.language_name} ({self.proficiency_level})"

