import ProductManager from "../../mananger/ProductManager";
import { INFOMATION_MESSAGES } from "../../utils/constants";
import { $, $$ } from "../../utils/dom";
import { verifyProductName, verifyProductPrice, verifyProductQuantity } from "../../utils/validation";
import { productTemplate, addProductTemplate, editProductTemplate } from "./productTemplate";

class Product {
  productContainer: HTMLElement;
  productAddButton: HTMLElement;
  productTable: HTMLElement;
  productNameInput: HTMLElement;
  productPriceInput: HTMLElement;
  productQuantityInput: HTMLElement;

  productControlInputs: NodeList;
  productNameTdList: NodeList | null;
  productManager: ProductManager;

  constructor({ productManager }) {
    this.productManager = productManager;
    this.productContainer = $(".product-manange__container");
    this.productContainer.replaceChildren();
    this.productContainer.insertAdjacentHTML("beforeend", productTemplate());

    this.productNameInput = $(".product-manange__name-input");
    this.productPriceInput = $(".product-manange__price-input");
    this.productQuantityInput = $(".product-manange__quantity-input");
    this.productAddButton = $(".product-manange__add-button");

    this.productAddButton.addEventListener("click", this.handleAddProduct);
    this.productTable.addEventListener("click", this.handleRemoveProduct);
    this.productTable.addEventListener("click", this.handleEditProduct);
    this.productTable.addEventListener("click", this.handleConfirmProduct);
  }

  handleAddProduct = (e: Event) => {
    e.preventDefault();
    const name = (this.productNameInput as HTMLInputElement).value.trim();
    const price = (this.productPriceInput as HTMLInputElement).valueAsNumber;
    const quantity = (this.productQuantityInput as HTMLInputElement).valueAsNumber;

    try {
      verifyProductName(name);
      verifyProductPrice(price);
      verifyProductQuantity(quantity);
    } catch ({ message }) {
      alert(message);
    }
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

  show() {
    this.productContainer.classList.remove("hide");
  }
}

export default Product;
