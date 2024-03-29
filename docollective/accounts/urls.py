from django.urls import path
from .views import (signup, ExChangerLogin, exchanger_logout, exchanger_profile, default_address_view, \
    ExchangerChangePassword, ExchangerPasswordDone, ExchangerResetPassword, ExchangerResetDone, ExchangerResetConfirm, \
    ExchangerResetComplete, ProfileUpdate, graphique, addresult, profile_eleve,
    multiplication, jeu ,verificationReponse, modal, soustraction, choixOperation, addition, multiplicationTable)

app_name = "accounts"
urlpatterns = [
    path('signup/', signup, name="signup"),
    path('login/', ExChangerLogin.as_view(), name="login"),
    path('login/', ExChangerLogin.as_view(), name="login"),
    path('logout/', exchanger_logout, name="logout"),
    path('profile/', exchanger_profile, name="profile"),
    path('graphique/', graphique, name="graphique"),
    path('profile-update/<int:pk>', ProfileUpdate.as_view(), name="profile-update"),
    path('default_adresse/<int:pk>/', default_address_view, name="default_address"),
    path('change-password/', ExchangerChangePassword.as_view(), name="change-password"),
    path('change-done/', ExchangerPasswordDone.as_view(), name="change-done"),
    path('reset/', ExchangerResetPassword.as_view(), name="reset"),
    path('reset-done/', ExchangerResetDone.as_view(), name="reset-done"),
    path('reset-confirm/<str:uidb64>/<str:token>/', ExchangerResetConfirm.as_view(), name="reset-confirm"),
    path('reset-complete/', ExchangerResetComplete.as_view(), name="reset-complete"),
    path('multiplication/', multiplication, name="multiplication"),

    path('saveresult/', addresult, name="addresult"),
    #path('getdata/', getdata, name="getdata"),
    path('profile_eleve/', profile_eleve, name="profile_eleve"),
    #path('test_htmx/', test_htmx, name="test_htmx"),
    path('jeu/', jeu, name="jeu"),
    path('multiplicationTable/', multiplicationTable, name="multiplicationTable"),
    path('soustraction/', soustraction, name="soustraction"),
    path('addition/', addition, name="addition"),
    path('choixOperation/', choixOperation, name="choixOperation"),
    path('verificationReponse/', verificationReponse, name="verificationReponse"),
    path('modal/', modal, name="modal")
]

