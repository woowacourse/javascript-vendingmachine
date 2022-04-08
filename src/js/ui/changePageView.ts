import changesTemplate from "../template/changes.template";
import { $, createElement } from "../util/dom";
import { emit, on } from "../util/event";
import { EVENT_TYPE } from "../constant";
import { TCoin } from "../interface/vendingMachine.interface";
import { IChargeChangesEvent } from "../type";
import headerTemplate from "../template/header.template";

class ChangePageView {
  $page;
  $header;
  $formContainer;
  $changesStatusContainer;
  $currentChangesContainer;
  $changesInput;
  $changesList;
  $userInfoContainer;

  init() {
    this.$page = $("#page");
    this.$header = $("#header");
    this.$page.replaceChildren();
    this.$header.replaceChildren();
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
      class: "current-status",
    });
    this.$page.appendChild(this.$formContainer);
    this.$page.appendChild(this.$currentChangesContainer);
    this.$page.appendChild(this.$changesStatusContainer);

    this.$userInfoContainer = $("#user-info", this.$header);
    this.$changesInput = $("#changes-input");
    this.$changesList = $("#changes-list", this.$changesStatusContainer);

    this.bindEvent();
  }

  bindEvent() {
    on<IChargeChangesEvent>(
      this.$formContainer,
      "submit",
      this.changesSubmitHandler
    );
  }

  changesSubmitHandler = (e: Event) => {
    e.preventDefault();
    emit<IChargeChangesEvent>(EVENT_TYPE.CHARGE, {
      money: this.$changesInput.valueAsNumber,
    });
    this.$changesInput.value = "";
  };

  renderHeader(userInfo) {
    this.$header.insertAdjacentHTML(
      "beforeend",
      headerTemplate.loggedIn(userInfo.name[0])
    );
  }

  renderCurrentChanges(changes: number) {
    this.$currentChangesContainer.innerText = `현재 보유 금액: ${changes}`;
  }

  renderCoinStatus(coinStatus: TCoin) {
    this.$changesList.replaceChildren();
    this.$changesList.insertAdjacentHTML(
      "beforeend",
      changesTemplate.changeStatus(coinStatus)
    );
  }
}

export default ChangePageView;
