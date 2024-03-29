// CLEAR LOCAL STORAGE
localStorage.clear();

//INITIALISATION DE LA DATE DE DEPART
let date1 = new(Date);
let Date1 = date1.getTime();
let date2 = 0 ;
let Date2 = 0 ;
let mod_ls_duree_connexion = Date2 - Date1;

//RECUPERATION DES DONNEES
const niveau_multiplication = document.getElementById("hid_niveau").textContent;

/*$(document).ready(function(){
    setInterval(function() {
        $.ajax({
            type:'GET',
            url:"{% url 'getdata' %}",
            success: function(response){
                console.log(response.Exchanger.tablemultiplication_Niveau);
            },
        })
    }, 1000)
})*/




//RECUPERATION DES ID DE LA PAGE HTML
//const button = document.getElementById('hid_btn');
const button2 = document.getElementById('hid_btn2');
const btn_valider = document.getElementById('hid_btn_valider');
const input = document.getElementById('hid_inp');
const Input = document.getElementById('Hid_inp');
const enregistrer = document.getElementById('hid_enregistrer');
let commentaire = document.getElementById("hid_commentaire");
const demarrer = document.getElementById("hid_demarrer");


const nombre1 = document.getElementById("hid_nombre1"); //bloc1
const nombre2 = document.getElementById("hid_nombre2"); //bloc2
const j_signe = document.getElementById("hid_signe"); //bloc3
const j_egal = document.getElementById("hid_egal"); //bloc4
const j_resultat = document.getElementById("hid_resultat"); //bloc5

let expression = document.getElementById("hid_expression");
let espace = document.getElementById("hid_espace");

let nombreQuestions = document.getElementById('hid_nombreQuestions');
let resultatsJustes = document.getElementById('hid_resultatsJustes');
let resultatsFaux = document.getElementById('hid_resultatsFaux');
let modale_nombre_questions = document.getElementById('hid_modale_nombre_questions');
let modale_resultats_justes = document.getElementById('hid_modale_resultats_justes');
let modale_resultats_faux = document.getElementById('hid_modale_resultats_faux');
let modale_temps = document.getElementById('hid_modale_temps');

//MISE EN PAGE
const bloc0 = document.getElementById('hid_bloc0');
const bloc1 = document.getElementById('hid_bloc1');
const bloc2 = document.getElementById('hid_bloc2');
const bloc3 = document.getElementById('hid_bloc3');
const bloc4 = document.getElementById('hid_bloc4');
const bloc5 = document.getElementById('hid_bloc5');

// DECLARATION DES NIVEAUX
let tablemultiplication_reponse = 0;
let ls_tablemultiplication_Niveau = parseInt(niveau_multiplication);
//let ls_tablemultiplication_Niveau = Number(localStorage.getItem("tablemultiplication_Niveau"));
//if(!ls_tablemultiplication_Niveau) { ls_tablemultiplication_Niveau = 1; }


let Multiplication = 0;
let Division = 0;
let Addition = 0;
let Soustraction = 0;
let Complement = 0;
let Doublemoitie = 0;
let Multiplication_a_trou = 0;


//REPONSE JUSTE VARIABLE GLOBALE
let correctAnswer = 0;

// VARIABLE TABLEAU
const tableau = [];

// DECLARATION DES VARIABLE POUR LE TIMER
let t = 0 ;
let timer = 0 ;
let seconde = document.getElementById("hid_timer");
let taille = 0;
let sum = 0;
let tempsMoyen = 0;
let tempsMoyenCentieme = 0;

//DECLARATION VARIABLE DU CALCUL
let tableauSigne = [];
let signe = "" ;
let egal = "";
let Answer = "";
let num1 = "";
let num2 = "";
let resultat = "";

//DESACTIVATION DES BOUTONS AU DEPART
input.disabled = true ;
btn_valider.disabled = true ;
input.disabled = true ;




//MODIFICATION DE LINPUT ET DU BOUTON VALIDER
function active() {
    btn_valider.disabled = false ;
    input.disabled = false ;
    enregistrer.disabled = true ;
    demarrer.disabled = true ;
    input.focus();
}

