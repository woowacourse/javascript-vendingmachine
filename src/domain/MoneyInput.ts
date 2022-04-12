class MoneyInput {
  private amount: number;

  constructor(amount) {
    this.amount = amount;
  }

  addMoney(money: number) {
    this.amount += money;
  }

  subtractMoney(money: number) {
    this.amount -= money;
  }

  getAmount() {
    return this.amount;
  }
}

export default MoneyInput;
