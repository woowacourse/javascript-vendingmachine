import "../components/product-edit-form";
import "../components/product-input";
import "../components/product-item";
import "../components/product-table";

class ProductManage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <product-input></product-input>
      <product-table></product-table>
    `;
  }
}

customElements.define("product-manage", ProductManage);
