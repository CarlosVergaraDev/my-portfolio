// skills.js

/* =========================
   1) DATA (solo datos)
========================= */

const SKILLS_DATA = {
  primary: {
    key: "devops",
    label: "DevOps & Tools",
    chips: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Prometheus", "Grafana", "Nginx", "Helm"],
  },
  extraGroups: [
    {
      key: "fullstack",
      label: "Full Stack",
      chips: [
        "HTML", "CSS", "JavaScript",
        "Docker", "Kubernetes", "AWS", "CI/CD", "Terraform",
        "Prometheus", "Grafana", "Nginx", "Helm",
      ],
    },
  ],
};

/* =========================
   2) HELPERS (creadores de UI)
========================= */

function el(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

function buildSectionTitle() {
  const h2 = el("h2");
  h2.setAttribute("data-i18n", "skills.title");
  // texto inicial por si updateContent aún no corre
  h2.textContent = i18next.t("skills.title");
  return h2;
}

function buildChip(name) {
  const chip = el("div", "chip");
  chip.textContent = name;
  return chip;
}

function buildCategory(category) {
  const section = el("section", "skillCategory");
  section.dataset.key = category.key;

  const label = el("p", "skillCategory__label");
  label.textContent = category.label; // (labels aquí están fijos, si quieres también los traducimos)

  const chipsWrap = el("div", "chipWrap");
  category.chips.forEach((chipName) => chipsWrap.appendChild(buildChip(chipName)));

  section.appendChild(label);
  section.appendChild(chipsWrap);
  return section;
}

function buildCtaLink(i18nKey, extraClass) {
  const wrap = el("p", "skillCategory__moreWrap");

  const link = el("a", `skillCategory__more ${extraClass}`);
  link.href = "#";

  // 🔥 i18n aquí (esto es lo que buscabas)
  link.setAttribute("data-i18n", i18nKey);
  link.textContent = i18next.t(i18nKey);

  wrap.appendChild(link);
  return { wrap, link };
}

/* =========================
   3) ACCORDION (lógica simple)
========================= */

function openAccordion(accordion, moreWrap) {
  moreWrap.style.display = "none";
  accordion.classList.add("is-open");
  accordion.style.maxHeight = accordion.scrollHeight + "px";
}

function closeAccordion(accordion, moreWrap) {
  accordion.style.maxHeight = accordion.scrollHeight + "px";

  requestAnimationFrame(() => {
    accordion.style.maxHeight = "0px";
  });

  const onEnd = (e) => {
    if (e.propertyName !== "max-height") return;
    accordion.classList.remove("is-open");
    moreWrap.style.display = "flex";
    accordion.removeEventListener("transitionend", onEnd);
  };

  accordion.addEventListener("transitionend", onEnd);
}

/* =========================
   4) RENDER (pinta todo)
========================= */

function renderSkills() {
  const container = document.getElementById("skills");
  if (!container) return;

  container.innerHTML = "";

  // Título
  container.appendChild(buildSectionTitle());

  // Categoría principal
  container.appendChild(buildCategory(SKILLS_DATA.primary));

  // Si no hay extras, terminamos
  if (!SKILLS_DATA.extraGroups.length) {
    window.updateContent?.(); // traduce lo que tenga data-i18n
    return;
  }

  // CTA "Ver más"
  const { wrap: moreWrap, link: moreLink } = buildCtaLink("skills.cta.more", "is-more");
  container.appendChild(moreWrap);

  // Acordeón
  const accordion = el("div", "skillsAccordion");
  accordion.style.maxHeight = "0px";

  SKILLS_DATA.extraGroups.forEach((group) => {
    accordion.appendChild(buildCategory(group));
  });

  // CTA "Ver menos"
  const { wrap: lessWrap, link: lessLink } = buildCtaLink("skills.cta.less", "is-less");
  accordion.appendChild(lessWrap);

  container.appendChild(accordion);

  // Eventos
  moreLink.addEventListener("click", (e) => {
    e.preventDefault();
    openAccordion(accordion, moreWrap);
  });

  lessLink.addEventListener("click", (e) => {
    e.preventDefault();
    closeAccordion(accordion, moreWrap);
  });

  // Recalcular altura si está abierto y cambia el tamaño
  window.addEventListener("resize", () => {
    if (accordion.classList.contains("is-open")) {
      accordion.style.maxHeight = accordion.scrollHeight + "px";
    }
  });

  // ✅ Muy importante: aplica traducciones a lo recién creado
  window.updateContent?.();
}

/* =========================
   5) INIT + re-render al cambiar idioma
========================= */

renderSkills();

