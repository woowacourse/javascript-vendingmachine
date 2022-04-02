interface PurchaseManager {
  addPurchaseMoney(money: number): void;
  subtractPurchaseMoney(subtractMoney: number): void;
  getPurchaseMoney(): number;
}

export default class VendingMachinePurchaseManager implements PurchaseManager {
  private purchaseMoney = [];

  addPurchaseMoney(money: number): void {}

  subtractPurchaseMoney(subtractMoney: number): void {}

  getPurchaseMoney(): number;
}
