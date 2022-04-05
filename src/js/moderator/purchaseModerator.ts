import { EVENT_TYPE } from "../constant";
import VendingMachine from "../domain/vendingMachine";
import PurchasePageView from "../ui/purchasePageView";
import { on } from "../util/event";

class PurchaseModerator {
  purchasePageView;
  vendingMachine;

  constructor() {
    this.purchasePageView = new PurchasePageView();
    this.vendingMachine = VendingMachine.getInstance();
    on<any>(window, EVENT_TYPE.INPUT, (e) => {
      this.chargeMoney(e.detail);
    });
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

  chargeMoney({ money }) {
    console.log(money);
    this.vendingMachine.chargeMoney(money);
    const chargedMoney = this.vendingMachine.getChargedMoney();
    const purchaseableProducts = this.vendingMachine.getPurchaseableProducts();
    this.purchasePageView.renderCurrentChargedMoney(chargedMoney);
    this.purchasePageView.renderPurchaseableProducts(purchaseableProducts);
  }
}

export default PurchaseModerator;
