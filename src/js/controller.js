import { SECTION_CONTAINER } from './constants/constants.js';
import { on } from './utils/event.js';
import { initHashContents } from './views/menuCategoryView.js';
import Coin from './models/Coin.js';
import ProductManager from './models/ProductManger.js';
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

  #renderSavedData(event) {
    const { hash } = event.detail;
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

  #handleProductInfo(event) {
    try {
      const { product } = event.detail;
      this.productManager.addProduct(product);
      this.productManageView.render(product);
      this.productManageView.resetProductInput();
    } catch (error) {
      alert(error.message);
    }
  }

  #modifySavedData(event) {
    const { index, product } = event.detail;
    this.productManager.modifyProduct(index, product);
  }

  #deleteSavedData(event) {
    const { index } = event.detail;
    this.productManager.deleteProduct(index);
  }

  #handleChargeCoin(event) {
    try {
      const { amount } = event.detail;
      this.coin.setAmount(amount);
      this.chargeView.renderCurrentAmount(this.coin.getAmount());
      this.chargeView.resetChargeInput();
      this.chargeView.renderHaveCoins(this.coin.getCoins());
    } catch (error) {
      alert(error.message);
    }
  }
}
