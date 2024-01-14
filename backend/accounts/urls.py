from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import UserSignupView, UserChangePasswordView, UserLogoutView
app_name= "accounts"

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("signup/", UserSignupView.as_view(), name="signup"),
    path("logout/", UserLogoutView.as_view(), name="logout"),
    path("change-password/", UserChangePasswordView.as_view(), name="change-password"),
]
