import { loadHeaderFooter } from "./utils.mjs";

async function init() {
  await loadHeaderFooter();

  const container = document.querySelector(".header-container");
  if (container) {
    const cart = container.querySelector(".cart");

    const form = document.createElement("form");
    form.id = "search-form";
    form.className = "search-form";
    form.innerHTML = `
      <input type="text" id="search-input" placeholder="Search product..." />
      <button type="submit">Search</button>
    `;

    container.insertBefore(form, cart);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = document.querySelector("#search-input").value.trim();
      if (query) {
        window.location.href = `product-listing.html?search=${encodeURIComponent(query)}`;
      }
    });
  } else {
    // eslint-disable-next-line no-console
    console.log("Header container not found");
  }
}

init();
