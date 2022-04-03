import { ERROR_MESSAGE } from '../utils/constants';

interface PurchaseMoneyInterface {
  getMoney(): number;
  setMoney(value: number);
  addMoney(money: number): void;
  isValidatedMoney(money: number): true | Error;
}

export class PurchaseMoney implements PurchaseMoneyInterface {
  #value: number;

  constructor() {
    this.setMoney(0);
  }

  getMoney() {
    return this.#value;
  }

  setMoney(value: number) {
    this.#value = value;
  }

  addMoney(money: number) {
    this.#value += money;
  }

  isValidatedMoney(money: number): true | Error {
    if (money % 10 != 0) throw Error(ERROR_MESSAGE.INVALID_PURCHASE_MONEY);
    if (money + this.#value > 10_000) throw Error(ERROR_MESSAGE.OVER_PURCHASE_MONEY_LIMIT);

    return true;
  }
}
