import { PurchaseMoneyInputForm } from '../component/PurchaseMoneyInputForm';

interface ProductPurchaseViewInterface {
  init();
  renderAll();
}

export class ProductPurchaseView implements ProductPurchaseViewInterface {
  #contentsContainer: HTMLDivElement;
  #purchaseMoneyInputForm: PurchaseMoneyInputForm;

  constructor() {
    this.#contentsContainer = document.querySelector('#contents-container');
  }

  init() {
    this.#contentsContainer.textContent = '';

    this.#purchaseMoneyInputForm = new PurchaseMoneyInputForm(this.#contentsContainer);
  }

  renderAll() {
    this.#contentsContainer.textContent = '';

    this.#purchaseMoneyInputForm.render();
  }
}
