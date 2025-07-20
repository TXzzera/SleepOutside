import { getLocalStorage, setLocalStorage } from "./utils.mjs"; 

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = null;
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    if (!this.product) {
      document.querySelector(".product-detail").innerHTML = "<p>Product was not found.</p>";
      return;
    }

    this.renderProductDetails();

    document.getElementById("addToCart").addEventListener("click", this.addProductToCart.bind(this));
  }

  renderProductDetails() {
    document.getElementById("brandName").textContent = this.product.Brand.Name;
    document.getElementById("productName").textContent = this.product.NameWithoutBrand;
    document.getElementById("productImage").src = this.product.Image;
    document.getElementById("productImage").alt = this.product.Name;
    document.getElementById("productPrice").textContent = `$${this.product.FinalPrice}`;
    document.getElementById("productColor").textContent = this.product.Colors[0].ColorName;
    document.getElementById("productDescription").textContent = this.product.Description;

    document.getElementById("addToCart").dataset.id = this.product.Id;
  }

  addProductToCart() {
    let cart = JSON.parse(getLocalStorage("so-cart")) || [];
    cart.push(this.product);
    setLocalStorage("so-cart", JSON.stringify(cart));
    alert(`${this.product.NameWithoutBrand} added to cart!`);
  }
}
