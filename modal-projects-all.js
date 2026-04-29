/* =========================================================
   MODAL: PROJECTS ALL (v3 - full JS, version moved under header)
   File: modal-projects-all.js
   ---------------------------------------------------------
   FEATURES:
   - Renderer: "projects.all"
   - Filtro:
       * Icono SVG -> dropdown con checkbox (chips)
       * Chips superiores:
           - Sin selección: muestra TODOS los chips
           - Con selección: OCULTA los chips seleccionados (muestra el resto)
       * El listado se filtra por chips (ANY match)
   - Listado:
       * Bloques NO clickeables (sin pointer, sin navegación)
       * Solo links (Readme.md / https://...) son clickeables
       * Divider entre proyectos
       * Orden interno:
           Header (Title + Type|Year)
           Version (V. x.x.x)  <-- bajo el header, independiente
           Description
           Links
           Chips
   - Sin innerHTML (seguridad)
   - Reusa clases pd* (del detail) para estilo base
   ========================================================= */

(function () {
  if (!window.UIManager) {
    console.warn("UIManager no está disponible. Carga ui-manager.js antes.");
    return;
  }

  /* =========================
     REGISTER RENDERER
  ========================= */
  UIManager.register("projects.all", function (ctx) {
    var projects = (ctx.payload && Array.isArray(ctx.payload.projects)) ? ctx.payload.projects : [];

    ctx.setTitle("All Projects");
    ctx.setBody(buildAllProjectsView(projects));
  });

  /* =========================
     MAIN VIEW
  ========================= */
  function buildAllProjectsView(projects) {
    var root = el("div", { className: "paRoot" });

    // Estado interno del filtro
    var state = { selected: [] };

    // Universo de chips (únicos, ordenados)
    var allChips = collectUniqueChips(projects);

    // Construye UI del filtro
    var filterUI = buildFilterUI(allChips, state);
    root.appendChild(filterUI.root);

    // Contenedor del listado
    var list = el("div", { className: "paList" });
    root.appendChild(list);

    // Primer render
    renderProjectsList(list, projects, state.selected);

    // Re-render al cambiar filtro
    filterUI.onChange(function (selected) {
      state.selected = selected;
      renderProjectsList(list, projects, state.selected);
    });

    return root;
  }

  /* =========================
     FILTER UI
     - Botón SVG
     - Chips superiores (lógica invertida)
     - Dropdown con checkboxes + scroll
  ========================= */
  function buildFilterUI(allChips, state) {
    var root = el("div", { className: "paFilter" });

    // Barra superior: [icon] + [chips visibles]
    var bar = el("div", { className: "paFilterBar" });

    // Botón del filtro
    var btn = el("button", { className: "paFilterBtn" });
    btn.type = "button";
    btn.setAttribute("aria-label", "Open filters");
    btn.appendChild(buildFilterSvg());

    // Chips superiores visibles
    // LÓGICA:
    // - Si no hay seleccionados -> mostramos TODOS
    // - Si hay seleccionados -> ocultamos los seleccionados, mostramos el resto
    var chipsTop = el("div", { className: "paChipsTop" });
    renderTopChips(chipsTop, allChips, state.selected);

    bar.appendChild(btn);
    bar.appendChild(chipsTop);

    // Dropdown panel
    var dropdown = el("div", { className: "paDropdown" });
    dropdown.setAttribute("aria-hidden", "true");
    dropdown.style.display = "none";

    // Caja scrolleable del dropdown
    var scrollBox = el("div", { className: "paDropdownScroll" });

    if (!allChips.length) {
      scrollBox.appendChild(el("div", { className: "paEmpty", text: "No chips available." }));
    } else {
      for (var i = 0; i < allChips.length; i++) {
        scrollBox.appendChild(buildCheckbox(allChips[i], onCheckboxChange));
      }
    }

    dropdown.appendChild(scrollBox);

    // Estado open/close
    var isOpen = false;

    // Lista de subscriptores para notificar cambios
    var handlers = [];

    // Toggle dropdown
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      isOpen = !isOpen;
      setDropdownState(isOpen);
    });

    // Cierra click afuera
    document.addEventListener("click", function () {
      if (!isOpen) return;
      isOpen = false;
      setDropdownState(false);
    });

    // Evita cierre al click dentro del dropdown
    dropdown.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    function setDropdownState(open) {
      dropdown.style.display = open ? "block" : "none";
      dropdown.setAttribute("aria-hidden", open ? "false" : "true");
      root.classList.toggle("isOpen", open);
    }

    // Change handler: actualiza state + top chips + notifica
    function onCheckboxChange() {
      var selected = getCheckedValues(scrollBox);
      state.selected = selected;

      // Re-render chips superiores con la lógica invertida
      renderTopChips(chipsTop, allChips, selected);

      // Notificar al listado
      for (var k = 0; k < handlers.length; k++) {
        handlers[k](selected);
      }
    }

    root.appendChild(bar);
    root.appendChild(dropdown);

    return {
      root: root,
      onChange: function (fn) {
        handlers.push(fn);
      }
    };
  }

  function buildCheckbox(value, onChange) {
    var label = el("label", { className: "paCheck" });

    var input = document.createElement("input");
    input.type = "checkbox";
    input.value = value;
    input.addEventListener("change", onChange);

    var text = el("span", { className: "paCheckText", text: value });

    label.appendChild(input);
    label.appendChild(text);

    return label;
  }

  function getCheckedValues(container) {
    var inputs = container.querySelectorAll('input[type="checkbox"]');
    var out = [];

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].checked) out.push(inputs[i].value);
    }
    return out;
  }

  // Render chips superiores (oculta los seleccionados)
  function renderTopChips(container, allChips, selected) {
    clearNode(container);

    var selectedNorm = normalizeArray(selected || []);

    for (var i = 0; i < allChips.length; i++) {
      var chipLabel = allChips[i];
      var chipKey = normalizeText(chipLabel);

      // Si está marcado en checkbox -> NO se muestra arriba
      if (selectedNorm.indexOf(chipKey) !== -1) continue;

      container.appendChild(el("span", { className: "paTopChip", text: chipLabel }));
      container.appendChild(el("span", { className: "pdSep", text: " | " }));
    }

    // Remover separador final si quedó al final
    trimTrailingSeparator(container);
  }

  function trimTrailingSeparator(container) {
    if (!container.lastChild) return;

    // Si el último es un separador (.pdSep), lo quitamos
    if (
      container.lastChild.nodeType === 1 &&
      container.lastChild.classList &&
      container.lastChild.classList.contains("pdSep")
    ) {
      container.removeChild(container.lastChild);
    }
  }

  // SVG del icono de filtro (DOM API)
  function buildFilterSvg() {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("height", "24px");
    svg.setAttribute("width", "24px");
    svg.setAttribute("viewBox", "0 -960 960 960");
    svg.setAttribute("aria-hidden", "true");
    svg.classList.add("paFilterIcon");

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z"
    );

    svg.appendChild(path);
    return svg;
  }

  /* =========================
     PROJECTS LIST
     - Filtra por chips (ANY)
     - Render de cada proyecto + divider
  ========================= */
  function renderProjectsList(listEl, projects, selectedChips) {
    clearNode(listEl);

    var filtered = filterByChips(projects, selectedChips);

    // Orden: año desc, título asc
    filtered.sort(function (a, b) {
      var ya = parseInt(a.year, 10) || 0;
      var yb = parseInt(b.year, 10) || 0;
      if (yb !== ya) return yb - ya;
      return safeText(a.title, "").localeCompare(safeText(b.title, ""));
    });

    if (!filtered.length) {
      listEl.appendChild(el("div", { className: "paEmpty", text: "No results." }));
      return;
    }

    for (var i = 0; i < filtered.length; i++) {
      listEl.appendChild(buildProjectBlock(filtered[i]));
      if (i < filtered.length - 1) {
        listEl.appendChild(el("div", { className: "paDivider" }));
      }
    }
  }

  /* =========================
     PROJECT BLOCK (NOT CLICKABLE)
     ORDER:
       Header (Title + Type|Year)
       Version (V. x.x.x) <-- moved here
       Description
       Links
       Chips
  ========================= */
  function buildProjectBlock(project) {
    var root = el("div", { className: "paProject" });

    // Hero
    if (project.image) {
      var hero = el("img", { className: "pdHero paHero" });
      hero.src = project.image;
      hero.alt = safeText(project.title, "Project image");
      root.appendChild(hero);
    }

    // Header: Title (izq) + Type|Year (der)
    var headerRow = el("div", { className: "pdHeaderRow paHeaderRow" });

    var titleWrap = el("div", { className: "pdTitleWrap" });
    titleWrap.appendChild(el("h4", { className: "pdTitle paTitleSm", text: safeText(project.title, "Untitled") }));

    var metaInline = el("div", { className: "pdMetaInline paMetaRight" });

    var typeText = getMetaText(project, "type");
    var yearText = safeText(project.year, "-");

    metaInline.appendChild(el("span", { className: "pdTypeText", text: safeText(typeText, "-") }));
    metaInline.appendChild(el("span", { className: "pdSep", text: " | " }));
    metaInline.appendChild(el("span", { className: "pdYearText", text: yearText }));
    metaInline.appendChild(el("span", { className: "pdSep", text: " |" }));

    headerRow.appendChild(titleWrap);
    headerRow.appendChild(metaInline);
    root.appendChild(headerRow);

    // Version (MOVIDA AQUÍ: justo debajo del header)
    var versionText = getMetaText(project, "version");
    if (versionText) {
      var versionOnlyRow = el("div", { className: "paVersionOnlyRow" });
      versionOnlyRow.appendChild(el("div", { className: "pdVersion", text: "V. " + versionText }));
      root.appendChild(versionOnlyRow);
    }

    // Description
    var desc = getMetaText(project, "description");
    if (desc) {
      root.appendChild(el("p", { className: "pdDesc", text: desc }));
    }

    // Chips
    var chipsArr = Array.isArray(project.chips) ? project.chips : [];
    if (chipsArr.length) {
      root.appendChild(buildChips(chipsArr));
    }

    // Links (Readme.md | https://...)  <-- ahora van debajo de los chips
    var linksRow = buildLinksRow(project);
    if (linksRow) {
      root.appendChild(linksRow);
    }

    return root;
  }

  function buildLinksRow(project) {
    var githubUrl = getUrl(project, "github");
    var webUrl = getUrl(project, "web");

    if (!githubUrl && !webUrl) return null;

    // Reusa la clase del detail (tú ya la mejoraste)
    var row = el("div", { className: "pdLinksRow" });

    if (githubUrl) row.appendChild(buildTextLink("Readme.md", githubUrl));

    if (githubUrl && webUrl) {
      row.appendChild(el("span", { className: "pdLinkSep", text: " | " }));
    }

    if (webUrl) row.appendChild(buildTextLink(shortUrl(webUrl), webUrl));

    return row;
  }

  function buildTextLink(label, href) {
    var a = el("a", { className: "pdLink", text: label });
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    return a;
  }

  function shortUrl(url) {
    var max = 18;
    if (url.length <= max) return url;
    return url.slice(0, 12) + "...";
  }

  function buildChips(chipsArr) {
    var wrap = el("div", { className: "pdChips" });

    for (var i = 0; i < chipsArr.length; i++) {
      var t = String(chipsArr[i]).trim();
      if (!t) continue;
      wrap.appendChild(el("span", { className: "pdChip", text: t }));
    }

    return wrap;
  }

  /* =========================
     FILTER LOGIC
     - ANY match (si tiene alguno de los seleccionados)
  ========================= */
  function filterByChips(projects, selectedChips) {
    if (!selectedChips || !selectedChips.length) return projects.slice();

    var sel = normalizeArray(selectedChips);
    var out = [];

    for (var i = 0; i < projects.length; i++) {
      var p = projects[i];
      var chips = Array.isArray(p.chips) ? p.chips : [];
      if (containsAnyChip(chips, sel)) out.push(p);
    }

    return out;
  }

  function containsAnyChip(projectChips, normalizedSelected) {
    var proj = normalizeArray(projectChips);

    for (var i = 0; i < normalizedSelected.length; i++) {
      if (proj.indexOf(normalizedSelected[i]) !== -1) return true;
    }
    return false;
  }

  function collectUniqueChips(projects) {
    var map = {}; // normalized -> label original

    for (var i = 0; i < projects.length; i++) {
      var chips = Array.isArray(projects[i].chips) ? projects[i].chips : [];
      for (var j = 0; j < chips.length; j++) {
        var c = String(chips[j]).trim();
        if (!c) continue;
        var key = normalizeText(c);
        if (!map[key]) map[key] = c;
      }
    }

    var keys = Object.keys(map).sort(function (a, b) {
      return a.localeCompare(b);
    });

    var out = [];
    for (var k = 0; k < keys.length; k++) out.push(map[keys[k]]);
    return out;
  }

  function normalizeArray(arr) {
    var out = [];
    for (var i = 0; i < arr.length; i++) out.push(normalizeText(arr[i]));
    return out;
  }

  function normalizeText(v) {
    return String(v || "").trim().toLowerCase();
  }

  /* =========================
     DATA HELPERS
  ========================= */
  function getMetaText(project, key) {
    if (!project || !project.meta) return "";
    var v = project.meta[key];
    if (v === null || v === undefined) return "";
    var s = String(v).trim();
    return s ? s : "";
  }

  function getUrl(project, key) {
    var url = getMetaText(project, key);
    if (!url) return "";
    if (!/^https?:\/\//i.test(url)) return "";
    return url;
  }

  /* =========================
     DOM HELPERS (no innerHTML)
  ========================= */
  function el(tag, opts) {
    var node = document.createElement(tag);
    if (opts) {
      if (opts.className) node.className = opts.className;
      if (opts.text !== undefined) node.textContent = opts.text;
    }
    return node;
  }

  function safeText(value, fallback) {
    if (value === null || value === undefined) return fallback || "";
    var s = String(value).trim();
    return s ? s : (fallback || "");
  }

  function clearNode(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }
})();
