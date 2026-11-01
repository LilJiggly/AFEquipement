// ===============================
// MOBILE NAV TOGGLE
// ===============================
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

// ===============================
// LOAD PRODUCTS + CATEGORY FILTERING
// ===============================
const productGrid = document.getElementById("productGrid");
const tabButtons = document.querySelectorAll(".tab-button");
const categoryLinks = document.querySelectorAll(".nav-categories a");

let products = [];
let activeCategory = "all";

fetch("data/data.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    renderProducts();
  })
  .catch((error) => {
    console.error("Error loading product data:", error);
  });

function renderProducts() {
  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  productGrid.innerHTML = filtered
    .map(
      (product) => `
      <div class="product-card">
        <div class="product-card-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-card-body">
          <h3>${product.name}</h3>
          <p>${product.blurb}</p>
          <span class="product-card-price">$${product.price}</span>
        </div>
      </div>
    `
    )
    .join("");
}

function setActiveCategory(category) {
  activeCategory = category;

  tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.category === category);
  });

  renderProducts();
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveCategory(button.dataset.category));
});

categoryLinks.forEach((link) => {
  link.addEventListener("click", () => setActiveCategory(link.dataset.category));
});

// ===============================
// FOOTER YEAR
// ===============================
document.getElementById("year").textContent = new Date().getFullYear();
