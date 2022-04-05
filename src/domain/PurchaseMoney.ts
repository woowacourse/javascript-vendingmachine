import { ERROR_MESSAGE } from '../utils/constants';

interface PurchaseMoneyInterface {
  getMoney(): number;
  setMoney(value: number);
  addMoney(money: number): void;
}

export class PurchaseMoney implements PurchaseMoneyInterface {
  #value: number;

  constructor() {
    this.#value = JSON.parse(localStorage.getItem('purchaseMoney')) ?? 0;
  }

  getMoney() {
    return this.#value;
  }

  setMoney(value: number) {
    this.#value = value;

    localStorage.setItem('purchaseMoney', JSON.stringify(this.#value));
  }

  addMoney(money: number) {
    if (this.#isValidatedMoney(money)) {
      this.setMoney(this.#value + money);
    }
  }

  #isValidatedMoney(money: number): true | Error {
    if (money % 10 != 0) throw Error(ERROR_MESSAGE.INVALID_PURCHASE_MONEY);
    if (money + this.#value > 10_000) throw Error(ERROR_MESSAGE.OVER_PURCHASE_MONEY_LIMIT);

    return true;
  }
}
