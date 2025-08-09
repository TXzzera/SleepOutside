import { loadHeaderFooter, setupNewsletterForm } from "./utils.mjs";

async function init() {
  await loadHeaderFooter();

  
  setTimeout(() => {
    setupNewsletterForm();
  }, 5000);
}

init();
