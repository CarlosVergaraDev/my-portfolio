/* =========================
   ACADEMY DATA
   ========================= */

var academyData = [
  {
    key: "devops-avanzado-1",
    image: "https://static.platzi.com/media/achievements/platzi-bd-637c6756-cfaf-4480-875a-691537903e1d.webp",
    name: "DevOps Avanzado",
    year: "2025",
    downloadUrl: "https://static.platzi.com/media/user_upload/diploma_superarex-d1e20eb7-1e10-4e7e-94d9-82dd1b6103fc.jpg",
    meta: {
      imageGral: "https://static.platzi.com/media/user_upload/diploma_superarex-d1e20eb7-1e10-4e7e-94d9-82dd1b6103fc.jpg",
      tipoEstudio: "Curso",
      instituto: "Platzi",
      categoria: "DevOps"
    }
  },
  {
    key: "devops-avanzado-2",
    image: "https://static.platzi.com/media/achievements/platzi-bd-637c6756-cfaf-4480-875a-691537903e1d.webp",
    name: "DevOps Avanzado",
    year: "2025",
    downloadUrl: "https://static.platzi.com/media/achievements/platzi-bd-637c6756-cfaf-4480-875a-691537903e1d.webp",
    name: "DevOps Avanzado",
    meta: {
      imageGral: "https://static.platzi.com/media/user_upload/diploma_superarex-d1e20eb7-1e10-4e7e-94d9-82dd1b6103fc.jpg",
    name: "DevOps Avanzado",
      tipoEstudio: "Curso",
      instituto: "Platzi",
      categoria: "DevOps"
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
  }
];


/* =========================
   ACADEMY SECTION
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

    /* Header */
    var header = document.createElement("div");
    header.className = "academyHeader";

    var title = document.createElement("h2");
    title.className = "academyTitle";
    title.textContent = "Academy";

    var desc = document.createElement("p");
    desc.className = "academyDesc";
    desc.textContent =
      "Technical certifications obtained during my software development training journey.";

    var counter = document.createElement("div");
    counter.className = "academyCounter";
    counter.textContent = this.data.length + "/50";

    header.appendChild(title);
    header.appendChild(desc);
    header.appendChild(counter);

    /* List */
    var list = document.createElement("div");
    list.className = "academyList";

    for (var i = 0; i < this.data.length; i++) {
      list.appendChild(this.buildRow(this.data[i]));
    }

    /* Ver más */
    var moreWrap = document.createElement("div");
    moreWrap.className = "academyMoreWrap";

    var moreBtn = document.createElement("button");
    moreBtn.className = "academyMoreBtn";
    moreBtn.type = "button";
    moreBtn.textContent = "ver mas";

    // Abre modal-academy.js
    moreBtn.addEventListener("click", function () {
      window.dispatchEvent(
        new CustomEvent("ui:open", {
          detail: {
            type: "academy.all",
            payload: academyData
          }
        })
      );
    });


    moreWrap.appendChild(moreBtn);

    /* Render */
    this.container.appendChild(header);
    this.container.appendChild(list);
    this.container.appendChild(moreWrap);
  }

  /* =========================
     BUILD ROW
  ========================= */
  buildRow(item) {
    var row = document.createElement("div");
    row.className = "academyRow";
    row.setAttribute("data-key", item.key);

    /* Col name */
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

    /* Col year */
    var colYear = document.createElement("div");
    colYear.className = "academyCol academyCol--year";

    var year = document.createElement("div");
    year.className = "academyYear";
    year.textContent = item.year;

    colYear.appendChild(year);

    /* Col download */
    var colDownload = document.createElement("div");
    colDownload.className = "academyCol academyCol--download";

    var downloadLink = document.createElement("a");
    downloadLink.className = "academyDownloadBtn";
    downloadLink.href = item.downloadUrl;
    downloadLink.target = "_blank";
    downloadLink.rel = "noopener noreferrer";
    downloadLink.setAttribute("aria-label", "Descargar certificado");

    // SVG insertado por JS
    downloadLink.appendChild(buildDownloadSvg());

    colDownload.appendChild(downloadLink);

    /* Click row -> modal individual */
    row.addEventListener("click", function () {
      var ev = new CustomEvent("academy:open", { detail: item });
      window.dispatchEvent(ev);
    });

    /* Evita burbujeo */
    downloadLink.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    row.appendChild(colName);
    row.appendChild(colYear);
    row.appendChild(colDownload);

    return row;
  }
}


/* =========================
   SVG DOWNLOAD
========================= */

function buildDownloadSvg() {
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("height", "24px");
  svg.setAttribute("width", "24px");
  svg.setAttribute("viewBox", "0 -960 960 960");
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("aria-hidden", "true");

  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"
  );

  svg.appendChild(path);
  return svg;
}


/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", function () {
  var academy = new AcademySection("academy", academyData);
  academy.render();
});
