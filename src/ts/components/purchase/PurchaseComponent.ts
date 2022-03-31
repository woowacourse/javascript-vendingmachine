import { $ } from "../../utils/dom";
import { purchaseTemplate } from "./purchaseTemplate";

class PurchaseComponent {
  purchaseContainer: HTMLElement;

  constructor() {
    this.purchaseContainer = $(".purchase-manange__container");
    this.purchaseContainer.replaceChildren();
    this.purchaseContainer.insertAdjacentHTML("beforeend", purchaseTemplate());
  }

  show() {
    this.purchaseContainer.classList.remove("hide");
  }
}

export default PurchaseComponent;
