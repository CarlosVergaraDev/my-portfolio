// ui-manager.js

// ============================
// Theme Switcher (Light / Dark)
// ============================
const themeToggleBtn = document.getElementById("btn-mode");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);

function toggleTheme() {
  const current = root.getAttribute("data-theme") || "dark";
  const next = current === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", toggleTheme);
} else {
  console.warn("No se encontró #btn-mode");
}

// ============================
// Language Dropdown (i18next)
// ============================
const btnTraduction = document.getElementById("btn-traduction");
const modalTraduction = document.getElementById("modal-traduction");

if (btnTraduction && modalTraduction) {
  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Espanish" },
  ];

  modalTraduction.innerHTML = "";

  languages.forEach((lang) => {
    const option = document.createElement("div");
    option.className = "option";
    option.dataset.lang = lang.code;
    option.textContent = lang.label;

    option.addEventListener("click", () => {
      // Cambiar idioma + persistir
      if (window.i18next) {
        i18next.changeLanguage(lang.code, () => {
          localStorage.setItem("lang", lang.code);
          if (typeof window.updateContent === "function") window.updateContent();
        });
      } else {
        console.warn("i18next no está cargado. Revisa el orden de scripts.");
      }

      modalTraduction.classList.remove("active");
    });

    modalTraduction.appendChild(option);
  });

  // Abrir/cerrar al click en el svg
  btnTraduction.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    modalTraduction.classList.toggle("active");
  });

  // Cerrar al click fuera
  document.addEventListener(
    "click",
    (e) => {
      const clickedInside = modalTraduction.contains(e.target);
      const clickedButton = btnTraduction.contains(e.target);
      if (!clickedInside && !clickedButton) {
        modalTraduction.classList.remove("active");
      }
    },
    true
  );
} else {
  console.warn("No se encontró #btn-traduction o #modal-traduction");
}

// ============================
// Spotlight cursor effect
// ============================
const body = document.body;

window.addEventListener("mousemove", (e) => {
  body.style.setProperty("--spotlight-x", e.clientX + "px");
  body.style.setProperty("--spotlight-y", e.clientY + "px");
});


/* =====  UI MANAGER (GLOBAL SIDE MODAL) ========== */

(function () {

  /* ===== STATE (estado interno) ====== */

  // Nodo raíz de la modal (overlay + panel)
  var modalRoot = null;

  // Referencias internas para actualizar título y contenido
  var modalTitleEl = null;
  var modalBodyEl = null;

  // Registro de renderers por type
  // Ej: registry["projects.detail"] = function(ctx) {}
  var registry = {};

  // Estado actual (informativo / debug)
  var current = {
    type: null,
    payload: null
  };

  /* ============== INIT ============= */

  document.addEventListener("DOMContentLoaded", function () {
    createModalShell();
    bindGlobalEvents();
  });

  /* =======  API PÚBLICA ======== */

  // Expuesta globalmente para que otros módulos se registren
  window.UIManager = {
    register: registerRenderer,
    open: openModal,
    close: closeModal
  };

  /* ========== MODAL SHELL (estructura base) ============ */

  function createModalShell() {
    // Evita crear la modal más de una vez
    if (modalRoot) return;

    /* Root */
    modalRoot = document.createElement("div");
    modalRoot.className = "uiSideModal";

    /* Overlay */
    var overlay = document.createElement("div");
    overlay.className = "uiSideModalOverlay";
    overlay.setAttribute("data-ui-close", "true");

    /* Panel lateral */
    var panel = document.createElement("aside");
    panel.className = "uiSideModalPanel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");

    /* Header */
    var header = document.createElement("div");
    header.className = "uiSideModalHeader";

    modalTitleEl = document.createElement("h3");
    modalTitleEl.className = "uiSideModalTitle";

    var closeBtn = document.createElement("button");
    closeBtn.className = "uiSideModalClose";
    closeBtn.type = "button";
    closeBtn.setAttribute("data-ui-close", "true");
    closeBtn.textContent = "✕";

    header.appendChild(modalTitleEl);
    header.appendChild(closeBtn);

    /* Body */
    modalBodyEl = document.createElement("div");
    modalBodyEl.className = "uiSideModalBody";

    /* Ensamblado */
    panel.appendChild(header);
    panel.appendChild(modalBodyEl);

    modalRoot.appendChild(overlay);
    modalRoot.appendChild(panel);

    document.body.appendChild(modalRoot);

    /* Cerrar al hacer click en overlay o botón */
    modalRoot.addEventListener("click", function (e) {
    if (e.target.closest("[data-ui-close]")) {
        closeModal();
      }
    });




  }

  /* ======= EVENTOS GLOBALES ============ */

  function bindGlobalEvents() {
    // Evento estándar para abrir modal
    window.addEventListener("ui:open", function (e) {
      if (!e || !e.detail) return;
      openModal(e.detail.type, e.detail.payload || {});
    });

    // Cerrar con tecla ESC
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) {
        closeModal();
      }
    });
  }

  /* =========== ROUTER / REGISTRY ============= */

  // Registra un renderer para un type específico
  function registerRenderer(type, renderFn) {
    if (!type || typeof renderFn !== "function") {
      console.warn("UIManager.register requiere (type, function)");
      return;
    }

    registry[type] = renderFn;
  }

  // Abre la modal y delega el renderizado
  function openModal(type, payload) {
    // Si no hay renderer, no abrimos la modal
    if (!registry[type]) {
      console.warn("No hay renderer registrado para:", type);
      return;
    }

    current.type = type;
    current.payload = payload;

    // Limpieza previa
    modalTitleEl.textContent = "";
    clearNode(modalBodyEl);

    // Ejecuta el renderer registrado
    registry[type]({
      setTitle: setTitle,
      setBody: setBody,
      payload: payload,
      close: closeModal
    });

    // Mostrar modal
    modalRoot.classList.add("isOpen");
    document.body.classList.add("uiModalLock");
  }

  // Cierra la modal
  function closeModal() {
    modalRoot.classList.remove("isOpen");
    document.body.classList.remove("uiModalLock");

    current.type = null;
    current.payload = null;

    modalTitleEl.textContent = "";
    clearNode(modalBodyEl);
  }

  function isOpen() {
    return modalRoot.classList.contains("isOpen");
  }

  /* ========== HELPERS PARA RENDERERS ============= */

  // Setea el título del header
  function setTitle(text) {
    modalTitleEl.textContent = text || "";
  }

  // Inserta contenido seguro en el body
  // SOLO acepta:
  // - Node
  // - DocumentFragment
  function setBody(node) {
    clearNode(modalBodyEl);

    if (!node) return;

    if (node instanceof Node) {
      modalBodyEl.appendChild(node);
    } else {
      console.warn("setBody espera un Node o DocumentFragment");
    }
  }

  // Elimina todos los hijos de un nodo (helper seguro)
  function clearNode(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

})();

