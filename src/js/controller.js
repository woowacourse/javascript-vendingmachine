import ProductManager from './models/ProductManger.js';
import ProductManageView from './views/ProductManageView.js';

import { on } from './utils/event.js';

export default class Controller {
  constructor() {
    this.productManager = new ProductManager();
    this.productManageView = new ProductManageView();
    this.$sectionContainer = this.productManageView.$sectionContainer;

    on(this.$sectionContainer, '@submit', this.#handleProductInformation.bind(this));
    on(this.$sectionContainer, '@init', this.#initRender.bind(this));
  }

  #initRender() {
    const saved = this.productManager.getList();
    if (saved) {
      this.productManageView.render(saved);
    }
  }

  #handleProductInformation(event) {
    const { keyword } = event.detail;
    this.productManager.addProduct(keyword);
    this.productManageView.renderTable(keyword);
    this.productManageView.resetProductInput();
  }
}
