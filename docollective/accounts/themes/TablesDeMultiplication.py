from time import time
from random import randint, random


def TablesDeMultiplication(eleve):
    eleve.score.multiplication = 1
    eleve.score.save()
    """
    a = randint(1, 10)
    b = randint(1, 10)
    Je commence avec 1, 0, 2 
                puis 5, 10
                puis 3,4 
                puis 9, 6
                7 et enfin 8
    """
    if eleve.score.multiplicationNiveau == 0:
        """BOUCLE DO WHILE """
        while True:
            a = randint(0, 2)
            if a != eleve.a:
                break
        """BOUCLE DO WHILE """
        while True:
            b = randint(1, 10)
            if b != eleve.b:
                break
    elif eleve.score.multiplicationNiveau == 1:
        tableauNombre1 = [5, 10]
        while True:
            index = randint(0, len(tableauNombre1) - 1)
            a = tableauNombre1[index]
            if a != eleve.a:
                break
        while True:
            b = randint(2, 10)
            if b != eleve.b:
                break
    elif eleve.score.multiplicationNiveau == 2:
        tableauNombre1 = [3, 4]
        while True:
            index = randint(0, len(tableauNombre1) - 1)
            a = tableauNombre1[index]
            if a != eleve.a:
                break
        while True:
            b = randint(3, 9)
            if b != eleve.b:
                break
    elif eleve.score.multiplicationNiveau == 3:
        tableauNombre1 =[6, 9];
        tableauNombre2 =[3, 4, 6, 7, 8, 9]
        while True:
            index1 = randint(0, len(tableauNombre1) - 1)
            a = tableauNombre1[index1]
            if a != eleve.a:
                break
        while True:
            index2 = randint(0, len(tableauNombre1) - 1)
            b = tableauNombre2[index2]
            if b != eleve.b:
                break
    elif eleve.score.multiplicationNiveau ==  4:
        tableauNombre1 =[7, 8]
        tableauNombre2 =[6, 7, 8, 9]
        while True:
            index1 = randint(0, len(tableauNombre1) - 1)
            a = tableauNombre1[index1]
            if a != eleve.a:
                break
        while True:
            index2 = randint(0, len(tableauNombre2) - 1)
            b = tableauNombre2[index2]
            if b != eleve.b:
                break
    eleve.a = a
    eleve.save(update_fields=['a'])
    eleve.b = b
    eleve.save(update_fields=['b'])
    answer = a*b
    eleve.answer = answer
    eleve.save(update_fields=['answer'])

    horaire1 = time()
    eleve.horaire1 = horaire1
    eleve.save(update_fields=['horaire1'])
    return a, b,answer







