import { productProcessMachine } from "../domain/productProcessMachine";
import { emit } from "../util/event";
class ProductEditForm extends HTMLTableRowElement {
  constructor() {
    super();
    this.$page = document.querySelector("#page");
    this.$saveButton = this.querySelector(".save-button");
    this.$editNameInput = this.querySelector("#edit-name-input");
    this.$editPriceInput = this.querySelector("#edit-price-input");
    this.$editCountInput = this.querySelector("#edit-count-input");

    this.$saveButton.addEventListener("click", this.onEdit);
    this.$page.addEventListener("@renderedit", (e) =>
      this.renderEditForm(e.detail)
    );
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
      alert(err.message);
    }
  };

  renderEditForm = ({ idx }) => {
    if (idx === this.getAttribute("idx")) {
      this.classList.remove("hidden");
    }
  };
}

customElements.define("edit-form", ProductEditForm, { extends: "tr" });
