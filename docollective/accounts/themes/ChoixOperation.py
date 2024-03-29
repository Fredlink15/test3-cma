from random import randint

from accounts.themes.Addition import Addition
from accounts.themes.Soustraction import Soustraction
from accounts.themes.TablesDeMultiplication import TablesDeMultiplication


def ChoixOperation(eleve):
    tableauOperation = ["accounts/multiplicationTable.html",
                        "accounts/multiplicationTableAlenvers.html",
                        "accounts/multiplicationTableAlenversBis.html",
                        "accounts/multiplicationTableAlenversTer.html",
                        "accounts/soustraction.html",
                        "accounts/addition.html"]
    indice = randint(0, 2)
    url = tableauOperation[indice]
    eleve.url = url
    eleve.save(update_fields=['url'])

    #url = tableauOperation[0]
    if url == "accounts/multiplicationTable.html" or url == "accounts/multiplicationTableAlenvers.html" or url == "accounts/multiplicationTableAlenversBis.html" or url == "accounts/multiplicationTableAlenversTer.html":
        a, b, answer = TablesDeMultiplication(eleve)
    elif url == "accounts/soustraction.html":
        a, b = Soustraction(eleve)
    else:
        a,b = Addition(eleve)
    return url, a, b, answer
