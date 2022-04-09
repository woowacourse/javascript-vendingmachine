import { EVENT_TYPE } from "../constant";
import { addEvent, emit, removeEvent } from "../util/event";
import { productProcessMachine } from "../domain/productProcessMachine";
import showSnackbar from "../util/snackbar";

class ProductInput extends HTMLElement {
  constructor() {
    super();
    this.$page = document.querySelector("#page");
    this.$snackbar = document.querySelector("#snackbar");
    this.attachShadow({ mode: "open" });
    this.render();
  }

  connectedCallback() {
    this.$addProductForm = this.shadowRoot.querySelector("#add-product-form");
    this.$productNameInput = this.shadowRoot.querySelector(
      "#product-name-input"
    );
    this.$productPriceInput = this.shadowRoot.querySelector(
      "#product-price-input"
    );
    this.$productCountInput = this.shadowRoot.querySelector(
      "#product-count-input"
    );

    addEvent(this.$addProductForm, "submit", this.onSubmit);
  }

  disconnectedCallback() {
    this.$addProductForm = this.shadowRoot.querySelector("#add-product-form");
    removeEvent(this.$addProductForm, "submit", this.onSubmit);
  }

  onSubmit = (e) => {
    e.preventDefault();
    try {
      productProcessMachine.add({
        name: this.$productNameInput.value,
        price: this.$productPriceInput.valueAsNumber,
        count: this.$productCountInput.valueAsNumber,
      });

      emit(this.$page, EVENT_TYPE.ADD, {
        name: this.$productNameInput.value,
        price: this.$productPriceInput.valueAsNumber,
        count: this.$productCountInput.valueAsNumber,
      });

      this.$productNameInput.value = "";
      this.$productPriceInput.value = "";
      this.$productCountInput.value = "";
    } catch (err) {
      showSnackbar(this.$snackbar, err.message);
    }
  };

  render() {
    const template = document.querySelector("#product-input-template").content;
    const cloneNode = template.cloneNode(true);
    this.shadowRoot.appendChild(cloneNode);
  }
}

customElements.define("product-input", ProductInput);
