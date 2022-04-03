class MoneyInput {
  amount: number;

  constructor(amount) {
    this.amount = amount;
  }

  addMoney(money: number) {
    this.amount += Number(money);
  }

  subtractMoney(money: number) {
    this.amount -= Number(money);
  }

  getAmount() {
    return Number(this.amount);
  }
}

export default MoneyInput;