function desactive() {
    btn_valider.disabled = true ;
    input.disabled = true ;
    enregistrer.disabled = false ;
}

function activeContinuer() {
    btn_valider.disabled = false ;
    input.disabled = false ;
    enregistrer.disabled = true ;
}


//FONCTION DESACTIVATION DES BOUTONS
function disable(x) { x.disabled = true ;}

//FONCTION ACTIVATION DES BOUTONS
function able(x) { x.disabled = false ;}

// REMISE A ZERO DE L INPUT ET DU COMMENTAIRE
function raz() {
    input.value= "";
    commentaire.innerText= "";
}

//CHANGEMENT DE COULEUR DU CONTOUR DE L INPUT ET FOCUS DU CURSEUR DANS L INPUT
function changerCouleurEtFocus() {
   input.style.color="black";
   input.focus();
}

//RENVOIE LA REPONSE JUSTE OU FAUX
function sendAnswer() {

        //RECUPERATION DES VARIABLES DEPUIS LE LOCALSTORAGE
        clearInterval(timer);
        taille = tableau.push(t);
        sum = tableau.reduce((bcc, v) => bcc + v);
        tempsMoyen = (sum/taille)/10 ;
        tempsMoyenCentieme = tempsMoyen.toFixed(2);

        let ls_nombreQuestions = Number(localStorage.getItem("nbrequestions"));
        let ls_juste = Number(localStorage.getItem("juste"));
        let ls_faux = Number(localStorage.getItem("faux"));
        let ls_multiplicationsJustes = Number(localStorage.getItem("multiplicationsJustes"));
        let ls_additionsJustes = Number(localStorage.getItem("additionsJustes"));
        let ls_soustractionsJustes = Number(localStorage.getItem("soustractionsJustes"));
        let ls_divisionsJustes = Number(localStorage.getItem("divisionsJustes"));
        let ls_duree_connexion = Number(localStorage.getItem("duree_connexion"));

        if(!ls_nombreQuestions) { ls_nombreQuestions = 0; }
        if(!ls_juste) { ls_juste = 0; }
        if(!ls_faux) { ls_faux = 0; }
        if(!ls_multiplicationsJustes) { ls_multiplicationsJustes = 0; }
        if(!ls_additionsJustes) { ls_additionsJustes = 0; }
        if(!ls_soustractionsJustes) { ls_soustractionsJustes = 0; }
        if(!ls_divisionsJustes) { ls_divisionsJustes = 0; }
        if(!ls_duree_connexion) { ls_duree_connexion = 0; }

        ls_nombreQuestions++;
        localStorage.setItem("nbrequestions",String(ls_nombreQuestions));
        let userAnswer = +input.value;
        if(getComputedStyle(hid_div1).display === "none"){ hid_div1.style.display = "block"; } // APPARITION DE LA DIV BOUTON CONTINUER
        disable(btn_valider);
        disable(input);
        able(button2);

        date2 = new(Date);
        Date2 = date2.getTime();
        mod_ls_duree_connexion = Date2 - Date1;

        if(correctAnswer === userAnswer) {
            input.style.color="#198754";
            input.style.borderColor="#198754";
            commentaire.style.color="#198754";
            commentaire.innerText = "Bravo, c'est la bonne réponse";
            ls_juste++;
            localStorage.setItem("juste",String(ls_juste));

            if(Multiplication === 1) {
                ls_multiplicationsJustes++;
                tablemultiplication_reponse++;
                localStorage.setItem("multiplicationsJustes",String(ls_multiplicationsJustes));
                if (tablemultiplication_reponse === 5) {
                    if (ls_tablemultiplication_Niveau !== 5){
                        ls_tablemultiplication_Niveau++;
                    }
                    localStorage.setItem("tablemultiplication_Niveau",String(ls_tablemultiplication_Niveau));
                    tablemultiplication_reponse = 0;
                }
            }
            if(Addition === 1) { ls_additionsJustes++; localStorage.setItem("additionsJustes",String(ls_additionsJustes));}
            if(Soustraction === 1) { ls_soustractionsJustes++; localStorage.setItem("soustractionsJustes",String(ls_soustractionsJustes));}
            if(Division === 1) { ls_divisionsJustes++; localStorage.setItem("divisionsJustes",String(ls_divisionsJustes));}

            updateScore();
            }
        else {
            input.style.color="red";
            input.style.borderColor="red";
            commentaire.style.color="red";
            commentaire.innerText = `Faux, la bonne réponse était ${correctAnswer}`;
            tablemultiplication_reponse = 0 ; //REINITIALISATION DES REPONSES JUSTES CONSECUTIVES
            ls_faux++;
            localStorage.setItem("faux",String(ls_faux));
            updateScore();
            }

            nombreQuestions.textContent = `Nombre de question(s) : ${ls_nombreQuestions}`;
            resultatsJustes.textContent = `Réponse(s) Juste(s) : ${ls_juste}`;
            resultatsFaux.textContent = `Réponse(s) Fausse(s) : ${ls_faux}`;

            //CONVERSION POUR AFFICHAGE DANS LE MODAL
            let mod_nombreQuestions = parseInt(`${ls_nombreQuestions}`) ;
            let mod_ls_juste = parseInt(`${ls_juste}`);
            let mod_ls_faux = mod_nombreQuestions - mod_ls_juste;
            let mod_juste_pour_cent = (mod_ls_juste/mod_nombreQuestions)*100;
            let mod_juste_pour_cent_arrondi = mod_juste_pour_cent.toFixed(2);
            let mod_faux_pour_cent_arrondi = (100 - mod_juste_pour_cent_arrondi).toFixed(2) ;

            let mod_ls_multiplicationsJustes = parseInt(`${ls_multiplicationsJustes}`) ;
            let mod_ls_additionsJustes = parseInt(`${ls_additionsJustes}`) ;
            let mod_ls_soustractionsJustes = parseInt(`${ls_soustractionsJustes}`) ;
            let mod_ls_divisionsJustes = parseInt(`${ls_divisionsJustes}`) ;
            let mod_ls_duree_connexion_avant = parseInt(`${ls_duree_connexion}`) ;

            //let fauxarrondi = fauxpourcent.toFixed(1);

            //ENVOI DANS LE MODAL
            modale_nombre_questions.textContent = `Tu as répondu à ${mod_nombreQuestions} question(s)`;
            modale_resultats_justes.textContent = `${mod_juste_pour_cent_arrondi}% de réponse(s) juste(s)`;
            modale_resultats_faux.textContent = `${mod_faux_pour_cent_arrondi}% de réponse(s) fausse(s)`;
            modale_temps.textContent = `Temps de réponse moyen : ${tempsMoyenCentieme} s`;



            //let temps1 = Number(localStorage.getItem("temps"));
            //taille = tableau.push(temps1);

            // MET LA VALEUR DU NOMBRE DE QUESTIONS JUSTES DANS L INPUT INVISIBLE
            document.getElementById('hid_score_multiplication').setAttribute('value', mod_ls_multiplicationsJustes);
            document.getElementById('hid_score_addition').setAttribute('value', mod_ls_additionsJustes);
            document.getElementById('hid_score_soustraction').setAttribute('value', mod_ls_soustractionsJustes);
            document.getElementById('hid_score_division').setAttribute('value', mod_ls_divisionsJustes);
            document.getElementById('hid_tablemultiplication_Niveau').setAttribute('value', ls_tablemultiplication_Niveau);

            document.getElementById('hid_duree_connexion').setAttribute('value', mod_ls_duree_connexion);



    } // FIN DE LA FONCTION ANSWER

