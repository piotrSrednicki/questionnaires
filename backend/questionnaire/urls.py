from django.urls import path
from . import views

urlpatterns = [
    path("", views.QuestionnaireList.as_view(), name="questionnaire-list"),
    path("<int:pk>/", views.QuestionnaireDetail.as_view(), name="questionnaire-detail"),
]
