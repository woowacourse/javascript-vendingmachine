import { on, emit } from "../util/event";
import { $, createElement } from "../util/dom";
import productTemplate from "../template/product.template.js";
import { EVENT_TYPE } from "../constant";

class ProductPageView {
  init = () => {
    this.$page = $("#page");
    this.$page.replaceChildren();
    this.$formContainer = createElement(
      "form",
      {
        id: "add-product-form",
        class: "form",
      },
      productTemplate.input()
    );

    this.$productStatusContainer = createElement(
      "section",
      {
        id: "product-status",
      },
      productTemplate.productTable()
    );

    this.$page.appendChild(this.$formContainer);
    this.$page.appendChild(this.$productStatusContainer);

    this.$productNameInput = $("#product-name-input", this.$formContainer);
    this.$productPriceInput = $("#product-price-input", this.$formContainer);
    this.$productCountInput = $("#product-count-input", this.$formContainer);

    this.$productList = $("#products-list", this.$productStatusContainer);
    this.bindEvent();
  };
  initProductsStatus = (products) => {
    $("#products-list", this.$productStatusContainer).insertAdjacentHTML(
      "beforeend",
      products
        .map((product) => {
          return productTemplate.product(product.get());
        })
        .join("")
    );
  };

  bindEvent = () => {
    on(this.$formContainer, "submit", this.productSubmitHandler);
    on(this.$productStatusContainer, "click", this.onClick);
  };

  productSubmitHandler = (e) => {
    e.preventDefault();

    emit(EVENT_TYPE.ADD, {
      name: this.$productNameInput.value,
      price: this.$productPriceInput.valueAsNumber,
      count: this.$productCountInput.valueAsNumber,
    });

    this.$productNameInput.value = "";
    this.$productPriceInput.value = "";
    this.$productCountInput.value = "";
  };

  onClick = ({ target }) => {
    if (target.classList.contains("delete-button")) {
      this.productDeleteHandler(target);
      return;
    }
    if (target.classList.contains("edit-button")) {
      this.productUpdateHandler(target);
      return;
    }
    if (target.classList.contains("save-button")) {
      this.productSubmitUpdateHandler(target);
      return;
    }
  };

  productDeleteHandler = (target) => {
    const productId = target.closest("tr").dataset.id;
    emit(EVENT_TYPE.DELETE, { id: productId });
  };

  productUpdateHandler = (target) => {
    const $product = target.closest("tr");
    $product.replaceChildren();
    $product.insertAdjacentHTML(
      "beforeend",
      productTemplate.productUpdateForm({
        name: $product.dataset.name,
        price: $product.dataset.price,
        count: $product.dataset.count,
      })
    );
  };

  productSubmitUpdateHandler = (target) => {
    const updatedProduct = target.closest("tr");

    const id = updatedProduct.dataset.id;
    const updatedName = $("#edit-name-input", updatedProduct).value;
    const updatedPrice = $("#edit-price-input", updatedProduct).valueAsNumber;
    const updatedCount = $("#edit-count-input", updatedProduct).valueAsNumber;

    emit(EVENT_TYPE.EDIT, {
      id,
      name: updatedName,
      price: updatedPrice,
      count: updatedCount,
    });
  };

  renderNewProduct = (product) => {
    $("#products-list", this.$productStatusContainer).insertAdjacentHTML(
      "beforeend",
      productTemplate.product(product.get())
    );
  };

  renderDeleteProduct = (id) => {
    const target = $(`[data-id="${id}"]`, this.$productList);
    this.$productList.removeChild(target);
  };

  renderUpdatedProduct = (id, { name, price, count }) => {
    const target = $(`[data-id="${id}"]`, this.$productList);
    target.setAttribute("data-name", name);
    target.setAttribute("data-price", price);
    target.setAttribute("data-count", count);

    target.replaceChildren();
    target.insertAdjacentHTML(
      "beforeend",
      `<td>${name}</td>
    <td>${price}</td>
    <td>${count}</td>
    <td>
      <button class="edit-button process-button">수정</button>
      <button class="delete-button process-button">삭제</button>
    </td>`
    );
  };
}

export default ProductPageView;
