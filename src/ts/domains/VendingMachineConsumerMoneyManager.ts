interface ConsumerMoneyManager {
  addConsumerChargeMoney(money: number): void;
  subtractConsumerChargeMoney(subtractMoney: number): void;
  getConsumerChargeMoney(): number;
}

export default class VendingMachineConsumerMoneyManager
  implements ConsumerMoneyManager
{
  private consumerChargeMoney = 0;

  addConsumerChargeMoney(money: number): void {
    this.consumerChargeMoney += money;
  }

  subtractConsumerChargeMoney(subtractMoney: number): void {
    this.consumerChargeMoney -= subtractMoney;
  }

  getConsumerChargeMoney(): number {
    return this.consumerChargeMoney;
  }
}
