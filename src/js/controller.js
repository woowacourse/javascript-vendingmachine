import { SECTION_CONTAINER } from './constants/constants.js';
import { on } from './utils/event.js';
import { initHashContents } from './views/menuCategoryView.js';
import Coin from './models/Coin.ts';
import ProductManager from './models/ProductManger.ts';
import ChargeView from './views/ChargeView.js';
import ProductManageView from './views/ProductManageView.js';

export default class Controller {
  constructor() {
    this.productManager = new ProductManager();
    this.productManageView = new ProductManageView();
    this.chargeView = new ChargeView();
    this.coin = new Coin();

    on(SECTION_CONTAINER, '@render', this.#renderSavedData.bind(this));
    on(SECTION_CONTAINER, '@manage', this.#handleProductInfo.bind(this));
    on(SECTION_CONTAINER, '@modify', this.#modifySavedData.bind(this));
    on(SECTION_CONTAINER, '@delete', this.#deleteSavedData.bind(this));
    on(SECTION_CONTAINER, '@charge', this.#handleChargeCoin.bind(this));
  }

  #renderSavedData(e) {
    const { hash } = e.detail;
    initHashContents(hash);

    if (hash === '#!manage') {
      this.productManageView.initManageDOM();
      const savedProductList = this.productManager.getProducts();
      if (savedProductList.length !== 0) {
        this.productManageView.render(savedProductList);
      }
      return;
    }
    if (hash === '#!charge') {
      this.chargeView.initChargeDOM();
      this.chargeView.renderCurrentAmount(this.coin.getAmount());
      this.chargeView.renderHaveCoins(this.coin.getCoins());
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

  #handleChargeCoin(e) {
    try {
      const { amount } = e.detail;
      this.coin.setAmount(amount);
      this.chargeView.renderCurrentAmount(this.coin.getAmount());
      this.chargeView.resetChargeInput();
      this.chargeView.renderHaveCoins(this.coin.getCoins());
    } catch (error) {
      alert(error.message);
    }
  }
}
