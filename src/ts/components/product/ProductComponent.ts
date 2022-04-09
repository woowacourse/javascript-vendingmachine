import { $ } from "../../utils/dom";
import { INFOMATION_MESSAGES } from "../../utils/constants";
import { clearInput } from "../../utils/common";

import ProductManager from "../../manager/ProductManager";
import { productTemplate, editProductTemplate, productmanageListTemplate } from "./productTemplate";
import Snackbar from "../Snackbar";

class ProductComponent {
  productContainer: HTMLElement;
  productAddButton: HTMLButtonElement;
  productTable: HTMLTableElement;
  productTableBody: HTMLTableElement;
  productNameInput: HTMLInputElement;
  productPriceInput: HTMLInputElement;
  productQuantityInput: HTMLInputElement;
  snackbar: Snackbar;

  constructor(private productManager: ProductManager) {
    this.snackbar = new Snackbar();
    this.productContainer = $(".product-manage__container");
    this.productContainer.replaceChildren();
    this.productContainer.insertAdjacentHTML("beforeend", productTemplate());

    this.productTable = $(".product-manage__table");
    this.productTableBody = $(".productmanage__table-body");
    this.productNameInput = $(".product-manage__name-input");
    this.productPriceInput = $(".product-manage__price-input");
    this.productQuantityInput = $(".product-manage__quantity-input");
    this.productAddButton = $(".product-manage__add-button");

    this.productAddButton.addEventListener("click", this.handleAddProduct);
    this.productTable.addEventListener("click", this.handleManageOption);
  }

  handleAddProduct = (e: Event) => {
    e.preventDefault();
    const name = this.productNameInput.value.trim();
    const price = this.productPriceInput.valueAsNumber;
    const quantity = this.productQuantityInput.valueAsNumber;

    try {
      this.productManager.addProduct({ name, price, quantity });
      this.renderProducts();
      this.snackbar.show(INFOMATION_MESSAGES.SUCCESS_ADD_PRODUCT);
      this.productNameInput.focus();
      clearInput(this.productNameInput, this.productPriceInput, this.productQuantityInput);
    } catch ({ message }) {
      this.snackbar.show(message);
    }
  };

  handleManageOption = ({ target }) => {
    if (!target.classList.contains("product-manage__option")) {
      return;
    }

    const selectedRow = target.closest("[data-name]");
    if (target.classList.contains("product-manage__edit-button")) {
      this.editProduct(selectedRow);
    }
    if (target.classList.contains("product-manage__remove-button")) {
      this.removeProduct(selectedRow);
    }
    if (target.classList.contains("product-manage__confirm-button")) {
      this.confirmProduct(selectedRow);
    }
  };

  removeProduct(selectedRow) {
    if (confirm(INFOMATION_MESSAGES.ASK_DELETE)) {
      const { name } = selectedRow.dataset;
      this.productManager.removeProduct(name);
      this.snackbar.show(INFOMATION_MESSAGES.SUCCESS_DELETE_PRODUCT);
      selectedRow.remove();
    }
  }

  editProduct(selectedRow) {
    const [name, price, quantity] = selectedRow.children;
    const newRow = document.createElement("template");

    newRow.insertAdjacentHTML(
      "beforeend",
      editProductTemplate({
        name: name.textContent,
        price: price.textContent,
        quantity: quantity.textContent,
      }),
    );

    selectedRow.replaceWith(newRow.firstElementChild);
  }

  confirmProduct(selectedRow) {
    const name = (<HTMLInputElement>$(".product-manage__edit-input--name")).value.trim();
    const price = +(<HTMLInputElement>$(".product-manage__edit-input--price")).value;
    const quantity = +(<HTMLInputElement>$(".product-manage__edit-input--quantity")).value;
    const { name: prevName } = selectedRow.dataset;

    try {
      this.productManager.editProduct({ name, price, quantity }, prevName);
      this.renderProducts();
      this.snackbar.show(INFOMATION_MESSAGES.SUCCESS_EDIT_PRODUCT);
      selectedRow.dataset.name = name;
    } catch ({ message }) {
      this.snackbar.show(message);
    }
  }

  renderProducts() {
    this.productTableBody.replaceChildren();
    this.productTableBody.insertAdjacentHTML("beforeend", productmanageListTemplate(this.productManager.getProducts()));
  }

  show() {
    this.productContainer.classList.remove("hide");
    this.productNameInput.focus();
    this.renderProducts();
  }
}

export default ProductComponent;