//RELANCE LA FONCTION CALCUL()
function continuer() {
        disable(button2);
        able(btn_valider);
        operations();
        able(input);
        raz();
        changerCouleurEtFocus();
        input.style.borderColor="transparent";
    }

//MISE A JOUR DES SCORES
function updateScore() {

        Juste = localStorage.getItem("juste")
        modale_resultats_justes.textContent = `Réponse(s) Juste(s) : ${Juste}`;

        Faux = localStorage.getItem("faux")
        modale_resultats_faux.textContent = `Réponse(s) Fausse(s) : ${Faux}`;

        NombreQuestions = localStorage.getItem("nbrequestions")
        modale_nombre_questions.textContent = `Nombre de question(s) : ${NombreQuestions}`;
}

function refreshTime() {
    t=t+1;
    seconde.innerHTML = t/10 ;
}

function demarrerTime() {
    t = 0;
    timer = setInterval(refreshTime, 100); // 1000ms <=> 1s
}

function randomInt(number){
  return Math.floor(Math.random()*(number));
}

function entierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function operations() {
    //INITIALISATION DES OPERATIONS POSSIBLES
    Multiplication = 0;
    Division = 0;
    Addition = 0;
    Soustraction = 0;
    Complement = 0;
    Doublemoitie = 0;
    Multiplication_a_trou = 0;
    test = [0,1,2,3,4,5,6];
    indice = test[randomInt(test.length)];
    indice = 0;
    if (indice === 0) {
        tablemultiplication();
        }
    else if (indice === 1) {
        addition();
        }
    else if (indice === 2) {
        soustraction();
        }
    else if (indice === 3) {
        division();
        }
    else if (indice === 4) {
        complement();
        }
    else if (indice === 5) {
        doublemoitie();
        }
    else if (indice === 6) {
        multiplication_a_trou();
        }
}

