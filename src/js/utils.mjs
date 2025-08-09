export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const value = urlParams.get(param);
  return value;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}
async function loadTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Failed to load template at ${path}`);
  }
  const template = await res.text();
  return template;
}
export async function loadHeaderFooter() {
  const basePublicPath = import.meta.env.VITE_BASE_PUBLIC_PATH || "/";

  const headerTemplate = await loadTemplate(`${basePublicPath}partials/header.html`);
  const footerTemplate = await loadTemplate(`${basePublicPath}partials/footer.html`);

  const headerElement = document.querySelector("#header-template");
  const footerElement = document.querySelector("#footer-template");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}
export function setupNewsletterForm() {
  const newsletterForm = document.getElementById("newsletter-form");
  const message = document.getElementById("message");

  if (!newsletterForm || !message) {
    console.warn("Newsletter form or message element not found");
    return;
  }

  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = newsletterForm.name.value.trim();
    const email = newsletterForm.email.value.trim();

    if (name && email) {
      message.textContent = `Thank you, ${name}! You have successfully subscribed to our newsletter.`;
      message.classList.remove("error");
      newsletterForm.reset();
    } else {
      message.textContent = "Please fill out both fields.";
      message.classList.add("error");
    }
  });
}


export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });

  const main = document.querySelector("main");
  main.prepend(alert);

  if (scroll) window.scrollTo(0, 0);
  setTimeout(() => main.removeChild(alert), duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  const main = document.querySelector("main");
  alerts.forEach((alert) => main.removeChild(alert));
}
