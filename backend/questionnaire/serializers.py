from rest_framework import serializers
from .models import Questionnaire


class QuestionnaireSerializer(serializers.ModelSerializer):
    submitted_at = serializers.DateTimeField(read_only=True)
    sex = serializers.CharField(source="get_sex_display", read_only=True)

    class Meta:
        model = Questionnaire
        fields = "__all__"
