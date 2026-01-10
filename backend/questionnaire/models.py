from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class Questionnaire(models.Model):

    class Sex(models.TextChoices):
        MALE = "M", "Mężczyzna"
        FEMALE = "K", "Kobieta"

    class Colour(models.TextChoices):
        RED = "czerwony"
        GREEN = "zielony"
        BLUE = "niebieski"
        YELLOW = "żółty"
        PURPLE = "fioletowy"

    age = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(16), MaxValueValidator(150)],
        blank=False,
        null=False,
    )
    height = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(50), MaxValueValidator(280)],
        blank=False,
        null=False,
        help_text="Wzrost w centymetrach",
    )
    sex = models.CharField(max_length=1, choices=Sex.choices, blank=False, null=False)
    favourite_colour = models.CharField(
        max_length=20, choices=Colour.choices, blank=False, null=False
    )
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return (
            f"Wiek: {self.age}, "
            f"Płeć: {self.get_sex_display()}, "
            f"Wzrost: {self.height} cm, "
            f"Ulubiony kolor{self.favourite_colour}, "
            f"Formularz wypełniony o {self.submitted_at.strftime("%Y-%m-%d %H:%M:%S")}"
        )

    class Meta:
        ordering = ["-submitted_at"]
