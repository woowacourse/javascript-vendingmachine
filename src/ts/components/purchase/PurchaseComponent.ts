import { $ } from "../../utils/dom";
import { productPurchaseListTemplate, purchaseTemplate } from "./purchaseTemplate";
import ChargeManager, { Coin } from "../../mananger/ChargeManager";
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
  returnButton: HTMLButtonElement;
  returnCoin500: HTMLElement;
  returnCoin100: HTMLElement;
  returnCoin50: HTMLElement;
  returnCoin10: HTMLElement;

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
    this.returnButton = $(".return-coin__return-button");
    this.returnCoin500 = $(".return-coin__table-coin--500");
    this.returnCoin100 = $(".return-coin__table-coin--100");
    this.returnCoin50 = $(".return-coin__table-coin--50");
    this.returnCoin10 = $(".return-coin__table-coin--10");

    this.purchaseForm.addEventListener("submit", this.handleAddAmount);
    this.purchaseTable.addEventListener("click", this.handlePurchaseProduct);
    this.returnButton.addEventListener("click", this.handleReturnCoin);
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

  handleReturnCoin = () => {
    const purchaseAmount = this.productManager.getPurchaseAmount();
    const returnCoins = this.chargeManager.getReturnCoins(purchaseAmount);
    const returnCoinAmount = this.chargeManager.convertCoinsToAmount(returnCoins);

    this.chargeManager.substractCoins(returnCoins);
    this.productManager.substractPurchaseAmount(returnCoinAmount);

    this.renderAmount();
    this.renderReturnCoins(returnCoins);
  };

  renderAmount() {
    this.purchaseAmountText.textContent = `${this.productManager.getPurchaseAmount()}`;
  }

  renderReturnCoins(returnCoins: Coin) {
    const countList = Object.values(returnCoins);

    [this.returnCoin10, this.returnCoin50, this.returnCoin100, this.returnCoin500].forEach((returnCoin, index) => {
      returnCoin.textContent = `${countList[index]}개`;
    });
  }

  renderProducts() {
    this.purchaseTableBody.replaceChildren();
    this.purchaseTableBody.insertAdjacentHTML(
      "beforeend",
      productPurchaseListTemplate(this.productManager.getProducts()),
    );
  }

  show() {
    this.purchaseContainer.classList.remove("hide");
    this.purchaseAmountInput.focus();
    this.renderProducts();
  }
}

export default PurchaseComponent;
