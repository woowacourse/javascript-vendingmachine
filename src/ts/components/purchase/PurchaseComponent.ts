import { $ } from "../../utils/dom";
import { productListTemplate, purchaseTemplate } from "./purchaseTemplate";
import ChargeManager from "../../mananger/ChargeManager";
import ProductManager from "../../mananger/ProductManager";

class PurchaseComponent {
  productManager: ProductManager;
  chargeManager: ChargeManager;
  purchaseContainer: HTMLElement;
  purchaseForm: HTMLFormElement;
  purchaseAmountInput: HTMLInputElement;
  purchaseAmountText: HTMLSpanElement;
  purchaseTable: HTMLTableElement;
  purchaseTableBody: HTMLTableElement;

  constructor({ productManager, chargeManager }) {
    this.productManager = productManager;
    this.chargeManager = chargeManager;
    this.purchaseContainer = $(".purchase-manange__container");
    this.purchaseContainer.replaceChildren();
    this.purchaseContainer.insertAdjacentHTML("beforeend", purchaseTemplate());

    this.purchaseForm = $(".purchase-form");
    this.purchaseAmountText = $(".purchase-form__amount");
    this.purchaseAmountInput = $(".purchase-form__input");
    this.purchaseTable = $(".purchase-table");
    this.purchaseTableBody = $(".purchase-table__body");

    this.purchaseForm.addEventListener("submit", this.handleAddAmount);
    this.purchaseTable.addEventListener("click", this.handlePurchaseProduct);
  }

  handleAddAmount = (e: Event) => {
    e.preventDefault();
    const amount = this.purchaseAmountInput.valueAsNumber;

    try {
      this.productManager.addPurchaseAmount(amount);
      this.renderAmount();
    } catch ({ message }) {
      alert(message);
    }
  };

  handlePurchaseProduct = ({ target }) => {
    if (!target.classList.contains("purchase-table__purchase-button")) {
      return;
    }

    const { name } = target.closest("[data-name]").dataset;

    try {
      this.productManager.purchaseProduct(name);
      this.renderAmount();
      this.renderProducts();
    } catch ({ message }) {
      alert(message);
    }
  };

  renderAmount() {
    this.purchaseAmountText.textContent = `${this.productManager.getPurchaseAmount()}`;
  }

  renderProducts() {
    this.purchaseTableBody.replaceChildren();
    this.purchaseTableBody.insertAdjacentHTML("beforeend", productListTemplate(this.productManager.getProducts()));
  }

  show() {
    this.purchaseContainer.classList.remove("hide");
    this.purchaseAmountInput.focus();
    this.renderProducts();
  }
}

export default PurchaseComponent;
