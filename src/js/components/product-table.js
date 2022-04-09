import { addEvent } from "../util/event";
import { EVENT_TYPE } from "../constant";
import { productProcessMachine } from "../domain/productProcessMachine";

class ProductTable extends HTMLElement {
  constructor() {
    super();
    this.$page = document.querySelector("#page");
    this.attachShadow({ mode: "open" });
    this.render();
  }

  connectedCallback() {
    this.$productTableBody = this.shadowRoot.querySelector(
      "#product-table-body"
    );
    this.idx = 0;
    addEvent(this.$page, EVENT_TYPE.ADD, (e) => this.onAddItem(e.detail));

    const products = productProcessMachine.getProducts();
    products.forEach(({ name, price, count }) => {
      this.onAddItem({ name, price, count });
    });
  }

  onAddItem({ name, price, count }) {
    this.addProductItem({ name, price, count });
    this.addEditForm();
    this.idx += 1;
  }

  addProductItem({ name, price, count }) {
    const template = document.querySelector("#product-item-template").content
      .children[0];
    template.setAttribute("idx", this.idx);
    template.setAttribute("name", name);
    template.setAttribute("price", price);
    template.setAttribute("count", count);
    const cloneNode = template.cloneNode(true);
    this.$productTableBody.insertAdjacentElement("beforeend", cloneNode);
  }

  addEditForm() {
    const template = document.querySelector("#edit-form-template").content
      .children[0];
    template.setAttribute("idx", this.idx);
    const cloneNode = template.cloneNode(true);
    cloneNode.classList.add("hidden");

    this.$productTableBody.insertAdjacentElement("beforeend", cloneNode);
  }

  render() {
    const template = document.querySelector("#product-table-template").content;
    const cloneNode = template.cloneNode(true);
    this.shadowRoot.appendChild(cloneNode);
  }
}

customElements.define("product-table", ProductTable);
