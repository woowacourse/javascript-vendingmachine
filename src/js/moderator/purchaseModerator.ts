import VendingMachine from "../domain/vendingMachine";
import PurchasePageView from "../ui/purchasePageView";

class PurchaseModerator {
  purchasePageView;
  vendingMachine;

  constructor() {
    this.purchasePageView = new PurchasePageView();
    this.vendingMachine = VendingMachine.getInstance();
  }

  init() {
    this.purchasePageView.init();

    const chargedMoney = this.vendingMachine.getChargedMoney();
    const purchaseableProducts = this.vendingMachine.getPurchaseableProducts();

    this.purchasePageView.renderCurrentChargedMoney(chargedMoney);
    this.purchasePageView.renderPurchaseableProducts(purchaseableProducts);
    this.purchasePageView.renderReturnedChanges({
      500: 0,
      100: 0,
      50: 0,
      10: 0,
    });
  }
}

export default PurchaseModerator;
