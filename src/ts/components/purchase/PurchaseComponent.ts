import { $ } from "../../utils/dom";
import { purchaseTemplate } from "./purchaseTemplate";

class PurchaseComponent {
  purchaseContainer: HTMLElement;
  purchaseForm: HTMLFormElement;
  purchaseAmountInput: HTMLInputElement;

  constructor() {
    this.purchaseContainer = $(".purchase-manange__container");
    this.purchaseContainer.replaceChildren();
    this.purchaseContainer.insertAdjacentHTML("beforeend", purchaseTemplate());

    this.purchaseForm = $(".purchase-form");
    this.purchaseAmountInput = $(".purchase-form__input");
    this.purchaseForm.addEventListener("submit", this.handleAddAmount);
  }

  handleAddAmount = (e) => {
    e.preventDefault();
    const purchaseAmount = this.purchaseAmountInput.valueAsNumber;
  };

  show() {
    this.purchaseContainer.classList.remove("hide");
  }
}

export default PurchaseComponent;
