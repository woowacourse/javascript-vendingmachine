import { productProcessMachine } from "../domain/productProcessMachine";

class ProductPurchaseTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  connectedCallback() {
    this.$productPurchaseTableBody = this.shadowRoot.querySelector(
      "#product-purchase-table-body"
    );
    this.idx = 0;

    const products = productProcessMachine.getProducts();
    products.forEach(({ name, price, count }) => {
      this.addProductPurchaseItem({ name, price, count });
    });
  }

  addProductPurchaseItem({ name, price, count }) {
    const template = document.querySelector("#product-purchase-item-template")
      .content.children[0];
    template.setAttribute("idx", this.idx);
    template.setAttribute("name", name);
    template.setAttribute("price", price);
    template.setAttribute("count", count);
    this.idx += 1;
    const cloneNode = template.cloneNode(true);
    this.$productPurchaseTableBody.insertAdjacentElement(
      "beforeend",
      cloneNode
    );
  }

  render() {
    const template = document.querySelector(
      "#product-purchase-template"
    ).content;
    const cloneNode = template.cloneNode(true);
    this.shadowRoot.appendChild(cloneNode);
  }
}

customElements.define("product-purchase-table", ProductPurchaseTable);
