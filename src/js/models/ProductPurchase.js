import { validAmount } from './validation';

export default class ProductPurchase {
  #userAmount;

  constructor() {
    this.#userAmount = 0;
  }

  addUserAmount(currentUserAmount) {
    const totalUserAmount = this.#userAmount + currentUserAmount;
    if (!validAmount(currentUserAmount, totalUserAmount)) return;
    this.#userAmount = totalUserAmount;
  }

  getUserAmount() {
    return this.#userAmount;
  }

  spendAmount(price) {
    this.#userAmount -= price;
    return this.#userAmount;
  }

  setUserAmount(currentAmount) {
    this.#userAmount = currentAmount;
  }
}
