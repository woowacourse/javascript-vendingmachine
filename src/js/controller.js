import ProductManager from './models/ProductManger.js';
import ProductManageView from './views/ProductManageView.js';
import { on } from './utils/event.js';

export default class Controller {
  constructor() {
    this.productManager = new ProductManager();
    this.productManageView = new ProductManageView();
    this.$sectionContainer = this.productManageView.$sectionContainer;

    on(this.$sectionContainer, '@submit', this.#handleProductInformation.bind(this));
    on(this.$sectionContainer, '@render', this.#renderSavedData.bind(this));
  }

  #renderSavedData(event) {
    const { hash } = event.detail;
    if (hash === '#!manage') {
      this.productManageView.initManageView();
      const savedProductList = this.productManager.getList();
      if (savedProductList.length !== 0) {
        this.productManageView.render(savedProductList);
      }
      return;
    }
  }

  #handleProductInformation(event) {
    const { keyword } = event.detail;
    this.productManager.addProduct(keyword);
    this.productManageView.render(keyword);
    this.productManageView.resetProductInput();
  }
}
