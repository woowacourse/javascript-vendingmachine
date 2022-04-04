import { PurchaseMoneyInputForm } from '../component/PurchaseMoneyInputForm';

import { PurchaseMoney } from '../domain/PurchaseMoney';

interface ProductPurchaseViewInterface {
  getIsRendered();
  setIsRendered(status: boolean);
  show();
  renderAll();
}

export class ProductPurchaseView implements ProductPurchaseViewInterface {
  #productPurchaseContainer: HTMLDivElement;
  #purchaseMoneyInputForm: PurchaseMoneyInputForm;
  #purchaseMoney: PurchaseMoney;
  #isRendered: boolean;

  constructor() {
    this.#isRendered = false;
    this.#productPurchaseContainer = document.querySelector('#product-purchase-container');

    this.#purchaseMoney = new PurchaseMoney();
    this.#purchaseMoneyInputForm = new PurchaseMoneyInputForm({
      target: this.#productPurchaseContainer,
      purchaseMoney: this.#purchaseMoney,
    });
  }

  getIsRendered() {
    return this.#isRendered;
  }

  setIsRendered(status: boolean) {
    this.#isRendered = status;
  }

  show() {
    this.#productPurchaseContainer.classList.remove('hide');
  }

  hide() {
    this.#productPurchaseContainer.classList.add('hide');
  }

  renderAll() {
    this.#purchaseMoneyInputForm.render();
  }
}
