import ProductManager from "../../mananger/ProductManager";
import { INFOMATION_MESSAGES } from "../../utils/constants";
import { $, $$ } from "../../utils/dom";
import { verifyProductName, verifyProductPrice, verifyProductQuantity } from "../../utils/validation";
import { productTemplate, addProductTemplate, editProductTemplate } from "./productTemplate";

class Product {
  productManager: ProductManager;
  productContainer: HTMLElement;
  productAddButton: HTMLElement;
  productTable: HTMLElement;
  productNameInput: HTMLElement;
  productPriceInput: HTMLElement;
  productQuantityInput: HTMLElement;

  constructor({ productManager }) {
    this.productManager = productManager;
    this.productContainer = $(".product-manange__container");
    this.productContainer.replaceChildren();
    this.productContainer.insertAdjacentHTML("beforeend", productTemplate());

    this.productTable = $(".product-manange__table");
    this.productNameInput = $(".product-manange__name-input");
    this.productPriceInput = $(".product-manange__price-input");
    this.productQuantityInput = $(".product-manange__quantity-input");
    this.productAddButton = $(".product-manange__add-button");

    this.productAddButton.addEventListener("click", this.handleAddProduct);
    this.productTable.addEventListener("click", this.handleManageOption);
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

      this.productManager.addProduct({ name, price, quantity });
      this.productTable.insertAdjacentHTML("beforeend", addProductTemplate({ name, price, quantity }));
    } catch ({ message }) {
      alert(message);
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
      selectedRow.remove();
    }
  }

  editProduct(selectedRow) {
    const [name, price, quantity] = selectedRow.children;

    selectedRow.innerHTML = editProductTemplate({
      name: name.textContent,
      price: price.textContent,
      quantity: quantity.textContent,
    });
  }

  confirmProduct(selectedRow) {
    const name = ($(".product-manage__edit-input--name") as HTMLInputElement).value.trim();
    const price = +($(".product-manage__edit-input--price") as HTMLInputElement).value;
    const quantity = +($(".product-manage__edit-input--quantity") as HTMLInputElement).value;
    const { name: prevName } = selectedRow.dataset;

    try {
      verifyProductName(name);
      verifyProductPrice(price);
      verifyProductQuantity(quantity);

      this.productManager.editProduct({ name, price, quantity }, prevName);
      selectedRow.innerHTML = addProductTemplate({ name, price, quantity });
      selectedRow.dataset.name = name;
    } catch ({ message }) {
      alert(message);
    }
  }

  show() {
    this.productContainer.classList.remove("hide");
  }
}

export default Product;
