import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/?product=${product.Id}">
        <img src="${product.Image.PrimaryMedium}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement, searchTerm = "") {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.searchTerm = searchTerm.toLowerCase();
  }

  async init() {
    let list = await this.dataSource.getData(this.category);

    // Se tiver termo de busca, filtra aqui sem mudar o fluxo de renderização
    if (this.searchTerm) {
      list = list.filter(product =>
        product.Name.toLowerCase().includes(this.searchTerm) ||
        product.Brand.Name.toLowerCase().includes(this.searchTerm)
      );
    }

    this.renderList(list);
    document.querySelector(".title").textContent = this.category;
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}
