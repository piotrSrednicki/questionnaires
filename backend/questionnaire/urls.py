from django.urls import path

from .views import (
    QuestionnaireListCreateView,
    QuestionnaireRandomColourView,
    QuestionnaireRetrieveUpdateDestroyView,
)

urlpatterns = [
    path(
        "",
        QuestionnaireListCreateView.as_view(),
        name="questionnaire-list",
    ),
    path(
        "<int:pk>/",
        QuestionnaireRetrieveUpdateDestroyView.as_view(),
        name="questionnaire-detail",
    ),
    path(
        "random-colour/",
        QuestionnaireRandomColourView.as_view(),
        name="questionnaire-random-colour",
    ),
]
