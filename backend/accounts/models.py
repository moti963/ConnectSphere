from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    profile_img = models.ImageField(upload_to="profile/", default="default_profile.png")
    bio = models.TextField(blank=True, max_length=1000)
    location = models.CharField(max_length=255, blank=True, default="")
    birth_date = models.DateField(null=True, blank=True)
    website = models.URLField(blank=True, max_length=255)
    joined_at = models.DateTimeField(auto_now_add=True)

    # class Meta:
    #     db_table = "user_profile"

    def __str__(self):
        return f"{self.user.username}'s Profile"


class UserContact(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    email = models.EmailField(blank=True, max_length=255)
    phone_number = models.CharField(max_length=15, blank=True, default="")

    # class Meta:
    #     db_table = "user_contact"

    def __str__(self):
        return f"{self.user.username}'s Contact Info"


class UserEducation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    school_name = models.CharField(max_length=255, default="")
    degree = models.CharField(max_length=255, default="")
    field_of_study = models.CharField(max_length=255, default="")
    graduation_year = models.IntegerField()

    # class Meta:
    #     db_table = "user_education"

    def __str__(self):
        return f"{self.user.username}'s Education"


class UserWorkExperience(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    company_name = models.CharField(max_length=255, default="")
    position = models.CharField(max_length=255, default="")
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField()

    # class Meta:
    #     db_table = "user_work_experience"

    def __str__(self):
        return f"{self.user.username}'s Work Experience"


class UserSkill(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    skill_name = models.CharField(max_length=255, default="")
    proficiency_level = models.CharField(max_length=50, default="")

    # class Meta:
    #     db_table = "user_skill"

    def __str__(self):
        return f"{self.user.username}'s Skill: {self.skill_name}"


class UserProject(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    project_name = models.CharField(max_length=255, default="")
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    project_link = models.URLField(blank=True)

    # class Meta:
    #     db_table = "user_project"

    def __str__(self):
        return f"{self.user.username}'s Project: {self.project_name}"


class UserCertification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    certification_name = models.CharField(max_length=255, default="")
    issuing_organization = models.CharField(max_length=255, default="")
    issue_date = models.DateField()
    expiration_date = models.DateField(null=True, blank=True)

    # class Meta:
    #     db_table = "user_certification"

    def __str__(self):
        return f"{self.user.username}'s Certification: {self.certification_name}"


class UserInterest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    interest_name = models.CharField(max_length=255, default="")

    # class Meta:
    #     db_table = "user_interest"

    def __str__(self):
        return f"{self.user.username}'s Interest: {self.interest_name}"


class UserSocialMedia(models.Model):
    class SocialMedia(models.TextChoices):
        INSTAGRAM = 'instagram', 'Instagram'
        FACEBOOK = 'facebook', 'Facebook'
        GITHUB = 'github', 'Github'
        LINKEDIN = 'linkedin', 'Linkedin'
        TWITTER = 'twitter', 'Twitter'
        OTHER = 'other', 'Other'

    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    media = models.CharField(max_length=20, choices=SocialMedia.choices, default="")
    media_link = models.URLField(default="", max_length=100)

    # class Meta:
    #     db_table = "user_social_media"

    def __str__(self):
        return f"{self.user.username}'s Account"


class UserLanguage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    language_name = models.CharField(max_length=255)
    proficiency_level = models.CharField(max_length=50)

    # class Meta:
    #     db_table = "user_language"

    def __str__(self):
        return f"{self.user.username}'s Language: {self.language_name}"
