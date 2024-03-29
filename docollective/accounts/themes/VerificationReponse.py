from time import time

def VerificationReponse(eleve):

    a = eleve.a
    b = eleve.b
    answer = eleve.answer
    reponseEleve = eleve.reponseEleve

    if eleve.url == "accounts/multiplicationTableAlenvers.html":
        answer, b = b, answer
    elif eleve.url == "accounts/multiplicationTableAlenversBis.html":
        answer, a = a, answer

    eleve.nombreQuestions +=1
    eleve.save(update_fields=['nombreQuestions'])

    horaire2 = time()
    duree = horaire2 - eleve.horaire1
    eleve.Duree = eleve.Duree + duree
    eleve.save(update_fields=['Duree'])

    html_response_nbre_questions ="<h6 id='hid_nombreQuestions'>Nombre de Question(s) : %s</h6>"

    if reponseEleve == answer:
        eleve.reponsesJustes += 1
        eleve.save(update_fields=['reponsesJustes'])
        eleve.reponsesJustesPourcentage = round((eleve.reponsesJustes / eleve.nombreQuestions) * 100, 1);
        eleve.reponsesFaussesPourcentage = round((eleve.reponsesFausses / eleve.nombreQuestions) * 100, 1);
        eleve.save(update_fields=['reponsesJustesPourcentage', 'reponsesFaussesPourcentage'])

        """
             MISE A ZERO MULTIPLICATIONS FAUSSES A LA SUITE
        """
        eleve.score.multiplicationsFaussesALaSuite = 0
        eleve.score.save(update_fields=['multiplicationsFaussesALaSuite'])

        """
        MULTIPLICATION JUSTE A LA SUITE ET CHANGEMENT DE NIVEAU
        """
        eleve.score.multiplicationALaSuite += 1
        eleve.score.save(update_fields=['multiplicationALaSuite'])
        if eleve.score.multiplicationALaSuite == 5:
            if eleve.score.multiplicationNiveau != 4:
                eleve.score.multiplicationNiveau += 1
                eleve.score.save(update_fields=['multiplicationNiveau'])
                eleve.score.multiplicationALaSuite = 0
                eleve.score.save(update_fields=['multiplicationALaSuite'])
        eleve.score.multiplication = 0
        eleve.score.save(update_fields=['multiplication'])

        html_response = ("<h2>Bravo, c'est la bonne réponse</h2><input class='form-control-lg w-100 h-100 vrai' type='number' name='name' value='' disabled  style='font-size:30px; text-align:center;' id='hid_inp' placeholder=%s>" % answer)
        html_response_reponses_justes = "<h6 id='hid_resultatsJustes'>Réponse(s) Juste(s) : %s </h6>"
        html_reponse_global = html_response + html_response_reponses_justes % eleve.reponsesJustes + html_response_nbre_questions % eleve.nombreQuestions
        return html_reponse_global

    else:
        eleve.reponsesFausses += 1
        eleve.save(update_fields=['reponsesFausses'])
        eleve.reponsesJustesPourcentage = round((eleve.reponsesJustes / eleve.nombreQuestions) * 100, 1);
        eleve.reponsesFaussesPourcentage = round((eleve.reponsesFausses / eleve.nombreQuestions) * 100, 1);
        eleve.save(update_fields=['reponsesJustesPourcentage', 'reponsesFaussesPourcentage'])

        """
             MISE A ZERO MULTIPLICATION JUSTE A LA SUITE
        """
        eleve.score.multiplicationALaSuite = 0
        eleve.score.save(update_fields=['multiplicationALaSuite'])

        """
        eleve.score.multiplication = 0
        eleve.score.save(update_fields=['multiplication'])
        """

        """
        MULTIPLICATION FAUSSE A LA SUITE ET CHANGEMENT DE NIVEAU
        """
        eleve.score.multiplicationsFaussesALaSuite += 1
        eleve.score.save(update_fields=['multiplicationsFaussesALaSuite'])
        if eleve.score.multiplicationsFaussesALaSuite == 3:
            if eleve.score.multiplicationNiveau != 0:
                eleve.score.multiplicationNiveau -= 1
                eleve.score.save(update_fields=['multiplicationNiveau'])
                eleve.score.multiplicationsFaussesALaSuite = 0
                eleve.score.save(update_fields=['multiplicationsFaussesALaSuite'])
        eleve.score.multiplication = 0
        eleve.score.save(update_fields=['multiplication'])


        html_response1 = "<h2 class='text-danger'>Faux, la bonne réponse est %s</h2>"
        html_response2 = "<input class='form-control-lg w-100 h-100 faux' type='number' name='name' value='' disabled style='font-size:30px; text-align:center;' id='hid_inp' placeholder=%s>"
        html_response_reponses_fausses = "<h6 id='hid_resultatsFaux'> Réponse(s) Fausse(s) : %s </h6>"
        html_reponse_global = html_response1 % answer + html_response2 % reponseEleve + html_response_reponses_fausses % eleve.reponsesFausses + html_response_nbre_questions % eleve.nombreQuestions
        return html_reponse_global



