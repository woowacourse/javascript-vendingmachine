import { productProcessMachine } from "../domain/productProcessMachine";
import { addEvent, emit, removeEvent } from "../util/event";
import showSnackbar from "../util/snackbar";
class ProductEditForm extends HTMLTableRowElement {
  constructor() {
    super();
    this.$page = document.querySelector("#page");
    this.$snackbar = document.querySelector("#snackbar");

    this.$saveButton = this.querySelector(".save-button");
    this.$editNameInput = this.querySelector("#edit-name-input");
    this.$editPriceInput = this.querySelector("#edit-price-input");
    this.$editCountInput = this.querySelector("#edit-count-input");
    addEvent(this.$saveButton, "click", this.onEdit);
    addEvent(this.$page, "@renderedit", (e) => this.renderEditForm(e.detail));
  }

  disconnectedCallback() {
    removeEvent(this.$saveButton, "click", this.onEdit);
  }

  onEdit = () => {
    const idx = this.getAttribute("idx");
    const updatedName = this.$editNameInput.value;
    const updatedPrice = this.$editPriceInput.valueAsNumber;
    const updatedCount = this.$editCountInput.valueAsNumber;

    try {
      productProcessMachine.update(
        idx,
        updatedName,
        updatedPrice,
        updatedCount
      );

      emit(this.$page, "@update", {
        idx,
        name: updatedName,
        price: updatedPrice,
        count: updatedCount,
      });
      this.classList.add("hidden");
    } catch (err) {
      showSnackbar(this.$snackbar, err.message);
    }
  };

  renderEditForm = ({ idx }) => {
    if (idx === this.getAttribute("idx")) {
      this.classList.remove("hidden");
    }
  };
}

customElements.define("edit-form", ProductEditForm, { extends: "tr" });
