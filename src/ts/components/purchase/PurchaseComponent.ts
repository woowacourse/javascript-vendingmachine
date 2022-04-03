import { $ } from "../../utils/dom";
import { purchaseTemplate } from "./purchaseTemplate";
import ChargeManager from "../../mananger/ChargeManager";
import ProductManager from "../../mananger/ProductManager";

class PurchaseComponent {
  productManager: ProductManager;
  chargeManager: ChargeManager;
  purchaseContainer: HTMLElement;
  purchaseForm: HTMLFormElement;
  purchaseAmountInput: HTMLInputElement;

  constructor({ productManager, chargeManager }) {
    this.productManager = productManager;
    this.chargeManager = chargeManager;
    this.purchaseContainer = $(".purchase-manange__container");
    this.purchaseContainer.replaceChildren();
    this.purchaseContainer.insertAdjacentHTML("beforeend", purchaseTemplate());

    this.purchaseForm = $(".purchase-form");
    this.purchaseAmountInput = $(".purchase-form__input");

    this.purchaseForm.addEventListener("submit", this.handleAddAmount);
  }

  handleAddAmount = (e: Event) => {
    e.preventDefault();
    const purchaseAmount = this.purchaseAmountInput.valueAsNumber;

    try {
      this.productManager.addPurchaseAmount(purchaseAmount);
    } catch ({ message }) {
      alert(message);
    }
  };

  show() {
    this.purchaseContainer.classList.remove("hide");
    this.purchaseAmountInput.focus();
  }
}

export default PurchaseComponent;
