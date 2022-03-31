import changesTemplate from "../template/changes.template";
import { $, createElement } from "../util/dom";
import { emit, on, remove } from "../util/event";
import { EVENT_TYPE } from "../constant";

class ChangePageView {
  init = () => {
    this.$page = $("#page");
    this.$page.replaceChildren();
    this.$formContainer = createElement(
      "form",
      {
        id: "changes-form",
        class: "form",
      },
      changesTemplate.input()
    );
    this.$changesStatusContainer = createElement(
      "section",
      {
        id: "changes-status",
      },
      changesTemplate.changesTable()
    );
    this.$currentChangesContainer = createElement("p", {
      id: "current-changes",
    });
    this.$page.appendChild(this.$formContainer);
    this.$page.appendChild(this.$currentChangesContainer);
    this.$page.appendChild(this.$changesStatusContainer);
    this.$changesInput = $("#changes-input");
    this.$changesList = $("#changes-list", this.$changesStatusContainer);
    this.bindEvent();
  };

  bindEvent = () => {
    on(this.$formContainer, "submit", this.changesSubmitHandler);
  };

  changesSubmitHandler = (e) => {
    e.preventDefault();
    emit(EVENT_TYPE.CHARGE, { money: this.$changesInput.valueAsNumber });
    this.$changesInput.value = "";
  };

  renderCurrentChanges = (changes) => {
    this.$currentChangesContainer.innerText = `현재 보유 금액: ${changes}`;
  };

  renderChangeStatus = (coinStatus) => {
    this.$changesList.replaceChildren();
    this.$changesList.insertAdjacentHTML(
      "beforeend",
      changesTemplate.changeStatus(coinStatus)
    );
  };
}

export default ChangePageView;
