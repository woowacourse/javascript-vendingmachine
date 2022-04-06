import { productProcessMachine } from "../domain/productProcessMachine";
import { productPurchaseMachine } from "../domain/productPurchaseMachine";
import { emit } from "../util/event";
import showSnackbar from "../util/snackbar";

class ProductPurchaseItem extends HTMLTableRowElement {
  constructor() {
    super();
    this.init();
    this.$page = document.querySelector("#page");
    this.$snackbar = document.querySelector("#snackbar");
    this.updatedProduct({
      name: this.name,
      price: this.price,
      count: this.count,
    });
  }

  get name() {
    return this.getAttribute("name");
  }

  get price() {
    return this.getAttribute("price");
  }

  get count() {
    return this.getAttribute("count");
  }

  init() {
    this.$itemName = this.querySelector("#item-name");
    this.$itemPrice = this.querySelector("#item-price");
    this.$itemCount = this.querySelector("#item-count");
    this.$purchaseButton = this.querySelector("#purchase-button");
    this.$purchaseButton.addEventListener("click", this.purchaseProduct);
  }

  purchaseProduct = () => {
    const itemName = this.$itemName.innerText;
    const itemPrice = Number(this.$itemPrice.innerText);
    const itemCount = Number(this.$itemCount.innerText);

    try {
      productPurchaseMachine.spend(itemPrice, itemCount);
      const updatedProduct = productProcessMachine.buy(itemName);
      this.updatedProduct(updatedProduct);
      emit(this.$page, "@updateamount");
    } catch (err) {
      showSnackbar(this.$snackbar, err.message);
    }
  };

  updatedProduct = ({ name, price, count }) => {
    this.$itemName.innerText = name;
    this.$itemPrice.innerText = price;
    this.$itemCount.innerText = count;
  };
}

customElements.define("product-purchase-item", ProductPurchaseItem, {
  extends: "tr",
});
