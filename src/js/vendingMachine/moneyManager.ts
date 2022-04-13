export default class MoneyManager {
  private _money = 0;

  get money() {
    return this._money;
  }

  chargeMoney(money: number) {
    this._money += money;
  }

  deductMoney(money: number) {
    this._money -= money;
  }
}
