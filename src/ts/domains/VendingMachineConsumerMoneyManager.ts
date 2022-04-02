interface ConsumerMoneyManager {
  addConsumerChargeMoney(money: number): void;
  subtractConsumerChargeMoney(subtractMoney: number): void;
  getConsumerChargeMoney(): number;
}

export const checkValidConsumerChargeMoney = (money: number): void => {
  if (Number.isNaN(money)) {
    throw new Error(
      '충전 금액을 잘못 입력하셨습니다. 충전 금액은 최소 10원 이상 10000원 이하로 입력해주세요.'
    );
  }

  if (money <= 10 || money >= 10000) {
    throw new Error(
      '충전 금액을 잘못 입력하셨습니다. 충전 금액은 최소 10원 이상 10000원 이하로 입력해주세요.'
    );
  }

  if (money % 10 !== 0) {
    throw new Error(
      '충전 금액을 잘못 입력하셨습니다. 충전 금액은 10원 단위로 입력해주세요.'
    );
  }
};

export const checkConsumerChargeMoneyLessThenPurchaseMoney = (
  consumerChargeMoney: number,
  productPrice: number
): void => {
  if (consumerChargeMoney < productPrice) {
    throw new Error('');
  }
};

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
