import { selectDom } from "../../utils/dom";
import { purchaseTemplate } from "./purchaseTemplate";

class PurchaseView {
  vendingmachineFunctionWrap: HTMLElement;

  constructor() {
    this.vendingmachineFunctionWrap = selectDom(".main");

  }

  showInsertMoney(totalMoney: number) {
    const insertMoneyText = selectDom("#insert-money-text");
    insertMoneyText.textContent = `${totalMoney}`;
  }

  renderPurchaseView() {
    this.vendingmachineFunctionWrap.replaceChildren();
    this.vendingmachineFunctionWrap.insertAdjacentHTML("beforeend", purchaseTemplate);
  }
}

export default PurchaseView;
