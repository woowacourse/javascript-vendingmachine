import "../components/amount-input";
import "../components/product-purchase-table";
import "../components/product-purchase-item";
import "../components/return-table";

class ProductPurchase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <amount-input></amount-input>
      <product-purchase-table></product-purchase-table>
      <return-table></return-table>
    `;
  }
}

customElements.define("product-purchase", ProductPurchase);