function tablemultiplication() {
    Multiplication = 1;

    //MISE EN PLACE DE L'AFFICHAGE
    //nombreMasque.classList.add('display-3'); //On remet la police à la bonne taille

    //bloc5.style.display = 'none';
    //bloc0.style.display = 'none';

   // bloc1.style.display = '';
    //bloc2.style.display = '';
    //bloc3.style.display = '';
    //bloc4.style.display = '';

   // bloc1.classList.replace('col-8', 'col-2')

    //bloc1.classList.replace('col-1', 'col-2');
   // bloc2.classList.replace('col-1', 'col-2');
    //bloc3.classList.replace('col-1', 'col-2');
    //bloc4.classList.replace('col-1', 'col-2');

    if (ls_tablemultiplication_Niveau === 1) {
        const tableauNombre1 =[0,1,2];
        const tableauNombre2 =[0,1,2,3,4,5,6,7,8,9,10];
        num1 = tableauNombre1[randomInt(tableauNombre1.length)];
        num2 = tableauNombre2[randomInt(tableauNombre2.length)];
        }
    else if (ls_tablemultiplication_Niveau === 2) {
        const tableauNombre1 =[3,5,10];
        const tableauNombre2 =[3,4,5,6,7,8,9,10];
        num1 = tableauNombre1[randomInt(tableauNombre1.length)];
        num2 = tableauNombre2[randomInt(tableauNombre2.length)];
        }
    else if (ls_tablemultiplication_Niveau === 3) {
        const tableauNombre1 =[4,6];
        const tableauNombre2 =[3,4,5,6,7,8,9];
        num1 = tableauNombre1[randomInt(tableauNombre1.length)];
        num2 = tableauNombre2[randomInt(tableauNombre2.length)];
        }
    else if (ls_tablemultiplication_Niveau === 4) {
        const tableauNombre1 =[6,9];
        const tableauNombre2 =[4,6,7,8,9];
        num1 = tableauNombre1[randomInt(tableauNombre1.length)];
        num2 = tableauNombre2[randomInt(tableauNombre2.length)];
        }
    else if (ls_tablemultiplication_Niveau === 5) {
        const tableauNombre1 =[7,8];
        const tableauNombre2 =[6,7,8,9];
        num1 = tableauNombre1[randomInt(tableauNombre1.length)];
        num2 = tableauNombre2[randomInt(tableauNombre2.length)];
        }

    //Answer = num1 * num2;
    //Multiplication = 1;
    //nombre1.innerText = `${num1}`;
    //nombre2.innerText = `${num2}`;
    //j_signe.innerText = "x";
    //j_egal.innerText = "=";
    //correctAnswer = Answer;
}

