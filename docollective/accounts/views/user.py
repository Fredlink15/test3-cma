from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout, get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import CreateView, UpdateView

from accounts.forms import ExChangerSignupForm

from verify_email.email_handler import send_verification_email

from accounts.models import Points

from random import *

from accounts.models import REPONSE

from time import time

from ..themes.Addition import Addition
from ..themes.TablesDeMultiplication import TablesDeMultiplication
from ..themes.Soustraction import Soustraction
from ..themes.ChoixOperation import ChoixOperation
from ..themes.VerificationReponse import VerificationReponse

from accounts.models import Score



def signup(request):
    if request.method == "POST":
        form = ExChangerSignupForm(request.POST)
        if form.is_valid():
            inactive_user = send_verification_email(request, form)
            Score.objects.create(user=inactive_user)
            return redirect("index")
        # Sans le else j'ai un formulaire vide si pas valide
    else:
        form = ExChangerSignupForm()
    return render(request, "accounts/signup.html", context={"form": form})


class ExChangerLogin(LoginView):
    template_name = "accounts/login.html"
    next_page = reverse_lazy("index")


def exchanger_logout(request):
    logout(request)
    return redirect("index")


@login_required
def exchanger_profile(request):
    user = request.user
    try:
        default_adresse = user.adresses.get(user=user, default=True)
    except ObjectDoesNotExist:
        default_adresse = None

    adresses = user.adresses.filter(user=user, default=False)

    return render(request, "accounts/profile.html", context={"user": user,
                                                             "default_adresse": default_adresse,
                                                             "adresses": adresses})

@login_required
def profile_eleve(request):
    user = request.user
    return render(request, "accounts/profile_eleve.html", context={"user": user})

class ProfileUpdate(LoginRequiredMixin, UpdateView):
    model = get_user_model()
    template_name = "accounts/update-profile.html"
    fields = ["email", "username", "first_name", "last_name"]
    success_url = reverse_lazy("accounts:profile_eleve")


def default_address_view(request, pk):
    user = request.user

    # current_address = user.adresses.get(user=user, default=True)
    # current_address.default = False
    # current_address.save()
    #
    # new_address = user.adresses.get(pk=pk)
    # new_address.default = True
    # new_address.save()
    # Mettre à jour l'adresse actuelle par défaut
    user.adresses.filter(default=True).update(default=False)

    # Définir la nouvelle adresse comme adresse par défaut
    updated_rows = user.adresses.filter(pk=pk).update(default=True)

    # Vérifier si l'adresse avec `pk=pk` a été mise à jour
    if not updated_rows:
        # Gérer l'erreur ici, par exemple en retournant une réponse d'erreur
        return HttpResponse("Adresse non trouvée", status=404)

    if request.GET.get("redirect") == "validate":
        return redirect("shop:address-choice")

    return redirect("accounts:profile")



#Test pour afficher le graphique
@login_required
def graphique(request):
    user = request.user
    return render(request, "accounts/graphique.html", context={"user": user})

@login_required
def multiplication(request):
    user = request.user
    return render(request, "accounts/multiplication.html", context={"user": user})

@login_required
def addresult(request):
    user = request.user
    tempsMoyenCentieme = request.POST.get('tempsMoyenCentieme')
    user.tempsMoyenCentieme = tempsMoyenCentieme
    user.save(update_fields=['tempsMoyenCentieme'])
    return redirect("accounts:modal")

@login_required
def jeu(request):
    user = request.user
    user.nombreQuestions = 0
    user.reponsesJustes = 0
    user.reponsesFausses = 0
    user.reponsesJustesPourcentage = 0
    user.reponsesFaussesPourcentage = 0
    user.Duree = 0
    user.save(update_fields=['nombreQuestions', 'reponsesJustes', 'reponsesFausses', 'reponsesJustesPourcentage', 'reponsesFaussesPourcentage', 'Duree'])
    # INITIALISATION DES QUESTIONS A LA SUITE
    user.score.multiplicationALaSuite = 0
    user.score.save(update_fields=['multiplicationALaSuite'])

    if request.method == "POST":
        if form.is_valid():
            print(form.cleaned_data)
    return render(request, "accounts/jeu.html", context={"user": user})

@login_required
def choixOperation(request):
    user = request.user
   # tableauOperation = ["accounts:test_htmx","accounts:soustraction"]
    #indice = randint(0, 1)
    #url_operation = tableauOperation[indice]
    #return render(request, "accounts/choixOperation.html", context={"url_operation": url_operation })
    url, a, b, answer = ChoixOperation(user)
    return render(request, url, context={"user": user, "a": a, "b": b, "answer": answer})



