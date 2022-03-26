import changesTemplate from "../template/changes.template";
import { emit, addEvent } from "../util/event";
import { EVENT_TYPE } from "../constant";

class ChangePageView {
  constructor(target) {
    this.$page = target;
    this.bindEvent();
  }

  bindEvent = () => {
    addEvent(this.$page, "submit", this.changesSubmitHandler);
  };

  renderInput() {
    this.$page.replaceChildren();
    this.$page.insertAdjacentHTML("beforeend", changesTemplate.input());
  }

  changesSubmitHandler = (e) => {
    if (e.target.id !== "changes-form") return;

    e.preventDefault();

    emit(this.$page, EVENT_TYPE.CHARGE, {
      money: this.$changesInput.valueAsNumber,
    });
    this.$changesInput.value = "";
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
