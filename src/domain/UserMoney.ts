import { ERROR_MESSAGE } from '../utils/constants';

interface UserMoneyInterface {
  getMoney(): number;
  setMoney(money: number): void;
  isValidatedMoney(money: number): true | Error;
}

export class UserMoney implements UserMoneyInterface {
  #value: number;

  constructor() {
    this.#value = 0;
  }

  getMoney() {
    return this.#value;
  }

  setMoney(money: number) {
    this.#value += money;
  }

  isValidatedMoney(money: number): true | Error {
    if (money % 10 != 0) throw Error(ERROR_MESSAGE.INVALID_USER_MONEY);
    if (money + this.#value > 10_000) throw Error(ERROR_MESSAGE.OVER_USER_MONEY_LIMIT);

    return true;
  }
}
