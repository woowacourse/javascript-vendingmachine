export default class PurchaseManager {
  private userInputMoney = 0;

  addMoney(money) {
    this.userInputMoney += money;
  }

  getMoney() {
    return this.userInputMoney;
  }

  spendMoney(money) {
    this.userInputMoney -= money;
  }

  reset() {
    this.userInputMoney = 0;
  }
}
