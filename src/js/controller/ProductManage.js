import { SECTION_CONTAINER } from '../constants/constants.js';
import { on } from '../utils/event.js';
import { initHashContents } from '../views/menuCategoryView.js';
import Charge from './Charge.js';
import ProductManager from '../models/ProductManger.ts';
import ProductManageView from '../views/ProductManageView.js';

export default class ProductManage {
  constructor() {
    this.productManager = new ProductManager();
    this.productManageView = new ProductManageView();
    this.charge = new Charge();

    on(SECTION_CONTAINER, '@render', this.#renderSavedData.bind(this));
    on(SECTION_CONTAINER, '@manage', this.#handleProductInfo.bind(this));
    on(SECTION_CONTAINER, '@modify', this.#modifySavedData.bind(this));
    on(SECTION_CONTAINER, '@delete', this.#deleteSavedData.bind(this));
  }

  #renderSavedData(e) {
    const { hash } = e.detail;
    initHashContents(hash);

    switch (hash) {
      case '#!manage':
        this.productManageView.initManageDOM();
        // eslint-disable-next-line no-case-declarations
        const savedProductList = this.productManager.getProducts();
        if (savedProductList.length !== 0) {
          this.productManageView.render(savedProductList);
        }
        break;
      case '#!charge':
        this.charge.initCharge();
        break;
      default:
    }
  }

  #handleProductInfo(e) {
    try {
      const { product } = e.detail;
      this.productManager.addProduct(product);
      this.productManageView.render(product);
      this.productManageView.resetProductInput();
    } catch (error) {
      alert(error.message);
    }
  }

  #modifySavedData(e) {
    try {
      const { index, product } = e.detail;
      this.productManager.modifyProduct(index, product);
      this.productManageView.renderModifiedProduct(index, product);
    } catch (error) {
      alert(error.message);
    }
  }

  #deleteSavedData(e) {
    const { index } = e.detail;
    this.productManager.deleteProduct(index);
  }
}
