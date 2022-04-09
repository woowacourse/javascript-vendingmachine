import { productPurchaseMachine } from "../domain/productPurchaseMachine.ts";
import { addEvent, removeEvent } from "../util/event";
import showSnackbar from "../util/snackbar";

class AmountInput extends HTMLElement {
  constructor() {
    super();
    this.$page = document.querySelector("#page");
    this.$snackbar = document.querySelector("#snackbar");
    this.attachShadow({ mode: "open" });
    this.render();
  }

  connectedCallback() {
    this.$amountForm = this.shadowRoot.querySelector("#amount-form");
    this.$amountInput = this.shadowRoot.querySelector("#amount-input");
    this.$haveAmount = this.shadowRoot.querySelector("#have-amount");

    addEvent(this.$amountForm, "submit", this.onSubmit);
    addEvent(this.$page, "@updateamount", this.renderHaveAmount);
    this.renderHaveAmount();
  }

  disconnectedCallback() {
    removeEvent(this.$amountForm, "submit", this.onSubmit);
    removeEvent(this.$page, "@updateamount", this.renderHaveAmount);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const money = this.$amountInput.valueAsNumber;
    try {
      productPurchaseMachine.charge(money);
      this.renderHaveAmount();
    } catch (err) {
      showSnackbar(this.$snackbar, err.message);
    }
  };

  renderHaveAmount = () => {
    const amount = productPurchaseMachine.getChargedMoney();

    this.$haveAmount.innerText = `투입된 금액: ${amount}원`;
  };

  render() {
    const template = document.querySelector("#amount-input-template").content;
    const cloneNode = template.cloneNode(true);
    this.shadowRoot.appendChild(cloneNode);
  }
}

customElements.define("amount-input", AmountInput);
