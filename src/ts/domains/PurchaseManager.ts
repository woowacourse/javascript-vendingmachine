export default class PurchaseManager {
  private userInputMoney = 0;

  addMoney(money: number) {
    this.userInputMoney += money;
  }

  getMoney() {
    return this.userInputMoney;
  }

  spendMoney(money: number) {
    this.userInputMoney -= money;
  }

  reset() {
    this.userInputMoney = 0;
  }
}