function multiplication_a_trou() {
    //REMETTRE LA POLICE A LA BONNE TAILLE
    nombre1.classList.add('display-3');

    // APPARTION OU PAS DES BLOCS
    bloc0.style.display = 'none';
    bloc1.style.display = '';
    bloc2.style.display = '';
    bloc3.style.display = '';
    bloc4.style.display = '';
    bloc5.style.display = '';

    //COLONNE DE BOOTSTRAP
    //bloc0.classList.replace('col-2', 'col-1');
    bloc1.classList.replace('col-2', 'col-1');
    bloc1.classList.replace('col-8', 'col-1');
    bloc2.classList.replace('col-1', 'col-2');
    bloc3.classList.replace('col-2', 'col-1');
    bloc4.classList.replace('col-1', 'col-2');
    bloc5.classList.replace('col-1', 'col-2');

    const tableauNombre1 =[1,2,3,4,5,6,7,8,9];
    num1 = tableauNombre1[randomInt(tableauNombre1.length)];

    const tableauResultat =[1,2,3,4,5,6,7,8,9];
    num2 = tableauResultat[randomInt(tableauResultat.length)];

    resultat = num1 * num2;
    Answer = num2

    Multiplication_a_trou = 1;

    nombre1.innerText = `${num1}`;
    j_signe.innerText = "x";
    nombre2.innerText = "?";
    j_egal.innerText = "=";
    j_resultat.innerText = `${resultat}`;

    correctAnswer = Answer;
}

function addition() {
//MISE EN PLACE DE L'AFFICHAGE
    nombre1.classList.add('display-3'); //On remet la police à la bonne taille

    bloc5.style.display = 'none';
    bloc0.style.display = 'none';

    bloc1.style.display = '';
    bloc2.style.display = '';
    bloc3.style.display = '';
    bloc4.style.display = '';

    bloc1.classList.replace('col-8', 'col-2')

    bloc1.classList.replace('col-1', 'col-2');
    bloc2.classList.replace('col-1', 'col-2');
    bloc3.classList.replace('col-1', 'col-2');
    bloc4.classList.replace('col-1', 'col-2');

    const tableauNombre1 =[0.5,1.2,2.3,3.7,4.6,5.8,6.9,7.8,8.3,9.1];
    const tableauNombre2 =[0,1,2,3,4,5,6,7,8,9];
    num1 = tableauNombre1[randomInt(tableauNombre1.length)];
    num2 = tableauNombre2[randomInt(tableauNombre2.length)];
    Answer = num1 + num2;
    Addition = 1;
    // expression.textContent = `${num1}  +  ${num2}  =  `;
    nombre1.innerText = `${num1}`;
    nombre2.innerText = `${num2}`;
    j_signe.innerText = "+";
    j_egal.innerText = "=";
    correctAnswer = Answer;
}

function soustraction() {
    //MISE EN PLACE DE L'AFFICHAGE
    nombre1.classList.add('display-3'); //On remet la police à la bonne taille

    bloc5.style.display = 'none';
    bloc0.style.display = 'none';

    bloc1.style.display = '';
    bloc2.style.display = '';
    bloc3.style.display = '';
    bloc4.style.display = '';

    bloc1.classList.replace('col-8', 'col-2')

    bloc1.classList.replace('col-1', 'col-2');
    bloc2.classList.replace('col-1', 'col-2');
    bloc3.classList.replace('col-1', 'col-2');
    bloc4.classList.replace('col-1', 'col-2');

    const tableauNombre1 =[5,6,7,8,9];
    const tableauNombre2 =[0,1,2,3,4];
    num1 = tableauNombre1[randomInt(tableauNombre1.length)];
    num2 = tableauNombre2[randomInt(tableauNombre2.length)];
    Answer = num1 - num2;
    Soustraction = 1;
    nombre1.innerText = `${num1}`;
    nombre2.innerText = `${num2}`;
    j_signe.innerText = "-";
    j_egal.innerText = "=";
    correctAnswer = Answer;
}

