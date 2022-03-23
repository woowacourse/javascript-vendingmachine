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
  };

  productDeleteHandler = (target) => {
    const productId = target.closest("tr").dataset.id;
    emit("@delete", { id: productId });
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
