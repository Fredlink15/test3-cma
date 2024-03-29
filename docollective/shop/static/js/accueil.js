// Wrap every letter in a span
/*var textWrapper = document.querySelector('.ml11 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.ml11 .line',
    scaleY: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 1000
  })
  .add({
    targets: '.ml11 .line',
    translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 100],
    easing: "easeOutExpo",
    duration: 1000,
    delay: 1000
  }).add({
    targets: '.ml11 .letter',
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1000,
    offset: '-=775',
    delay: (el, i) => 200 * (i+1)
  });*/

  /*.add({
    targets: '.ml11',
    opacity: 0,
    duration: 3000,
    easing: "easeOutExpo",
    delay: 1000
  });*/


/* ------------------------- */
/* MACHINE A ECRIRE */
/* ------------------------- */
"use strict";
window.addEventListener("DOMContentLoaded", (event) => {
  animate_text();
});
// -------------------
function animate_text()
{
  let delay = 100,
      delay_start = 0,
      contents,
      letters;

  document.querySelectorAll(".animate-text").forEach(function (elem) {
    contents = elem.textContent.trim();
    elem.textContent = "";
    letters = contents.split("");
    elem.style.visibility = 'visible';

    letters.forEach(function (letter, index_1) {
      setTimeout(function () {
        // ---------
        // effet machine à écrire (SIMPLE)
        elem.textContent += letter;
        // ---------
        // OU :
        // effet machine à écrire + animation CSS (SPECIAL)
        /*
        var span = document.createElement('span');
        span.innerHTML = letter.replace(/ /,'&nbsp;');
        elem.appendChild(span);
*/
        // ---------
      }, delay_start + delay * index_1);
    });
    delay_start += delay * letters.length;
  });
}

/* ------------------------- */
/* version jQuery */
/* ------------------------- */
/*
"use strict";
$(document).ready(function() {
  animate_text();
});
// -------------------
function animate_text()
{
  let delay = 100,
      delay_start = 0,
      contents,
      letters;

  $(".animate-text").each(function(index, obj) {
    contents = $(obj).text().trim();
    $(obj).html(''); // on vide le contenu
    letters = contents.split("");
    $(letters).each(function(index_1, letter) {
      setTimeout(function() {
        // ---------
        // effet machine à écrire simple
        $(obj).html( $(obj).html() + letter ); // on ajoute chaque lettre l une après l autre
        // ---------
        // ---------
      }, delay_start + delay * index_1);
    });
    // le suivant démarre à la fin du précédent
    delay_start += delay * letters.length;
  });
}
*/
