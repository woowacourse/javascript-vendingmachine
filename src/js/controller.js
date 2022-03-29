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

    on(SECTION_CONTAINER, [
      ['@render', this.#renderSavedData],
      ['@manage', this.#handleProductInfo],
      ['@modify', this.#modifySavedData],
      ['@delete', this.#deleteSavedData],
      ['@charge', this.#handleChargeCoin],
    ]);
  }

  #renderSavedData = (e) => {
    const { hash } = e.detail;
    initHashContents(hash);
    switch (hash) {
      case '#!manage':
        this.productManageView.initManageDOM();
        const savedProductList = this.productManager.getProducts();
        if (savedProductList.length !== 0) {
          this.productManageView.render(savedProductList);
        }
        break;
      case '#!charge':
        this.chargeView.initChargeDOM();
        this.chargeView.renderCurrentAmount(this.coin.getAmount());
        this.chargeView.renderHaveCoins(this.coin.getCoins());
    }
  };

  #handleProductInfo = (e) => {
    const { product } = e.detail;
    this.productManager.addProduct(product);
    this.productManageView.render(product);
    this.productManageView.resetProductInput();
  };

  #modifySavedData = (e) => {
    const { index, product } = e.detail;
    this.productManager.modifyProduct(index, product);
    this.productManageView.renderModifiedProduct(index, product);
  };

  #deleteSavedData = (e) => {
    const { index } = e.detail;
    this.productManager.deleteProduct(index);
  };

  #handleChargeCoin = (e) => {
    const { amount } = e.detail;
    this.coin.addAmount(amount);
    this.chargeView.renderCurrentAmount(this.coin.getAmount());
    this.chargeView.resetChargeInput();
    this.chargeView.renderHaveCoins(this.coin.getCoins());
  };
}