function division() {
    //MISE EN PLACE DE L'AFFICHAGE
    nombre1.classList.add('display-3'); //On remet la police à la bonne taille

    bloc5.style.display = 'none';
    bloc0.style.display = 'none';

    bloc1.style.display = '';
    bloc2.style.display = '';
    bloc3.style.display = '';
    bloc4.style.display = '';

    bloc1.classList.replace('col-8', 'col-2')

    bloc1.classList.replace('col-1', 'col-2');
    bloc2.classList.replace('col-1', 'col-2');
    bloc3.classList.replace('col-1', 'col-2');
    bloc4.classList.replace('col-1', 'col-2');

    const tableauNombre1 =[10,15,20,25];
    const tableauNombre2 =[1,2,5];
    num1 = tableauNombre1[randomInt(tableauNombre1.length)];
    num2 = tableauNombre2[randomInt(tableauNombre2.length)];
    Answer = num1 / num2;
    Division = 1;
    nombre1.innerText = `${num1}`;
    nombre2.innerText = `${num2}`;
    j_signe.innerText = ":";
    j_egal.innerText = "=";
    correctAnswer = Answer;
}

function complement() {
    // MISE EN PAGE
    bloc1.classList.replace('col-1','col-8');
    bloc1.classList.replace('col-2','col-8');
    bloc0.style.display = 'none';
    bloc1.style.display = '';
    bloc2.style.display = 'none';
    bloc3.style.display = 'none';
    bloc4.style.display = 'none';
    bloc5.style.display = 'none';
    nombre1.classList.remove('display-3');

    const tableauNombre1 =[50];
    const tableauNombre2 =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49];
    num1 = tableauNombre1[randomInt(tableauNombre1.length)];
    num2 = tableauNombre2[randomInt(tableauNombre2.length)];
    Answer = num1 - num2;
    Complement = 1;
    nombre1.innerText = `Combien faut-il ajouter à ${num2} pour obtenir ${num1} ?`;
    correctAnswer = Answer;
}

function doublemoitie() {
    // MISE EN PAGE
    bloc1.classList.replace('col-1','col-8');
    bloc1.classList.replace('col-2','col-8');
    bloc0.style.display = 'none';
    bloc1.style.display = '';
    bloc2.style.display = 'none';
    bloc3.style.display = 'none';
    bloc4.style.display = 'none';
    bloc5.style.display = 'none';
    nombre1.classList.remove('display-3');

    let article = "";
    const tableauNombre1 =["double", "moitié", "triple", "tiers", "quadruple", "quart"];
    num1 = tableauNombre1[randomInt(tableauNombre1.length)];
    const tableauNombre2 =[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,75,78,81,84,87,90,93,96,99];
    const tableauNombre3 =[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100];
    if (num1 == "tiers") {num2 = tableauNombre2[randomInt(tableauNombre2.length)]; }
    else if (num1 == "quart") { num2 = tableauNombre3[randomInt(tableauNombre3.length)]; }
    else { num2 = entierAleatoire(1, 101); }

    if (num1 == "double") {
        article = "le";
        Answer = 2 * num2;
        }
    else if (num1 == "moitié") {
        article = "la";
        Answer = num2/2 ;
        }
    else if (num1 == "triple") {
        article = "le";
        Answer = 3 * num2 ;
        }
    else if (num1 == "tiers") {
        article = "le";
        Answer = num2/3 ;
        }
    else if (num1 == "quadruple") {
        article = "le";
        Answer = 4 * num2 ;
        }
    else {
        article = "le";
        Answer = num2/4 ;
        }
    Doublemoitie = 1;
    nombre1.innerText = `Quel est ${article} ${num1} de ${num2} ?`;
    correctAnswer = Answer;
}

//ON DETECTE LE CLIC DU BOUTON
btn_valider.addEventListener('click',sendAnswer);
button2.addEventListener('click',continuer);

//ON DETECTE L APPUIE SUR LA TOUCHE ENTREE
document.addEventListener('keydown', function(event) {
    if ((event.key === "Enter")) { btn_valider.click(); }
    if ((event.key === "ArrowRight")) { button2.click(); }
});





