from random import randint
from time import time


def Soustraction(eleve):

    a = randint(1, 100)
    b = randint(1, 100)
    if a > b:
        eleve.answer = a - b
        eleve.save(update_fields=['answer'])
    else:
        eleve.answer = b - a
        eleve.save(update_fields=['answer'])
        a, b = b, a
    horaire1 = time()
    eleve.horaire1 = horaire1
    eleve.save(update_fields=['horaire1'])
    return a,b