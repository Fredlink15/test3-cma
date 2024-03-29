import iso3166
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

from shop.models import SIZES, Color

# TYPE_USER = [("h", "Homme"), ("f", "Femme"), ("nr", "Non renseigné")]
TYPE_USER = [("h", "Homme"), ("f", "Femme")]


class ExChangerManager(BaseUserManager):
    def create_user(self, email, username, first_name, last_name, password, **kwargs):
        if not email:
            raise ValueError("email obligatoire")
        user = self.model(email=self.normalize_email(email), username=username, first_name=first_name,
                          last_name=last_name, **kwargs)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, username, first_name, last_name, password, **kwargs):
        user = self.create_user(email, username, first_name, last_name, password, **kwargs)
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save()
        return user


class ExChanger(AbstractUser):
    email = models.EmailField(unique=True)
    type = models.CharField(max_length=10, verbose_name="Sexe", choices=TYPE_USER)

    score_multiplication = models.IntegerField(default=0)
    score_addition = models.IntegerField(default=0)
    score_soustraction = models.IntegerField(default=0)
    score_division = models.IntegerField(default=0)

    #tablemultiplication_Niveau = models.IntegerField(default=1) #CREATION DE L'ATTRIBUT

    duree_connexion = models.IntegerField(default=0)

    a = models.IntegerField(default=0)
    b = models.IntegerField(default=0)
    answer = models.IntegerField(default=0)
    reponseEleve = models.FloatField(default=0)

    url = models.CharField(max_length=100, default=0)

    nombreQuestions = models.IntegerField(default=0)
    reponsesJustes = models.IntegerField(default=0)
    reponsesFausses = models.IntegerField(default=0)
    reponsesJustesPourcentage = models.FloatField(default=0)
    reponsesFaussesPourcentage = models.FloatField(default=0)

    tempsMoyenCentieme = models.FloatField(default=0)
    horaire1 = models.FloatField(default=0)
    #horaire2 = models.FloatField(default=0)
    Duree = models.FloatField(default=0)



    REQUIRED_FIELDS = ["username", "first_name", "last_name"]
    USERNAME_FIELD = "email"

    objects = ExChangerManager()

class Score(models.Model):
    user = models.OneToOneField(ExChanger, on_delete=models.CASCADE)
    multiplication = models.IntegerField(default=0)
    multiplicationNiveau = models.IntegerField(default=0)
    multiplicationALaSuite = models.IntegerField(default=0)
    multiplicationsFaussesALaSuite = models.IntegerField(default=0)


class Points(models.Model):
    user = models.OneToOneField(ExChanger, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    score1 = models.IntegerField(default=0)
    score2 = models.IntegerField(default=0)
    score3 = models.IntegerField(default=0)
    score4 = models.IntegerField(default=0)
    score5 = models.IntegerField(default=0)


class Meta:
    verbose_name="Point"

def __str__(self):
    return f"{self.user.username} à pour score : {self.score}"

class REPONSE(models.Model):
    name = models.CharField(max_length=255)
