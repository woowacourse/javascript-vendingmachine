import { EVENT_TYPE } from "../constant";
import { emit } from "../util/event";
import { productProcessMachine } from "../domain/productProcessMachine";

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

    this.$addProductForm.addEventListener("submit", this.onSubmit);
  }

  disconnectedCallback() {
    this.$addProductForm = this.shadowRoot.querySelector("#add-product-form");
    this.$addProductForm.removeEventListener("submit", this.onSubmit);
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
      this.$snackbar.innerText = err.message;
      this.$snackbar.classList.toggle("show");
      setTimeout(() => {
        this.$snackbar.classList.toggle("show");
      }, 1000);
    }
  };

  render() {
    const template = document.querySelector("#product-input-template").content;
    const cloneNode = template.cloneNode(true);
    this.shadowRoot.appendChild(cloneNode);
  }
}

customElements.define("product-input", ProductInput);
