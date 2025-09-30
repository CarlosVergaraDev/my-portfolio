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


// Class projects

// Clase Tarjeta que recibe nombre, url e imagen, descripción
class Tarjeta {
  constructor(nombre, urlImagen, descripcion) {
    this.nombre = nombre;
    this.urlImagen = urlImagen;
    this.descripcion = descripcion;
  }

  // Método para renderizar la tarjeta
  render() {
    // Crear div principal
    const card = document.createElement("div");
    card.classList.add("card");

    // Crear imagen
    const img = document.createElement("img");
    img.src = this.urlImagen;
    img.alt = this.nombre;

    // Crear contenedor de texto
    const content = document.createElement("div");
    content.classList.add("card-content");

    // Crear título
    const title = document.createElement("h3");
    title.textContent = this.nombre;

    // Crear descripción
    const desc = document.createElement("p");
    desc.textContent = this.descripcion;

    // Ensamblar tarjeta
    content.appendChild(title);
    content.appendChild(desc);
    card.appendChild(img);
    card.appendChild(content);

    return card;
  }
}

// Contenedor donde irán las tarjetas
const container = document.getElementById("containerId");

// Creamos algunas instancias de prueba
const tarjetas = [
  new Tarjeta(
    "Proyecto Aurora",
    "https://picsum.photos/400/300?random=1",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod."
  ),
  new Tarjeta(
    "Proyecto Boreal",
    "https://picsum.photos/400/300?random=2",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque."
  ),
  new Tarjeta(
    "Proyecto Solaris",
    "https://picsum.photos/400/300?random=3",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis."
  )
];

// Insertamos cada tarjeta al contenedor
tarjetas.forEach(t => container.appendChild(t.render()));

// Duplicamos el contenido para hacer el carrusel infinito
container.innerHTML += container.innerHTML;

// Activamos la animación
container.classList.add("animate");

// Pausar animación al hacer hover (mouse o dedo)
container.addEventListener("mouseover", () => {
  container.style.animationPlayState = "paused";
});
container.addEventListener("mouseout", () => {
  container.style.animationPlayState = "running";
});

// Soporte táctil (para móviles)
container.addEventListener("touchstart", () => {
  container.style.animationPlayState = "paused";
});
container.addEventListener("touchend", () => {
  container.style.animationPlayState = "running";
});





// Class Certified