@login_required
def multiplicationTable(request):
    user = request.user
    #user = request
    a,b,answer = TablesDeMultiplication(user)
    #return render(request, "accounts/multiplicationTable.html", context={"user": user, "a": a, "b": b, "answer":answer})
    return render(request, "accounts/multiplicationTableAlenvers.html", context={"user": user, "a": a, "b": b, "answer": answer})




@login_required
def soustraction(request):
    user = request.user
    a,b = Soustraction(request.user)
    return render(request, "accounts/soustraction.html", context={"user": user, "a": a, "b": b})

def addition(request):
    user = request.user
    a,b = Addition(request.user)
    return render(request, "accounts/addition.html", context={"user": user, "a": a, "b": b})

@login_required
def verificationReponse(request):
    user = request.user
    user.reponseEleve = int(request.POST.get('name'))
    user.save(update_fields=['reponseEleve'])
    return HttpResponse(VerificationReponse(user))

    """
    answer = request.user.answer

    user.nombreQuestions +=1
    user.save(update_fields=['nombreQuestions'])

    horaire2 = time()

    duree = horaire2 - request.user.horaire1
    request.user.Duree = request.user.Duree + duree
    user.save(update_fields=['Duree'])

    html_response_nbre_questions ="<h6 id='hid_nombreQuestions'>Nombre de Question(s) : %s</h6>"

    if reponse == request.user.answer:
        user.reponsesJustes +=1
        user.save(update_fields=['reponsesJustes'])
        user.reponsesJustesPourcentage = round((user.reponsesJustes / user.nombreQuestions) * 100, 1);
        user.reponsesFaussesPourcentage = round((user.reponsesFausses / user.nombreQuestions) * 100, 1);
        user.save(update_fields=['reponsesJustesPourcentage', 'reponsesFaussesPourcentage'])

        if user.score.multiplication == 1:
            user.score.multiplicationALaSuite +=1
            user.score.save(update_fields=['multiplicationALaSuite'])
            if user.score.multiplicationALaSuite == 5:
                if user.score.multiplicationNiveau != 4:
                    user.score.multiplicationNiveau +=1
                    user.score.save(update_fields=['multiplicationNiveau'])
                    user.score.multiplication = 0
                    user.score.save(update_fields=['multiplication'])



        html_response = ("<h2>Bravo, c'est la bonne réponse</h2><input class='form-control-lg w-100 h-100 vrai' type='number' name='name' value='' disabled  style='font-size:30px; text-align:center;' id='hid_inp' placeholder=%s>" % answer)
        html_response_reponses_justes ="<h6 id='hid_resultatsJustes'>Réponse(s) Juste(s) : %s </h6>"
        return HttpResponse(html_response + html_response_reponses_justes % user.reponsesJustes + html_response_nbre_questions % user.nombreQuestions)

    else :
        user.reponsesFausses +=1
        user.save(update_fields=['reponsesFausses'])
        user.reponsesJustesPourcentage = round((user.reponsesJustes / user.nombreQuestions) * 100, 1);
        user.reponsesFaussesPourcentage = round((user.reponsesFausses / user.nombreQuestions) * 100, 1);
        user.save(update_fields=['reponsesJustesPourcentage', 'reponsesFaussesPourcentage'])

        if user.score.multiplication == 1:
            user.score.multiplicationALaSuite = 0
            user.score.save(update_fields=['multiplicationALaSuite'])
            user.score.multiplication = 0
            user.score.save(update_fields=['multiplication'])

        html_response1 = "<h2 class='text-danger'>Faux, la bonne réponse est %s</h2>"
        html_response2 = "<input class='form-control-lg w-100 h-100 faux' type='number' name='name' value='' disabled style='font-size:30px; text-align:center;' id='hid_inp' placeholder=%s>"
        html_response_reponses_fausses = "<h6 id='hid_resultatsFaux'> Réponse(s) Fausse(s) : %s </h6>"
        return HttpResponse(html_response1 % answer + html_response2 % reponse + html_response_reponses_fausses % user.reponsesFausses + html_response_nbre_questions % user.nombreQuestions)
    """

@login_required
def modal(request):
    user = request.user
    dureeMoyenDuJeu = round(request.user.Duree/request.user.nombreQuestions,1)
    return render(request, "accounts/modal.html", context={ "user": user, "dureeMoyenDuJeu":dureeMoyenDuJeu})