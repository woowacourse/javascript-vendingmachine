interface UserMoneyInterface {
  getMoney(): number;
  setMoney(money: number): void;
  // validateMoney(money: number): true | Error;
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
    if (money) {
      this.#value += money;

      return;
    }

    this.#value = money;
  }
}
