export default class MoneyManagement {
  #money = 0;

  get money() {
    return this.#money;
  }

  addMoney(money) {
    this.#money += money;
  }

  subtractMoney(money) {
    this.#money -= money;
  }
}
