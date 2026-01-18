// Seleccionar el contenedor existente
let modalTraduction = document.getElementById('modal-traduction');
modalTraduction.classList.add('modal-traduction');


// --- Botón español ---
let btnLanguageSpanish = document.createElement('div');
btnLanguageSpanish.classList.add('btn-lang-spanish');
btnLanguageSpanish.id = 'btn-spanish';

let wordSpanish = document.createElement('p');
wordSpanish.textContent = '🇪🇸 Spanish';

modalTraduction.appendChild(btnLanguageSpanish);
btnLanguageSpanish.appendChild(wordSpanish);



// --- Botón inglés ---
let btnLanguageEnglish = document.createElement('div');
btnLanguageEnglish.classList.add('btn-lang-english');
btnLanguageEnglish.id = 'btn-english';

let wordEnglish = document.createElement('p');
wordEnglish.textContent = '🇺🇸 English';

btnLanguageEnglish.appendChild(wordEnglish);
modalTraduction.appendChild(btnLanguageEnglish);



//***** MODAL TRADUCCIÓN *****//

const btnTraduction = document.getElementById('btn-traduction');

function toggleModal() {
    modalTraduction.classList.toggle('modal-show');
}

// 3. Evento del Botón:  Abrir/Cerrar la modal al hacer clic
btnTraduction.addEventListener('click', toggleModal);





/* modal.js
   Aquí irá TODA la lógica de modales.
   Por ahora: escuchar eventos y hacer console.log para confirmar flujo.
*/

window.addEventListener("projects:open", function (e) {
  console.log("Abrir modal de 1 proyecto:", e.detail);
  /* Aquí luego renderizas el modal individual con e.detail.meta */
});

window.addEventListener("projects:openAll", function (e) {
  console.log("Abrir modal general con todos los proyectos:", e.detail);
  /* Aquí luego renderizas el modal general con el array completo */
});
