// i18n.js

const resources = {
  en: {
    translation: {


      //Navbar


      // About Section
      "title-aboutme.heading": "About Me",

      "about.paragraph":
        "Hello! I’m a web developer in training, deeply interested in designing clean, functional, and visually appealing interfaces. I’m currently focused on improving my skills in HTML, CSS, and JavaScript, while preparing to master more advanced tools like React, Node.js, and databases such as MongoDB.",

      // Skills Section
      "skills.title": "Hard Skills",
      "skills.cta.more": "See more",
      "skills.cta.less": "See less",

      // Academy Section

    }
  },
  es: {
    translation: {

      // About Section
      "title-aboutme.heading": "Sobre Mí",

      "about.paragraph":
        "¡Hola! Soy un desarrollador web en formación, profundamente interesado en diseñar interfaces limpias, funcionales y visualmente atractivas. Actualmente estoy enfocado en mejorar mis habilidades en HTML, CSS y JavaScript, mientras me preparo para dominar herramientas más avanzadas como React, Node.js y bases de datos como MongoDB.",

      // Skills Section
      "skills.title": "Habilidades Técnicas",
      "skills.cta.more": "Ver más",
      "skills.cta.less": "Ver menos",

      // Academy Section

    }
  }
};

// Define updateContent PRIMERO (antes de init)
window.updateContent = function () {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const attr = el.getAttribute("data-i18n-attr");

    if (attr) el.setAttribute(attr, i18next.t(key));
    else el.textContent = i18next.t(key);
  });

  document.documentElement.setAttribute("lang", i18next.language);
};

// Persistencia del idioma
const savedLang = localStorage.getItem("lang") || "en";

// Init
i18next.init(
  {
    lng: savedLang,
    debug: false,
    resources
  },
  function () {
    window.updateContent(); // pinta traducción inicial
  }
);

// Repintado automático en cambios de idioma
i18next.on("languageChanged", () => {
  // 1) Actualiza el contenido primero
  window.updateContent();

  // 2) Animación SOLO a los elementos traducibles con stagger
  const nodes = Array.from(document.querySelectorAll("[data-i18n]"));

  nodes.forEach((el, i) => {
    // reinicia animación si cambian idioma rápido
    el.classList.remove("i18n-animate");
    el.style.animationDelay = `${i * 35}ms`; // stagger suave
    void el.offsetWidth; // reflow para re-disparar la animación
    el.classList.add("i18n-animate");
  });
});

