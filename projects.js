/* =========================
   PROJECTS DATA
   ========================= */

var projectsData = [
  {
    key: "taskflow",
    title: "TaskFlow",
    year: "2025",
    image: "https://repository-images.githubusercontent.com/149942520/0e444e00-c068-11e9-9d68-9fc9dcc29932",
    meta: {
      version: "1.0.0",
      type: "Web App",
      description: "Lorem ipsum dolor sit amet.",
      github: "",
      web: ""
    }
  },
  {
    key: "weatherlite",
    title: "WeatherLite",
    year: "2025",
    image: "https://repository-images.githubusercontent.com/149942520/0e444e00-c068-11e9-9d68-9fc9dcc29932",
    meta: {
      version: "0.9.2",
      type: "Dashboard",
      description: "Lorem ipsum dolor sit amet.",
      github: "",
      web: ""
    }
  },
  {
    key: "miniapi",
    title: "MiniApi",
    year: "2025",
    image: "https://repository-images.githubusercontent.com/149942520/0e444e00-c068-11e9-9d68-9fc9dcc29932",
    meta: {
      version: "1.2.1",
      type: "API",
      description: "Lorem ipsum dolor sit amet.",
      github: "",
      web: ""
    }
  },
  {
    key: "notessql",
    title: "NotesSQL",
    year: "2025",
    image: "https://repository-images.githubusercontent.com/149942520/0e444e00-c068-11e9-9d68-9fc9dcc29932",
    meta: {
      version: "1.0.3",
      type: "CRUD App",
      description: "Lorem ipsum dolor sit amet.",
      github: "",
      web: ""
    }
  }
];


/* =========================
   PROJECTS SECTION
   ========================= */

class ProjectsSection {

  constructor(containerId, data) {
    this.container = document.getElementById(containerId);
    this.data = data;

    if (!this.container) {
      console.error("No existe el contenedor:", containerId);
    }
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = "";

    /* Título */
    var title = document.createElement("h2");
    title.className = "projectsTitle";
    title.textContent = "Projects";

    /* Grid */
    var grid = document.createElement("div");
    grid.className = "projectsGrid";

    for (var i = 0; i < this.data.length; i++) {
      grid.appendChild(this.buildCard(this.data[i]));
    }

    /* Ver más (centrado abajo) */
    var moreWrap = document.createElement("div");
    moreWrap.className = "projectsMoreWrap";

    var moreBtn = document.createElement("button");
    moreBtn.className = "projectsMoreBtn";
    moreBtn.type = "button";
    moreBtn.textContent = "Ver más";

    /* Evento: abre modal con TODOS los proyectos */
    moreBtn.addEventListener("click", function () {
      var ev = new CustomEvent("projects:openAll", {
        detail: this.data
      });
      window.dispatchEvent(ev);
    }.bind(this));

    moreWrap.appendChild(moreBtn);

    /* Render final */
    this.container.appendChild(title);
    this.container.appendChild(grid);
    this.container.appendChild(moreWrap);
  }

  buildCard(project) {
    var card = document.createElement("article");
    card.className = "projectCard";

    var imageWrap = document.createElement("div");
    imageWrap.className = "projectCardImage";

    var img = document.createElement("img");
    img.src = project.image;
    img.alt = project.title;

    imageWrap.appendChild(img);

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

    card.appendChild(imageWrap);
    card.appendChild(info);

    /* Click tarjeta → modal individual */
    card.addEventListener("click", function () {
      var ev = new CustomEvent("projects:open", { detail: project });
      window.dispatchEvent(ev);
    });

    return card;
  }

}


/* =========================
   INIT
   ========================= */

document.addEventListener("DOMContentLoaded", function () {
  var projects = new ProjectsSection("projects", projectsData);
  projects.render();
});
