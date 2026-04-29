/* =========================================================
   MODAL: PROJECT DETAIL (v4 - sin iconos, links al final)
   File: modal-project-detail.js
   ---------------------------------------------------------
   Estructura:
     [Hero Image]
     [HeaderRow (flex space-between)]
        Left:  Title
        Right: MetaInline -> "TYPE | YEAR |"
     [VersionRow]
        Left:  "V. x.x.x"
     [Description]
     [Chips]
     [LinksRow (flex) -> "Readme.md | https://www..."]
   ---------------------------------------------------------
   - Sin innerHTML
   - Links se crean desde JS
   - Los links solo aparecen si existe URL válida (http/https)
   ========================================================= */

(function () {
  if (!window.UIManager) {
    console.warn("UIManager no está disponible. Carga ui-manager.js antes.");
    return;
  }

  UIManager.register("projects.detail", function (ctx) {
    var project = ctx.payload && ctx.payload.project ? ctx.payload.project : null;

    ctx.setTitle("Project");
    ctx.setBody(buildProjectDetail(project));
  });

  function buildProjectDetail(project) {
    var root = el("div", { className: "pdRoot" });

    if (!project) {
      root.appendChild(el("p", { className: "pdEmpty", text: "No project data." }));
      return root;
    }

    /* =========================
       1) HERO IMAGE
    ========================= */
    if (project.image) {
      var hero = el("img", { className: "pdHero" });
      hero.src = project.image;
      hero.alt = safeText(project.title, "Project image");
      root.appendChild(hero);
    }

    /* =========================
       2) HEADER ROW
       - Title (left)
       - TYPE | YEAR | (right)
    ========================= */
    var headerRow = el("div", { className: "pdHeaderRow" });

    var titleWrap = el("div", { className: "pdTitleWrap" });
    titleWrap.appendChild(el("h4", { className: "pdTitle", text: safeText(project.title, "Untitled") }));

    var metaInline = el("div", { className: "pdMetaInline" });

    var typeText = getMetaText(project, "type"); // ej: "API"
    var yearText = safeText(project.year, "-");  // ej: "2025"

    metaInline.appendChild(el("span", { className: "pdTypeText", text: safeText(typeText, "-") }));
    metaInline.appendChild(el("span", { className: "pdSep", text: " | " }));
    metaInline.appendChild(el("span", { className: "pdYearText", text: yearText }));
    metaInline.appendChild(el("span", { className: "pdSep", text: " |" }));

    headerRow.appendChild(titleWrap);
    headerRow.appendChild(metaInline);
    root.appendChild(headerRow);

    /* =========================
       3) VERSION ROW
    ========================= */
    var versionText = getMetaText(project, "version");
    if (versionText) {
      var versionRow = el("div", { className: "pdVersionRow" });

      var left = el("div", { className: "pdVersionWrap" });
      left.appendChild(el("div", { className: "pdVersion", text: "V. " + versionText }));

      versionRow.appendChild(left);
      root.appendChild(versionRow);
    }

    /* =========================
       4) DESCRIPTION
    ========================= */
    var desc = getMetaText(project, "description");
    if (desc) {
      root.appendChild(el("p", { className: "pdDesc", text: desc }));
    }

    /* =========================
       5) CHIPS
    ========================= */
    var chipsArr = Array.isArray(project.chips) ? project.chips : [];
    if (chipsArr.length) {
      root.appendChild(buildChips(chipsArr));
    }

    /* =========================
       6) LINKS ROW (debajo de chips)
       - Readme.md (github url)
       - https://www... (web url)
       - flex para manipular como Type|Year
    ========================= */
    var linksRow = buildLinksRow(project);
    if (linksRow) {
      root.appendChild(linksRow);
    }

    return root;
  }

  /* =========================
     COMPONENTS
  ========================= */

  function buildChips(chipsArr) {
    var wrap = el("div", { className: "pdChips" });

    for (var i = 0; i < chipsArr.length; i++) {
      var t = String(chipsArr[i]).trim();
      if (!t) continue;
      wrap.appendChild(el("span", { className: "pdChip", text: t }));
    }

    return wrap;
  }

  function buildLinksRow(project) {
    var githubUrl = getUrl(project, "github");
    var webUrl = getUrl(project, "web");

    if (!githubUrl && !webUrl) return null;

    var row = el("div", { className: "pdLinksRow" });

    if (githubUrl) {
      row.appendChild(buildTextLink("README.md", githubUrl));
    }

    if (githubUrl && webUrl) {
      row.appendChild(el("span", { className: "pdLinkSep", text: " | " }));
    }

    if (webUrl) {
      row.appendChild(buildTextLink(shortUrl(webUrl), webUrl));
    }

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

    var prefix = url.slice(0, 12);
    return prefix + "...";
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
     DOM HELPERS (sin innerHTML)
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
})();
