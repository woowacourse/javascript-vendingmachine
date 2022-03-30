import { INFOMATION_MESSAGES } from "../../utils/constants";
import { $, $$ } from "../../utils/dom";
import { verifyProductInfo } from "../../utils/validation";
import { productTemplate, addProductTemplate, editProductTemplate } from "./productTemplate";

class Product {
  main: HTMLElement;
  productControlInputs: NodeList;
  productAddButton: HTMLElement;
  productTable: HTMLElement;
  productNameTdList: NodeList | null;

  constructor() {
    this.main = $(".main");
  }

  bindProductDom() {
    this.productControlInputs = $$(".product-control-input");
    this.productAddButton = $("#product-add-button");
    this.productTable = $("#product-control-table");
    this.productAddButton.addEventListener("click", this.handleAddProduct);
    this.productTable.addEventListener("click", this.handleRemoveProduct);
    this.productTable.addEventListener("click", this.handleEditProduct);
    this.productTable.addEventListener("click", this.handleConfirmProduct);
  }

  handleAddProduct = (e: Event) => {
    e.preventDefault();
    const [productName, productPrice, productQuantity] = Array.from(
      this.productControlInputs,
      (input: HTMLInputElement) => input.value,
    );
    const productNameList = Array.from(
      $$(".product-name", this.productTable),
      (productNameTd: HTMLTableCellElement) => productNameTd.textContent,
    );

    try {
      verifyProductInfo(productName, +productPrice, +productQuantity, productNameList);
      this.productControlInputs.forEach((input: HTMLInputElement) => (input.value = ""));
    } catch ({ message }) {
      alert(message);
      return;
    }

    this.productTable.insertAdjacentHTML("beforeend", addProductTemplate(productName, +productPrice, +productQuantity));
  };

  handleRemoveProduct = (e) => {
    if (e.target.classList.contains("product-remove-button")) {
      confirm(INFOMATION_MESSAGES.ASK_DELETE) && e.target.closest("tr").remove();
    }
  };

  handleEditProduct = (e) => {
    if (e.target.classList.contains("product-edit-button")) {
      const [productNameTd, productPriceTd, productQuantityTd] = Array.from(e.target.closest("tr").children);
      e.target.closest("tr").innerHTML = editProductTemplate(
        productNameTd.textContent,
        +productPriceTd.textContent,
        +productQuantityTd.textContent,
      );
    }
  };

  handleConfirmProduct = (e) => {
    if (e.target.classList.contains("product-confirm-button")) {
      const [productName, productPrice, productQuantity] = Array.from(
        $$(".product-edit-input"),
        (input: HTMLInputElement) => input.value,
      );
      const productNameList = Array.from(
        $$(".product-name", this.productTable),
        (productNameTd: HTMLTableCellElement) => productNameTd.textContent,
      );

      try {
        verifyProductInfo(productName, +productPrice, +productQuantity, productNameList);
        this.changeEditProductInfo(productName, +productPrice, +productQuantity, e.target);
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  changeEditProductInfo = (productName: string, productPrice: number, productQuantity: number, target) => {
    target.closest("tr").innerHTML = addProductTemplate(productName, productPrice, productQuantity);
  };

  render() {
    this.main.replaceChildren();
    this.main.insertAdjacentHTML("beforeend", productTemplate());
    this.bindProductDom();
  }
}

export default Product;
