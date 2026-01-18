
const skillsSectionTitle  = document.createElement("h2");
skillsSectionTitle.textContent = "Hard Skills";


/* Array de objetos: cada objeto es una categoría de skills */
let skillsData = [
  {
    key: "frontend",
    label: "Frontend",
    chips: ["HTML", "CSS", "JavaScript", "Responsive UI", "Accesibilidad" , "CSS", "JavaScript", "Responsive UI", "Accesibilidad", "CSS", "JavaScript", "Responsive UI", "Accesibilidad", "CSS", "JavaScript", "Responsive UI", "Accesibilidad", "CSS", "JavaScript", "Responsive UI", "Accesibilidad"]
  },

];

/* Clase encargada de pintar las categorías y sus chips */
class SkillsChipsRenderer {

  /* Constructor: recibe el id del contenedor */
  constructor(containerId) {

    /* Guardamos el id */
    this.containerId = containerId;

    /* Buscamos el contenedor en el DOM */
    this.container = document.getElementById(containerId);

    /* Validación básica */
    if (this.container === null) {
      throw new Error("Contenedor no encontrado: " + containerId);
    }

  }

  /* Renderiza todas las categorías */
  render(categories) {

    /* Limpiamos el contenedor */
    this.container.innerHTML = "";

    /* Fragmento para insertar todo de una vez */
    let fragment = document.createDocumentFragment();

    /* Recorremos las categorías */
    for (let i = 0; i < categories.length; i = i + 1) {

      /* Categoría actual */
      let category = categories[i];

      /* Construimos la sección */
      let section = this.buildCategorySection(category);

      /* La agregamos al fragmento */
      fragment.appendChild(section);
    }

    /* Insertamos todo en el DOM */
    this.container.appendChild(fragment);
  }

  /* Construye una categoría completa (label + chips) */
  buildCategorySection(category) {

    /* Contenedor principal de la categoría */
    let section = document.createElement("section");
    section.className = "skillCategory";
    section.setAttribute("data-key", category.key);

    /* Label superior (Frontend / DevOps & Tools) */
    let titleCategory = document.createElement("p");
    titleCategory.className = "skillCategory__label";
    titleCategory.textContent = category.label;

    /* Contenedor de chips */
    let chipsWrap = document.createElement("div");
    chipsWrap.classList.add("chipWrap");

    /* Recorremos los chips */
    for (let j = 0; j < category.chips.length; j = j + 1) {

      /* Creamos el chip */
      let chip = this.buildChip(category.chips[j]);

      /* Lo añadimos */
      chipsWrap.appendChild(chip);
    }

    /* Insertamos elementos en orden */
    section.appendChild(skillsSectionTitle);
    section.appendChild(titleCategory);
    section.appendChild(chipsWrap);

    /* Devolvemos la sección completa */
    return section;
  }

  /* Construye un chip individual */
  buildChip(chipName) {

    /* Creamos el div */
    let chip = document.createElement("div");
    chip.classList.add("chip");

    /* Texto visible */
    chip.textContent = chipName;

    /* Retornamos el chip */
    return chip;
  }
}

/* Instanciamos la clase */
let skillsRenderer = new SkillsChipsRenderer("skills");

/* Renderizamos las skills */
skillsRenderer.render(skillsData);
