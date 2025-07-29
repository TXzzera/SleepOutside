import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();

loadHeaderFooter().then(() => {
  productList.render();
}).catch((error) => {
  console.error("Error loading header and footer:", error);
});
