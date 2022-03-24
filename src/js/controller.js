import ProductManager from './models/ProductManger.js';
import ProductManageView from './views/ProductManageView.js';

import { on } from './utils/event.js';

export default class Controller {
  constructor() {
    this.productManager = new ProductManager();
    this.productManageView = new ProductManageView();

    on(this.productManageView.$sectionContainer, '@submit', this.#handle.bind(this));
  }

  #handle(event) {
    const { keyword } = event.detail;
    this.productManager.addProduct(keyword);
  }
}
