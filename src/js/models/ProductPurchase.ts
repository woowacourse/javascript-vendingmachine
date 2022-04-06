import { ProductPurchaseInterface } from '../interface/productPurchase.interface';
import { validAmount } from './validation';

export default class ProductPurchase implements ProductPurchaseInterface {
  #userAmount: number;

  constructor() {
    this.#userAmount = 0;
  }

  addUserAmount(currentUserAmount: number): void {
    const totalUserAmount = this.#userAmount + currentUserAmount;
    if (!validAmount(currentUserAmount, totalUserAmount)) return;
    this.#userAmount = totalUserAmount;
  }

  getUserAmount(): number {
    return this.#userAmount;
  }

  spendAmount(price: number): number {
    this.#userAmount -= price;
    return this.#userAmount;
  }

  setUserAmount(currentAmount: number): void {
    this.#userAmount = currentAmount;
  }
}
