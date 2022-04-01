import { changesProcessMachine } from "../domain/changesProcessMachine";
import { emit } from "../util/event";

class ChangesInput extends HTMLElement {
  constructor() {
    super();
    this.$page = document.querySelector("#page");
    this.attachShadow({ mode: "open" });
    this.render();
  }

  connectedCallback() {
    this.$haveChanges = this.shadowRoot.querySelector("#have-changes");
    this.$changesForm = this.shadowRoot.querySelector("#changes-form");
    this.$changesInput = this.shadowRoot.querySelector("#changes-input");
    this.$changesForm.addEventListener("submit", this.onSubmit);

    this.renderHaveChanges();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const money = this.$changesInput.valueAsNumber;
    try {
      changesProcessMachine.charge(money);

      this.renderHaveChanges();

      emit(this.$page, "@mutateChanges");
    } catch (err) {
      alert(err.message);
    }
  };

  renderHaveChanges() {
    const changes = changesProcessMachine.getTotalChanges();

    this.$haveChanges.innerText = `현재 보유 금액: ${changes}원`;
  }

  render() {
    const template = document.querySelector("#changes-template").content;
    const cloneNode = template.cloneNode(true);
    this.shadowRoot.appendChild(cloneNode);
  }
}

customElements.define("changes-input", ChangesInput);
