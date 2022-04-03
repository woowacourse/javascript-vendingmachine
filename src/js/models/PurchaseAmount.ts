import { validPurchaseAmount } from '../utils/validation.js';

interface PurchaseAmountInterface {
  setAmount: (amount: number) => void;
  getAmount: () => number;
  addAmount: (inputAmount: number) => void;
  deductAmount: (productPrice: number) => void;
}

export default class PurchaseAmount implements PurchaseAmountInterface {
  #amount: number;

  constructor() {
    this.#amount = 0;
  }

  setAmount(amount: number): void {
    this.#amount = amount;
  }

  getAmount(): number {
    return this.#amount;
  }

  addAmount(inputAmount: number): void {
    const addedAmount = this.#amount + inputAmount;
    this.setAmount(addedAmount);
  }

  deductAmount(productPrice: number) {
    const deductedAmount = this.#amount - productPrice;
    this.setAmount(deductedAmount);
  }
}
