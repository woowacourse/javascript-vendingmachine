import { $, $$, addEvent } from "../../utils/dom";
import { verifyProductInfo } from "../../utils/validation";
import { productTemplate, addProductTemplate } from "./productTemplate";

class Product {
  main: HTMLElement;
  productControlInput: NodeList;
  productAddButton: HTMLElement;
  productTable: HTMLElement;

  constructor() {
    this.main = $(".main");
  }

  handleProductDom() {
    this.productControlInput = $$(".product-control-input");
    this.productAddButton = $("#product-add-button");
    this.productTable = $("#product-control-table");
    addEvent(this.productAddButton, "click", this.handleAddProduct);
  }

  handleAddProduct = (e: Event) => {
    e.preventDefault();
    const [productName, productPrice, productQuantity] = Array.from(
      this.productControlInput,
      (input: HTMLInputElement) => input.value
    );

    try {
      verifyProductInfo(productName, +productPrice, +productQuantity);
      this.productControlInput.forEach(
        (input: HTMLInputElement) => (input.value = "")
      );
    } catch ({ message }) {
      alert(message);
      return;
    }

    this.productTable.insertAdjacentHTML(
      "beforeend",
      addProductTemplate(productName, +productPrice, +productQuantity)
    );
  };

  render() {
    this.main.replaceChildren();
    this.main.insertAdjacentHTML("beforeend", productTemplate());
    this.handleProductDom();
  }
}

export default Product;
