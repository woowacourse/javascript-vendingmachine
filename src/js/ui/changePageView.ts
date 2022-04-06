import changesTemplate from "../template/changes.template";
import { $, createElement } from "../util/dom";
import { emit, on } from "../util/event";
import { EVENT_TYPE } from "../constant";
import { TCoin } from "../interface/vendingMachine.interface";
import { IChargeChangesEvent } from "../type";

class ChangePageView {
  $page;
  $header;
  $formContainer;
  $changesStatusContainer;
  $currentChangesContainer;
  $changesInput;
  $changesList;
  $userInfoContainer;

  init(): void {
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
    });
    this.$page.appendChild(this.$formContainer);
    this.$page.appendChild(this.$currentChangesContainer);
    this.$page.appendChild(this.$changesStatusContainer);

    this.$header.insertAdjacentHTML(
      "beforeend",
      `<h2>자판기</h2>
      <button id="nav-button">로그아웃</button>
      <section id="user-info">user Info</section>
      <nav id="page-tab-container">
        <a class="nav-button product-management-button" href="#!productManagement">
        상품 관리
        </a>
        <a class="nav-button changes-charge-button" href="#!changesCharge">
          잔돈 충전
        </a>
        <a class="nav-button product-purchase-button" href="#!purchaseProduct">
          상품 구매
        </a>
      </nav>
      `
    );

    this.$userInfoContainer = $("#user-info", this.$header);
    this.$changesInput = $("#changes-input");
    this.$changesList = $("#changes-list", this.$changesStatusContainer);

    this.bindEvent();
  }

  bindEvent(): void {
    on<IChargeChangesEvent>(
      this.$formContainer,
      "submit",
      this.changesSubmitHandler
    );
  }

  changesSubmitHandler = (e: Event): void => {
    e.preventDefault();
    emit<IChargeChangesEvent>(EVENT_TYPE.CHARGE, {
      money: this.$changesInput.valueAsNumber,
    });
    this.$changesInput.value = "";
  };

  renderCurrentChanges(changes: number): void {
    this.$currentChangesContainer.innerText = `현재 보유 금액: ${changes}`;
  }

  renderCoinStatus(coinStatus: TCoin): void {
    this.$changesList.replaceChildren();
    this.$changesList.insertAdjacentHTML(
      "beforeend",
      changesTemplate.changeStatus(coinStatus)
    );
  }
}

export default ChangePageView;
