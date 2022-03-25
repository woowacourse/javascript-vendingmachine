import { selectDom, selectDomAll, addEvent } from "../../utils/dom";
import { verifyProductInfo } from "../../utils/validation";
import {
  productTemplate,
  addProductTemplate,
  editProductTemplate,
} from "./productTemplate";

class Product {
  vendingmachineFunctionWrap: HTMLElement;
  productControlInputs: NodeList;
  productAddButton: HTMLElement;
  productTable: HTMLElement;
  productNameTdList: NodeList | null;

  constructor() {
    this.vendingmachineFunctionWrap = selectDom(".main");
  }

  bindProductDom() {
    this.productControlInputs = selectDomAll(".product-control-input");
    this.productAddButton = selectDom("#product-add-button");
    this.productTable = selectDom("#product-control-table");
    this.productNameTdList = selectDomAll(".product-name", this.productTable);
    addEvent(this.productAddButton, "click", this.handleAddProduct);
    addEvent(this.productTable, "click", this.handleRemoveProduct);
    addEvent(this.productTable, "click", this.handleEditProduct);
    addEvent(this.productTable, "click", this.handleConfirmProduct);
  }

  handleAddProduct = (e: Event) => {
    e.preventDefault();
    const [productName, productPrice, productQuantity] = Array.from(
      this.productControlInputs,
      (input: HTMLInputElement) => input.value
    );
    const productNameList = Array.from(
      this.productNameTdList,
      (productNameTd: HTMLTableCellElement) => productNameTd.textContent
    );

    try {
      verifyProductInfo(
        productName,
        +productPrice,
        +productQuantity,
        productNameList
      );
      this.productControlInputs.forEach(
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

  handleRemoveProduct = (e: { target: HTMLTableElement }) => {
    if (e.target.classList.contains("product-remove-button")) {
      e.target.closest("tr").remove();
    }
  };

  handleEditProduct = (e: { target: HTMLTableElement }) => {
    if (e.target.classList.contains("product-edit-button")) {
      const [productNameTd, productPriceTd, productQuantityTd] = Array.from(
        e.target.closest("tr").children
      );
      e.target.closest("tr").innerHTML = editProductTemplate(
        productNameTd.textContent,
        +productPriceTd.textContent,
        +productQuantityTd.textContent
      );
    }
  };

  handleConfirmProduct = (e: { target: HTMLTableElement }) => {
    if (e.target.classList.contains("product-confirm-button")) {
      const [productName, productPrice, productQuantity] = Array.from(
        selectDomAll(".product-edit-input"),
        (input: HTMLInputElement) => input.value
      );
      const productNameList = Array.from(
        this.productNameTdList,
        (productNameTd: HTMLTableCellElement) => productNameTd.textContent
      );

      try {
        verifyProductInfo(
          productName,
          +productPrice,
          +productQuantity,
          productNameList
        );
        this.changeEditProductInfo(
          productName,
          +productPrice,
          +productQuantity,
          e.target
        );
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  changeEditProductInfo = (
    productName: string,
    productPrice: number,
    productQuantity: number,
    target
  ) => {
    target.closest("tr").innerHTML = addProductTemplate(
      productName,
      productPrice,
      productQuantity
    );
  };

  render() {
    this.vendingmachineFunctionWrap.replaceChildren();
    this.vendingmachineFunctionWrap.insertAdjacentHTML("beforeend", productTemplate());
    this.bindProductDom();
  }
}

export default Product;
