/* =========================================================
   MODAL: ACADEMY (v1)
   - Usa CSS existente
   - Sin innerHTML
   - SVG inline real
========================================================= */

(function () {

  if (!window.UIManager) return;

  /* =========================
     REGISTER
  ========================= */

  UIManager.register("academy.all", function (ctx) {
    var items = Array.isArray(ctx.payload) ? ctx.payload : [];

    ctx.setTitle("Academy");
    ctx.setBody(buildView(items));
  });

  /* =========================
     VIEW
  ========================= */

  function buildView(items) {
    var root = el("div", "acRoot");

    if (!items.length) {
      var p = document.createElement("p");
      p.className = "acEmpty";
      p.textContent = "No academy data.";
      root.appendChild(p);
      return root;
    }

    items.forEach(function (item) {
      root.appendChild(buildCard(item));
    });

    return root;
  }

  /* =========================
     CARD
  ========================= */

  function buildCard(item) {

    var card = el("div", "acCard");

    /* Hero */
    if (item.meta && item.meta.imageGral) {
      var hero = el("img", "acHero");
      hero.src = item.meta.imageGral;
      hero.alt = item.name || "academy image";
      card.appendChild(hero);
    }

    /* Header */
    var header = el("div", "acHeader");

    var avatarWrap = el("div", "acAvatarWrap");
    var avatar = el("img", "acAvatar");
    avatar.src = item.image || "";
    avatar.alt = item.name || "";
    avatarWrap.appendChild(avatar);

    var titleWrap = el("div", "acTitleWrap");

    var title = el("div", "acTitle");
    title.textContent = item.name || "Untitled";

    var year = el("div", "acYear");
    year.textContent = item.year || "-";

    titleWrap.appendChild(title);
    titleWrap.appendChild(year);

    header.appendChild(avatarWrap);
    header.appendChild(titleWrap);
    card.appendChild(header);

    /* Meta */
    var metaRow = el("div", "acMetaRow");

    appendMeta(metaRow, item.meta?.tipoEstudio);
    appendMeta(metaRow, item.meta?.instituto);
    appendMeta(metaRow, item.meta?.categoria);

    card.appendChild(metaRow);

    /* Download button (solo icono) */
    if (item.downloadUrl) {

      var btn = el("a", "acDownloadBtn");
      btn.href = item.downloadUrl;
      btn.target = "_blank";
      btn.rel = "noopener";

      btn.appendChild(buildDownloadSVG());

      card.appendChild(btn);
    }

    return card;
  }

  /* =========================
     SVG
  ========================= */

  function buildDownloadSVG() {

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    svg.setAttribute("viewBox", "0 -960 960 960");
    svg.setAttribute("width", "22");
    svg.setAttribute("height", "22");
    svg.setAttribute("fill", "currentColor");

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    path.setAttribute("d",
      "M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"
    );

    svg.appendChild(path);
    return svg;
  }

  /* =========================
     HELPERS
  ========================= */

  function appendMeta(parent, value) {
    if (!value) return;

    if (parent.children.length) {
      var sep = document.createElement("span");
      sep.className = "acSep";
      sep.textContent = " | ";
      parent.appendChild(sep);
    }

    var span = document.createElement("span");
    span.className = "acMeta";
    span.textContent = value;
    parent.appendChild(span);
  }

  function el(tag, className) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    return n;
  }

})();
