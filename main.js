const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open", !expanded);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    });
  });
}

const currentPath = window.location.pathname.replace(/index\.html$/, "");
document.querySelectorAll(".site-nav a").forEach((link) => {
  const href = link.getAttribute("href");
  if (!href) return;
  if (href === "/" && currentPath === "/") {
    link.setAttribute("aria-current", "page");
    return;
  }
  if (href !== "/" && currentPath.startsWith(href)) {
    link.setAttribute("aria-current", "page");
  }
});

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const galleryItems = Array.isArray(window.GALLERY_ITEMS) ? window.GALLERY_ITEMS : [];

function createGalleryCard(item, light = false) {
  const card = document.createElement("article");
  card.className = `gallery-card${light ? " gallery-card--light" : ""}`;
  card.innerHTML = `
    <img class="gallery-card__image" src="/${item.src}" alt="${item.alt}" loading="lazy">
    <div class="gallery-card__body">
      <span class="gallery-card__meta">${item.category}</span>
      <h3 class="gallery-card__title">${item.title}</h3>
      <p class="gallery-card__copy">${item.description}</p>
      <p class="gallery-card__location">${item.location}</p>
    </div>
  `;
  return card;
}

const featuredGrid = document.querySelector('[data-gallery="featured"]');
if (featuredGrid) {
  galleryItems
    .filter((item) => item.featured)
    .slice(0, 6)
    .forEach((item) => featuredGrid.appendChild(createGalleryCard(item)));
}

const fullGrid = document.querySelector('[data-gallery="full"]');
const filterButtons = document.querySelectorAll("[data-filter]");

function renderFullGallery(filter = "All") {
  if (!fullGrid) return;
  fullGrid.innerHTML = "";
  const filteredItems = galleryItems.filter((item) => filter === "All" || item.category === filter);

  if (!filteredItems.length) {
    const emptyState = document.createElement("p");
    emptyState.className = "empty-state";
    emptyState.textContent = "No projects match that filter yet.";
    fullGrid.appendChild(emptyState);
    return;
  }

  filteredItems.forEach((item) => fullGrid.appendChild(createGalleryCard(item, true)));
}

if (fullGrid) {
  renderFullGallery();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter || "All";
    filterButtons.forEach((node) => node.classList.toggle("is-active", node === button));
    renderFullGallery(selected);
  });
});
