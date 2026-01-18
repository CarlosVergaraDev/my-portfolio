/* =========================
   ACADEMY DATA
   ========================= */

var academyData = [
  {
    key: "devops-avanzado-1",
    image: "https://static.platzi.com/media/achievements/platzi-bd-637c6756-cfaf-4480-875a-691537903e1d.webp",                 /* icono pequeño por fila (puede ser url o svg) */
    name: "DevOps Avanzado",
    year: "2025",
    downloadUrl: "#",           /* link directo (Drive o cualquier URL) */
    meta: {
      imageGral: "#",           /* imagen grande para modal (placeholder) */
      tipoEstudio: "Curso",     /* Curso / Diplomado / Pregrado / etc */
      instituto: "Platzi",      /* nombre de la institución */
      categoria: "DevOps"       /* DevOps / Frontend / Backend / etc */
    }
  },
  {
    key: "devops-avanzado-2",
    image: "https://static.platzi.com/media/achievements/platzi-bd-637c6756-cfaf-4480-875a-691537903e1d.webp",
    name: "DevOps Avanzado",
    year: "2025",
    downloadUrl: "#",
    meta: {
      imageGral: "#",
      tipoEstudio: "Curso",
      instituto: "Platzi",
      categoria: "DevOps"
    }
  },
  {
    key: "devops-avanzado-3",
    image: "https://static.platzi.com/media/achievements/platzi-bd-637c6756-cfaf-4480-875a-691537903e1d.webp",
    name: "DevOps Avanzado",
    year: "2025",
    downloadUrl: "#",
    meta: {
      imageGral: "#",
      tipoEstudio: "Curso",
      instituto: "Platzi",
      categoria: "DevOps"
    }
  },
  {
    key: "devops-avanzado-4",
    image: "https://static.platzi.com/media/achievements/platzi-bd-637c6756-cfaf-4480-875a-691537903e1d.webp",
    name: "DevOps Avanzado",
    year: "2025",
    downloadUrl: "#",
    meta: {
      imageGral: "#",
      tipoEstudio: "Curso",
      instituto: "Platzi",
      categoria: "DevOps"
    }
  }
];


/* =========================
   ACADEMY SECTION
   - Modal se conecta luego en modal.js
   ========================= */

class AcademySection {
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

    /* Header superior: título + descripción + contador */
    var header = document.createElement("div");
    header.className = "academyHeader";

    var title = document.createElement("h2");
    title.className = "academyTitle";
    title.textContent = "Academy";

    var desc = document.createElement("p");
    desc.className = "academyDesc";
    desc.textContent = "Lorem ipsum dolor sit amet consectetur. Est mauris dolor vivamus vitae et nullam.";

    var counter = document.createElement("div");
    counter.className = "academyCounter";
    counter.textContent = this.data.length + "/50";

    header.appendChild(title);
    header.appendChild(desc);
    header.appendChild(counter);

    /* Lista / tabla */
    var list = document.createElement("div");
    list.className = "academyList";

    for (var i = 0; i < this.data.length; i = i + 1) {
      list.appendChild(this.buildRow(this.data[i]));
    }

    /* Ver más (abre modal general) */
    var moreWrap = document.createElement("div");
    moreWrap.className = "academyMoreWrap";

    var moreBtn = document.createElement("button");
    moreBtn.className = "academyMoreBtn";
    moreBtn.type = "button";
    moreBtn.textContent = "ver mas";

    moreBtn.addEventListener("click", function () {
      var ev = new CustomEvent("academy:openAll", { detail: this.data });
      window.dispatchEvent(ev);
    }.bind(this));

    moreWrap.appendChild(moreBtn);

    /* Render final */
    this.container.appendChild(header);
    this.container.appendChild(list);
    this.container.appendChild(moreWrap);
  }

  buildRow(item) {
    var row = document.createElement("div");
    row.className = "academyRow";
    row.setAttribute("data-key", item.key);

    /* Col 1: icon + name */
    var colName = document.createElement("div");
    colName.className = "academyCol academyCol--name";

    var iconWrap = document.createElement("div");
    iconWrap.className = "academyIconWrap";

    var icon = document.createElement("img");
    icon.className = "academyIcon";
    icon.src = item.image;
    icon.alt = item.name + " icon";

    iconWrap.appendChild(icon);

    var name = document.createElement("div");
    name.className = "academyName";
    name.textContent = item.name;

    colName.appendChild(iconWrap);
    colName.appendChild(name);

    /* Col 2: year */
    var colYear = document.createElement("div");
    colYear.className = "academyCol academyCol--year";

    var year = document.createElement("div");
    year.className = "academyYear";
    year.textContent = item.year;

    colYear.appendChild(year);

    /* Col 3: download button */
    var colDownload = document.createElement("div");
    colDownload.className = "academyCol academyCol--download";

    var downloadLink = document.createElement("a");
    downloadLink.className = "academyDownloadBtn";
    downloadLink.href = item.downloadUrl;
    downloadLink.target = "_blank";
    downloadLink.rel = "noopener noreferrer";
    downloadLink.setAttribute("aria-label", "Descargar certificado");

    /* Ícono (puedes reemplazar por SVG si quieres) */
    downloadLink.innerHTML = "&#x2B07;";

    colDownload.appendChild(downloadLink);

    /* Click row -> modal individual (para después) */
    row.addEventListener("click", function () {
      var ev = new CustomEvent("academy:open", { detail: item });
      window.dispatchEvent(ev);
    });

    /* Evita que click en descarga dispare el click del row */
    downloadLink.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    /* Armar fila */
    row.appendChild(colName);
    row.appendChild(colYear);
    row.appendChild(colDownload);

    return row;
  }
}


/* =========================
   INIT
   ========================= */

document.addEventListener("DOMContentLoaded", function () {
  var academy = new AcademySection("academy", academyData);
  academy.render();
});
