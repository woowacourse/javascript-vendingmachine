interface PurchaseManager {
  addPurchaseMoney(money: number): void;
  subtractPurchaseMoney(subtractMoney: number): void;
  getPurchaseMoney(): number;
}

export const checkValidPurchaseMoney = (money: number): void => {
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
  consumerChargeMoney,
  productPrice
) => {
  if (consumerChargeMoney < productPrice) {
    throw new Error('');
  }
};

export default class VendingMachinePurchaseManager implements PurchaseManager {
  private purchaseMoney = 0;

  addPurchaseMoney(money: number): void {
    this.purchaseMoney += money;
  }

  subtractPurchaseMoney(subtractMoney: number): void {
    this.purchaseMoney -= subtractMoney;
  }

  getPurchaseMoney(): number {
    return this.purchaseMoney;
  }
}
