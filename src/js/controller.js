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
    on(this.$sectionContainer, '@modify', this.#modifySavedData.bind(this));
    on(this.$sectionContainer, '@delete', this.#deleteSavedData.bind(this));
  }

  #renderSavedData(event) {
    const { hash } = event.detail;
    if (hash === '#!manage') {
      this.productManageView.initManageView();
      const savedProductList = this.productManager.getProducts();
      if (savedProductList.length !== 0) {
        this.productManageView.render(savedProductList);
      }
      return;
    }
  }

  #handleProductInformation(event) {
    const { product } = event.detail;
    this.productManager.addProduct(product);
    this.productManageView.render(product);
    this.productManageView.resetProductInput();
  }

  #modifySavedData(event) {
    const { index, product } = event.detail;
    this.productManager.modifyProduct(index, product);
  }

  #deleteSavedData(event) {
    const { index } = event.detail;
    this.productManager.deleteProduct(index);
  }
}
