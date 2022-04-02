import { addEvent, selectDom } from "../../utils/dom";
import { verifyCharge } from "../../utils/validation";
import PurchaseInfo from "./PurchaseInfo";
import PurchaseView from "./PurchaseView";

class Purchase {
  purchaseInfo: PurchaseInfo;
  purchaseView: PurchaseView;
  insertMoneyForm: HTMLElement;
  insertMoneyInput: HTMLElement | HTMLInputElement;
  insertMoneyText: HTMLElement;

  constructor() {
    this.purchaseInfo = new PurchaseInfo();
    this.purchaseView = new PurchaseView();
  }

  bindPurchaseDom() {
    this.insertMoneyForm = selectDom("#insert-money-form");
    this.insertMoneyInput = selectDom(".insert-money-input");
    this.insertMoneyText = selectDom("#insert-money-text");
    addEvent(this.insertMoneyForm, "submit", this.handleInsertMoney);
  }

  handleInsertMoney = (event: Event) => {
    event.preventDefault();
    const insertMoney = (this.insertMoneyInput as HTMLInputElement).valueAsNumber;
    verifyCharge(insertMoney);
    this.purchaseInfo.plusInsertMoney(insertMoney);
    this.purchaseView.showInsertMoney(this.purchaseInfo.getInsertMoney());
  }



  render() {
    this.purchaseView.renderPurchaseView();
    // this.purchaseInfo.showRandomChargeResult();
    this.bindPurchaseDom();
  }
}

export default Purchase;
