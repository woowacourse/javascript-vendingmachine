import changesTemplate from "../template/changes.template";
import { $ } from "../util/dom";
import { emit, on } from "../util/event";
import { EVENT_TYPE } from "../constant";

class ChangePageView {
  constructor() {
    this.$page = $("#page");
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

    emit(EVENT_TYPE.CHARGE, { money: this.$changesInput.valueAsNumber });
    this.$changesInput.value = "";
  };

  initDOM = () => {
    this.$changesForm = $("#changes-form");
    this.$changesInput = $("#changes-input");
    this.$haveChanges = $("#have-changes");
    this.$changesTableBody = $("#changes-table-body");
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
