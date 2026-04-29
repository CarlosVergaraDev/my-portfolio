/* ==============  PROJECTS ============== */


var projectsData = [
  {
    key: "taskflow",
    title: "TaskFlow",
    year: "2025",
    image: "https://static.wixstatic.com/media/72c0b2_9417bad731e543578911f6110f4e9a2d~mv2.jpg/v1/fill/w_924,h_476,al_c,q_85,enc_avif,quality_auto/72c0b2_9417bad731e543578911f6110f4e9a2d~mv2.jpg",
    meta: {
      version: "1.0.0",
      type: "Web App",
      description: "Lorem ipsum dolor sit amet consectetur. Aliquet vivamus vulputate ullamcorper velit magnis aliquam faucibus urna enim. Est sit commodo enim et euismod vulputate. Massa mattis enim at dolor faucibus faucibus. Enim turpis nunc mi risus.",
      github: "",
      web: ""
    },
     chips: ["Javascript", "Docker", "html", "Javascript", "Docker", "html", "Javascript", "Docker", "html", "Docker", "html"],
    id: "principal"
  },
  {
    key: "weatherlite",
    title: "WeatherLite",
    year: "2025",
    image: "https://static.wixstatic.com/media/72c0b2_350e2d191a6a45e98d53433692db555a~mv2.jpg/v1/fill/w_924,h_476,al_c,q_85,enc_avif,quality_auto/72c0b2_350e2d191a6a45e98d53433692db555a~mv2.jpg",
    meta: {
      version: "0.9.2",
      type: "Dashboard",
      description: "Lorem ipsum dolor sit amet.",
      github: "",
      web: ""
    },
    id: "principal"   
  },
  {
    key: "miniapi",
    title: "MiniApi",
    year: "2025",
    image: "https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/ypy3abirl7fyelrfdf30",
    meta: {
      version: "1.2.1",
      type: "API",
      description: "Lorem ipsum dolor sit amet consectetur. Aliquet vivamus vulputate ullamcorper velit magnis aliquam faucibus urna enim. Est sit commodo enim et euismod vulputate. Massa mattis enim at dolor faucibus faucibus. Enim turpis nunc mi risus.",
      github: "https://github.com/tuuser/tu-repo",
      web: "https://github.com/tuuser/tu-repo"
    },
    chips: ["Javascript", "Docker", "html", "Javascript", "Docker", "html", "Javascript", "Docker", "html", "Docker", "html"],
    id: "principal"  
  },
  {
    key: "notessql",
    title: "NotesSQL",
    year: "2025",
    image: "https://static.wixstatic.com/media/72c0b2_0f9bc04e4f1c4a63bc59a9d29bcd298e~mv2.jpg/v1/fill/w_924,h_476,al_c,q_85,enc_avif,quality_auto/72c0b2_0f9bc04e4f1c4a63bc59a9d29bcd298e~mv2.jpg",
    meta: {
      version: "1.0.3",
      type: "CRUD App",
      description: "Lorem ipsum dolor sit amet.",
      github: "",
      web: ""
    },
    id: "principal"  
  }
];


/* ====================== PROJECTS SECTION (HOME) ======================== */
class ProjectsSection {
  constructor(containerId, data) {
    // Contenedor <section id="projects"></section>
    this.container = document.getElementById(containerId);

    // Dataset completo (todos los proyectos)
    this.data = data || [];

    if (!this.container) {
      console.error("No existe el contenedor:", containerId);
    }
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = "";

    /* ---------- Título ---------- */
    var title = document.createElement("h2");
    title.className = "projectsTitle";
    title.textContent = "Projects";

    /* ---------- Grid ---------- */
    var grid = document.createElement("div");
    grid.className = "projectsGrid";

    // HOME: renderiza SOLO proyectos marcados como "principal"
    for (var i = 0; i < this.data.length; i++) {
      var p = this.data[i];

      // Regla HOME: solo id === "principal"
      if (p && p.id === "principal") {
        grid.appendChild(this.buildCard(p));
      }
    }

    /* ---------- Ver más (centrado abajo) ---------- */
    var moreWrap = document.createElement("div");
    moreWrap.className = "projectsMoreWrap";

    var moreBtn = document.createElement("button");
    moreBtn.className = "projectsMoreBtn";
    moreBtn.type = "button";
    moreBtn.textContent = "Ver más";

    // Click "Ver más" -> abre modal All Projects (dataset completo)
    moreBtn.addEventListener(
      "click",
      function () {
        window.dispatchEvent(
          new CustomEvent("ui:open", {
            detail: {
              type: "projects.all",
              payload: { projects: this.data }
            }
          })
        );
      }.bind(this)
    );

    moreWrap.appendChild(moreBtn);

    /* ---------- Render final en el DOM ---------- */
    this.container.appendChild(title);
    this.container.appendChild(grid);
    this.container.appendChild(moreWrap);
  }

  buildCard(project) {
    // Card base (NO cambiamos tu estructura ni tus clases)
    var card = document.createElement("article");
    card.className = "projectCard";

    /* ---------- Imagen ---------- */
    var imageWrap = document.createElement("div");
    imageWrap.className = "projectCardImage";

    var img = document.createElement("img");
    img.src = project.image;
    img.alt = project.title;

    imageWrap.appendChild(img);

    /* ---------- Info ---------- */
    var info = document.createElement("div");
    info.className = "projectCardInfo";

    var name = document.createElement("div");
    name.className = "projectCardTitle";
    name.textContent = project.title;

    var year = document.createElement("div");
    year.className = "projectCardYear";
    year.textContent = project.year;

    info.appendChild(name);
    info.appendChild(year);

    /* ---------- Ensamble ---------- */
    card.appendChild(imageWrap);
    card.appendChild(info);

    /* ---------- Click -> Modal detalle ---------- */
    // Dispara evento global: UIManager lo escucha y el renderer
    // "projects.detail" (modal-project-detail.js) renderiza el contenido.
    card.addEventListener("click", function () {
      window.dispatchEvent(
        new CustomEvent("ui:open", {
          detail: {
            type: "projects.detail",
            payload: { project: project }
          }
        })
      );
    });

    return card;
  }
}


/* ========================= INIT ========================= */
document.addEventListener("DOMContentLoaded", function () {
  // Crea la sección y renderiza el HOME
  var projects = new ProjectsSection("projects", projectsData);
  projects.render();
});
