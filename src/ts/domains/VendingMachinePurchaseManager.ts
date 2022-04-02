interface PurchaseManager {
  addPurchaseMoney(money: number): void;
  subtractPurchaseMoney(subtractMoney: number): void;
  getReturnCoin(): number;
}

export default class VendingMachinePurchaseManager implements PurchaseManager {
  private purchaseMoney = [];

  addPurchaseMoney(money: number): void {}

  subtractPurchaseMoney(subtractMoney: number): void {}

  getReturnCoin(): number;
}
