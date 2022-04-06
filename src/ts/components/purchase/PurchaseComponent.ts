import { $ } from "../../utils/dom";
import { productPurchaseListTemplate, purchaseTemplate } from "./purchaseTemplate";
import ChargeManager, { Coin } from "../../mananger/ChargeManager";
import ProductManager from "../../mananger/ProductManager";
import Snackbar from "../Snackbar";
import { INFOMATION_MESSAGES } from "../../utils/constants";

class PurchaseComponent {
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
  snackbar: Snackbar;

  constructor(private productManager: ProductManager, private chargeManager: ChargeManager) {
    this.snackbar = new Snackbar();
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
      this.snackbar.show(INFOMATION_MESSAGES.SUCCESS_CHARGE);
    } catch ({ message }) {
      this.snackbar.show(message);
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
      this.snackbar.show(INFOMATION_MESSAGES.SUCCESS_PURCHASE_PRODUCT);
    } catch ({ message }) {
      this.snackbar.show(message);
    }
  };

  handleReturnCoin = () => {
    try {
      const purchaseAmount = this.productManager.getPurchaseAmount();
      const returnCoins = this.chargeManager.getReturnCoins(purchaseAmount);
      const returnCoinsAmount = this.chargeManager.convertCoinsToAmount(returnCoins);

      this.productManager.substractPurchaseAmount(returnCoinsAmount);
      this.chargeManager.substractCoins(returnCoins);
      this.renderAmount();
      this.renderReturnCoins(returnCoins);
      this.snackbar.show(INFOMATION_MESSAGES.SUCCESS_RETURN_COIN);
    } catch ({ message }) {
      this.snackbar.show(message);
    }
  };

  renderAmount() {
    this.purchaseAmountText.textContent = `${this.productManager.getPurchaseAmount()}`;
  }

  renderProducts() {
    this.purchaseTableBody.replaceChildren();
    this.purchaseTableBody.insertAdjacentHTML(
      "beforeend",
      productPurchaseListTemplate(this.productManager.getProducts()),
    );
  }

  renderReturnCoins(returnCoins: Coin) {
    const countList = Object.values(returnCoins);

    [this.returnCoin10, this.returnCoin50, this.returnCoin100, this.returnCoin500].forEach((returnCoin, index) => {
      returnCoin.textContent = `${countList[index]}개`;
    });
  }

  show() {
    this.purchaseContainer.classList.remove("hide");
    this.purchaseAmountInput.focus();
    this.renderProducts();
  }
}

export default PurchaseComponent;
