import changesTemplate from "../template/changes.template";
import { emit, on } from "../util/event";

class ChangePageView {
  constructor() {
    this.$page = document.querySelector("#page");
    this.bindEvent();
  }

  bindEvent = () => {
    on(this.$page, "submit", this.changesSubmitHandler);
  };

  renderInput() {
    this.$page.replaceChildren();
    this.$page.insertAdjacentHTML("beforeend", changesTemplate.input());
  }

  changesSubmitHandler = (e) => {
    if (e.target.id !== "changes-form") return;

    e.preventDefault();

    emit("@charge", { money: this.$changesInput.valueAsNumber });
  };

  initDOM = () => {
    this.$changesForm = document.querySelector("#changes-form");
    this.$changesInput = document.querySelector("#changes-input");
    this.$haveChanges = document.querySelector("#have-changes");
    this.$changesTableBody = document.querySelector("#changes-table-body");
  };

  renderHaveChanges = (changes) => {
    this.$haveChanges.innerText = `현재 보유 금액: ${changes}`;
  };

  renderChangesTable = () => {
    this.$page.insertAdjacentHTML("beforeend", changesTemplate.changesTable());
  };

  renderChangeStatus = (coinStatus) => {
    this.$changesTableBody.replaceChildren();
    this.$changesTableBody.insertAdjacentHTML(
      "beforeend",
      changesTemplate.changeStatus(coinStatus)
    );
  };
}

export default ChangePageView;
