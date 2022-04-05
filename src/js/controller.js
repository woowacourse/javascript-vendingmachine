import { SECTION_CONTAINER, SNACKBAR_MESSAGE } from './constants/constants.js';
import { on } from './utils/event.js';
import { handleSnackbarMessage } from './utils/snackbar.js';
import Coin from './models/Coin.ts';
import ProductManager from './models/ProductManger.ts';
import ProductPurchase from './models/ProductPurchase.ts';
import { initHashContents } from './views/menuCategoryView.js';
import ChargeView from './views/ChargeView.js';
import ProductManageView from './views/ProductManageView.js';
import ProductPurchaseView from './views/ProductPurchaseView.js';

class Controller {
  constructor() {
    this.coin = new Coin();
    this.productManager = new ProductManager();
    this.productPurchase = new ProductPurchase();
    this.chargeView = new ChargeView();
    this.productManageView = new ProductManageView();
    this.productPurchaseView = new ProductPurchaseView();

    on(SECTION_CONTAINER, [
      ['@render', this.#renderSavedData],
      ['@manage', this.#handleProductInfo],
      ['@modify', this.#modifySavedData],
      ['@delete', this.#deleteSavedData],
      ['@charge', this.#handleChargeCoin],
      ['@amount', this.#handleAmount],
      ['@purchase', this.#purchaseSelectedProduct],
      ['@return', this.#handleReturnCoin],
    ]);
  }

  #renderSavedData = (e) => {
    const { hash } = e.detail;
    initHashContents(hash);
    switch (hash) {
      case '#!manage':
        this.productManageView.initManageDOM();
        this.productManageView.render(this.productManager.getProducts());
        break;
      case '#!charge':
        this.chargeView.initChargeDOM();
        this.chargeView.renderCurrentAmount(this.coin.getAmount());
        this.chargeView.renderHaveCoins(this.coin.getCoins());
        break;
      case '#!purchase':
        this.productPurchaseView.initPurchaseDOM();
        this.productPurchaseView.renderAmount(this.productPurchase.getUserAmount());
        this.productPurchaseView.render(this.productManager.getProducts());
    }
  };

  #handleProductInfo = (e) => {
    const { product } = e.detail;
    this.productManager.addProduct(product);
    this.productManageView.render(product);
    this.productManageView.resetProductInput();
    handleSnackbarMessage(SNACKBAR_MESSAGE.ADD_PRODUCT);
  };

  #modifySavedData = (e) => {
    const { index, product } = e.detail;
    this.productManager.modifyProduct(index, product);
    this.productManageView.renderModifiedProduct(index, product);
    handleSnackbarMessage(SNACKBAR_MESSAGE.MODIFY_PRODUCT);
  };

  #deleteSavedData = (e) => {
    const { index } = e.detail;
    this.productManager.deleteProduct(index);
    handleSnackbarMessage(SNACKBAR_MESSAGE.DELETE_PRODUCT);
  };

  #handleChargeCoin = (e) => {
    const { amount } = e.detail;
    this.coin.addAmount(amount);
    this.chargeView.renderCurrentAmount(this.coin.getAmount());
    this.chargeView.resetChargeInput();
    this.chargeView.renderHaveCoins(this.coin.getCoins());
    handleSnackbarMessage(SNACKBAR_MESSAGE.CHARGE_AMOUNT);
  };

  #handleAmount = (e) => {
    const { userAmount } = e.detail;
    this.productPurchase.addUserAmount(userAmount);
    this.productPurchaseView.renderAmount(this.productPurchase.getUserAmount());
    this.productPurchaseView.resetAmountInput();
    handleSnackbarMessage(SNACKBAR_MESSAGE.CHARGE_USER_AMOUNT);
  };

  #purchaseSelectedProduct = (e) => {
    const { index } = e.detail;
    const price = this.productManager.purchaseProduct(index, this.productPurchase.getUserAmount());
    const userAmount = this.productPurchase.spendAmount(price);
    this.productPurchaseView.renderAmount(userAmount);
    this.productPurchaseView.renderModifiedProductInfo(index);
    handleSnackbarMessage(SNACKBAR_MESSAGE.PURCHASE_PRODUCT);
  };

  #handleReturnCoin = (e) => {
    const result = this.coin.returnCoin(this.productPurchase.getUserAmount());
    const remainCoins = result[0];
    const currentAmount = result[1];
    this.productPurchase.setUserAmount(currentAmount);
    this.productPurchaseView.renderAmount(currentAmount);
    this.productPurchaseView.renderHaveCoins(remainCoins);
    handleSnackbarMessage(SNACKBAR_MESSAGE.RETURN_AMOUNT);
  };
}

const controller = new Controller();
