from random import randint
from time import time


def Addition(eleve):

    a = randint(1, 100)
    b = randint(1, 100)
    eleve.answer = a + b
    eleve.save(update_fields=['answer'])
    horaire1 = time()
    eleve.horaire1 = horaire1
    eleve.save(update_fields=['horaire1'])
    return a,b
