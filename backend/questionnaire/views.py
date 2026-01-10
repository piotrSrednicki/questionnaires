from random import choice

from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Questionnaire
from .serializers import QuestionnaireSerializer


class QuestionnaireListCreateView(generics.ListCreateAPIView):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer


class QuestionnaireRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer


class QuestionnaireRandomColourView(APIView):
    def get(self, request: Request) -> Response:
        return Response(
            {"favourite_colour": choice([c.value for c in Questionnaire.Colour])},
            status=status.HTTP_200_OK,
        )
