import { addEvent, emit, removeEvent } from "../util/event";

class ProductItem extends HTMLTableRowElement {
  constructor() {
    super();
    this.init();
    this.updateProduct({
      name: this.name,
      price: this.price,
      count: this.count,
    });
  }

  init() {
    this.$page = document.querySelector("#page");
    this.$itemName = this.querySelector("#item-name");
    this.$itemPrice = this.querySelector("#item-price");
    this.$itemCount = this.querySelector("#item-count");
    this.$editButton = this.querySelector(".edit-button");
    this.$deleteButton = this.querySelector(".delete-button");

    addEvent(this.$editButton, "click", this.changeItemToEditTemplate);
    addEvent(this.$deleteButton, "click", this.onDelete);
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

  get idx() {
    return this.getAttribute("idx");
  }

  connectedCallback() {
    addEvent(this.$page, "@update", (e) => {
      if (e.detail.idx === this.idx) {
        this.classList.remove("hidden");
        this.updateProduct(e.detail);
      }
    });
  }

  disconnectedCallback() {
    removeEvent(this.$editButton, "click", this.changeItemToEditTemplate);
    removeEvent(this.$deleteButton, "click", this.onDelete);
  }

  updateProduct = ({ name, price, count }) => {
    this.$itemName.innerText = name;
    this.$itemPrice.innerText = price;
    this.$itemCount.innerText = count;
  };

  changeItemToEditTemplate = () => {
    this.classList.add("hidden");
    emit(this.$page, "@renderedit", { idx: this.idx });
  };

  onDelete = () => {
    this.remove();
  };
}

customElements.define("product-item", ProductItem, { extends: "tr" });
