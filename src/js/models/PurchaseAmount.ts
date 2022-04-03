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

  addAmount(inputAmount: number): void {}

  deductAmount(productPrice: number) {}
}
