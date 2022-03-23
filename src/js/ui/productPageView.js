import { on, emit } from "../util/event.js";
import productTemplate from "../template/product.template.js";

class ProductPageView {
  constructor() {
    this.$page = document.querySelector("#page");

    this.bindEvent();
  }

  bindEvent = () => {
    on(this.$page, "submit", this.productSubmitHandler);
    on(this.$page, "click", this.onClick);
  };

  initDOMS = () => {
    this.$productStatus = document.querySelector("#product-status");
  };

  productSubmitHandler = (e) => {
    if (e.target.id !== "add-product-form") return;

    e.preventDefault();
    const name = e.target.querySelector("#product-name-input").value;
    const price = e.target.querySelector("#product-price-input").valueAsNumber;
    const count = e.target.querySelector("#product-count-input").valueAsNumber;

    emit("@add", { name, price, count });
  };

  onClick = ({ target }) => {
    if (target.classList.contains("delete-button")) {
      this.productDeleteHandler(target);
    }
    if (target.classList.contains("edit-button")) {
      this.productUpdateHandler(target);
    }

    if (target.classList.contains("save-button")) {
      this.productSubmitUpdateHandler(target);
    }
  };

  productDeleteHandler = (target) => {
    const productId = target.closest("tr").dataset.id;
    emit("@delete", { id: productId });
  };

  productUpdateHandler = (target) => {
    const product = target.closest("tr");
    product.innerHTML = `
    <td><input id="edit-name-input" class="product-edit-input input" value='${product.dataset.name}' /></td>
    <td><input id="edit-price-input" class="product-edit-input input" value='${product.dataset.price}' type="number"/></td>
    <td><input id="edit-count-input" class="product-edit-input input" value='${product.dataset.count}' type="number"/></td>
    <td>
      <button class="save-button process-button">확인</button>
    </td>
    `;
  };

  productSubmitUpdateHandler = (target) => {
    const updatedProduct = target.closest("tr");

    const idx = Number(updatedProduct.dataset.id);
    const updatedName = updatedProduct.querySelector("#edit-name-input").value;
    const updatedPrice =
      updatedProduct.querySelector("#edit-price-input").valueAsNumber;
    const updatedCount =
      updatedProduct.querySelector("#edit-count-input").valueAsNumber;
    emit("@edit", {
      idx,
      name: updatedName,
      price: updatedPrice,
      count: updatedCount,
    });
  };

  renderInputForm = () => {
    this.$page.insertAdjacentHTML("beforeend", productTemplate.input());
  };

  renderProductStatus = (products) => {
    this.$productStatus.replaceChildren();
    this.$productStatus.insertAdjacentHTML(
      "beforeend",
      productTemplate.productStatus(products)
    );
  };
}

export default ProductPageView;
