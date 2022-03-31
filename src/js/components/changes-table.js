import { changesProcessMachine } from "../domain/changesProcessMachine";
import { addEvent } from "../util/event";

class ChangesTable extends HTMLElement {
  constructor() {
    super();
    this.$page = document.querySelector("#page");
    this.attachShadow({ mode: "open" });
    this.render();
    this.init();
    this.renderTableStatus();
  }

  init() {
    this.$coin500 = this.shadowRoot.querySelector("#coin-500");
    this.$coin100 = this.shadowRoot.querySelector("#coin-100");
    this.$coin50 = this.shadowRoot.querySelector("#coin-50");
    this.$coin10 = this.shadowRoot.querySelector("#coin-10");
    addEvent(this.$page, "@charge", () => this.renderTableStatus());
  }

  renderTableStatus = () => {
    const coins = changesProcessMachine.getCoins();
    this.$coin500.innerText = coins["500"];
    this.$coin100.innerText = coins["100"];
    this.$coin50.innerText = coins["50"];
    this.$coin10.innerText = coins["10"];
  };

  render() {
    const template = document.querySelector("#changes-table-template").content;
    const cloneNode = template.cloneNode(true);
    this.shadowRoot.appendChild(cloneNode);
  }
}

customElements.define("changes-table", ChangesTable);
