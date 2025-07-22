import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = (getLocalStorage("so-cart") || []).filter(item => item != null);
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    this.showAddToCartMessage();
  }

  showAddToCartMessage() {
    alert("Product was added to cart!");
  }
  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.getElementById("brand").textContent = product.Brand?.Name || "";
  document.getElementById("name").textContent = product.NameWithoutBrand || "";

  const productImage = document.getElementById("image");
  productImage.src = product.Image || "";
  productImage.alt = product.NameWithoutBrand || "";

  document.getElementById("price").textContent = `$${product.FinalPrice?.toFixed(2)}` || "";
  document.getElementById("color").textContent = product.Colors?.[0]?.ColorName || "";
  document.getElementById("description").innerHTML = product.DescriptionHtmlSimple || "";

  document.getElementById("addToCart").dataset.id = product.Id;
}