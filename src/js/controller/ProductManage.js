import { SECTION_CONTAINER } from '../constants/constants.js';
import { on } from '../utils/event.js';
import { initHashContents } from '../views/menuCategoryView.js';
import Charge from './Charge.js';
import ProductPurchase from './ProductPurchase.js';
import ProductManagerModel from '../models/ProductManger.ts';
import CoinModel from '../models/Coin.ts';
import ProductManageView from '../views/ProductManageView.js';
import UserView from '../views/UserView.js';

export default class ProductManage {
  constructor() {
    this.productManagerModel = new ProductManagerModel();
    this.coinModel = new CoinModel();
    this.charge = new Charge(this.coinModel);
    this.productPurchase = new ProductPurchase(this.productManagerModel, this.coinModel);
    this.productManageView = new ProductManageView();
    this.userView = new UserView();

    on(SECTION_CONTAINER, '@render', this.#renderSavedProducts.bind(this));
    on(SECTION_CONTAINER, '@manage', this.#handleProductInfo.bind(this));
    on(SECTION_CONTAINER, '@modify', this.#modifyProduct.bind(this));
    on(SECTION_CONTAINER, '@delete', this.#deleteProduct.bind(this));
  }

  #renderSavedProducts(e) {
    const hash = e.detail.hash || '#!purchase';
    initHashContents(hash);
    const savedProductList = this.productManagerModel.getProducts();

    switch (hash) {
      case '#!manage':
        this.productManageView.initManageDOM();
        if (savedProductList.length !== 0) {
          this.productManageView.render(savedProductList);
        }
        break;
      case '#!charge':
        this.charge.initCharge();
        break;
      case '#!purchase':
        this.productPurchase.initPurchase();
        break;
      default:
    }
  }

  #handleProductInfo(e) {
    try {
      const { product } = e.detail;
      this.productManagerModel.addProduct(product);
      this.productManageView.render(product);
      this.productManageView.resetProductInput();
    } catch (error) {
      alert(error.message);
    }
  }

  #modifyProduct(e) {
    try {
      const { index, product } = e.detail;
      this.productManagerModel.modifyProduct(index, product);
      this.productManageView.renderModifiedProduct(index, product);
    } catch (error) {
      alert(error.message);
    }
  }

  #deleteProduct(e) {
    const { index } = e.detail;
    this.productManagerModel.deleteProduct(index);
  }
}
