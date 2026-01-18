

//***** EFECTO SPOTLIGHT SEGUIDOR DEL CURSOR *****//

const body = document.body;

// Escuchamos el evento 'mousemove' en todo el documento
window.addEventListener('mousemove', (e) => {

    // Obtenemos las coordenadas X e Y del cursor
    const x = e.clientX;
    const y = e.clientY;

    // Actualizamos las variables de CSS en el elemento body
    // Es importante añadir 'px' para que CSS lo interprete como una unidad de píxeles
    body.style.setProperty('--spotlight-x', x + 'px');
    body.style.setProperty('--spotlight-y', y + 'px');

});








