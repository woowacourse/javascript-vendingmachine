import { on, emit } from "../util/event";
import { $, createElement } from "../util/dom";
import purchaseTemplate from "../template/purchase.template";
import headerTemplate from "../template/header.template";
import { ISingleProduct } from "../interface/product.interface";
import { TCoin } from "../interface/vendingMachine.interface";
import { EVENT_TYPE } from "../constant";
import { IPurchaseProductEvent, IInputMoneyEvent } from "../type";

class PurchasePageView {
  $page;
  $header;
  $formContainer;
  $currentChargedMoneyContainer;
  $chargeMoneyInput;
  $purchaseableProductsContainer;
  $productList;
  $returnedChangesContainer;
  $changesList;
  $returnChangesButton;

  init() {
    this.$page = $("#page");
    this.$header = $("#header");
    this.$page.replaceChildren();
    this.$header.replaceChildren();
    this.$formContainer = createElement(
      "form",
      {
        id: "charge-money-form",
        class: "form",
      },
      purchaseTemplate.input()
    );
    this.$currentChargedMoneyContainer = createElement("p", {
      id: "current-charged-money",
    });

    this.$purchaseableProductsContainer = createElement(
      "section",
      {
        id: "purchaseable-products",
      },
      purchaseTemplate.purchaseableProductsTable()
    );

    this.$returnedChangesContainer = createElement(
      "section",
      {
        id: "returned-changes",
      },
      purchaseTemplate.returnedChangesTable()
    );

    this.$returnChangesButton = createElement(
      "button",
      {
        id: "returned-changes",
        class: "process-button",
      },
      "반환하기"
    );

    this.$page.appendChild(this.$formContainer);
    this.$page.appendChild(this.$currentChargedMoneyContainer);
    this.$page.appendChild(this.$purchaseableProductsContainer);
    this.$page.appendChild(this.$returnedChangesContainer);
    this.$page.appendChild(this.$returnChangesButton);

    this.$productList = $(
      "#products-list",
      this.$purchaseableProductsContainer
    );
    this.$changesList = $("#changes-list", this.$returnedChangesContainer);
    this.$chargeMoneyInput = $("#charge-money-input");

    this.bindEvent();
  }

  bindEvent() {
    on(this.$formContainer, "submit", this.moneySubmitHandler);
    on(this.$productList, "click", this.purchaseHandler);
    on(this.$returnChangesButton, "click", this.returnChangesHandler);
  }

  purchaseHandler = (e: Event) => {
    const target = e.target as HTMLElement;
    const productId = target.closest("tr").dataset.id;
    emit<IPurchaseProductEvent>(EVENT_TYPE.PURCHASE, { id: productId });
  };

  returnChangesHandler = () => {
    emit<unknown>(EVENT_TYPE.RETURN, {});
  };

  moneySubmitHandler = (e: Event) => {
    e.preventDefault();
    emit<IInputMoneyEvent>(EVENT_TYPE.INPUT, {
      money: this.$chargeMoneyInput.valueAsNumber,
    });
    this.$chargeMoneyInput.value = "";
  };

  renderHeader(userInfo) {
    if (userInfo.isError) {
      this.$header.insertAdjacentHTML("beforeend", headerTemplate.loggedOut());
      return;
    }
    this.$header.insertAdjacentHTML(
      "beforeend",
      headerTemplate.loggedIn(userInfo.name[0])
    );
  }

  renderCurrentChargedMoney(changes: number) {
    this.$currentChargedMoneyContainer.innerText = `투입 한 금액 : ${changes}`;
  }

  renderPurchaseableProducts(products: ISingleProduct[]) {
    this.$productList.replaceChildren();
    const productsList = products
      .map((product) => purchaseTemplate.product(product.get()))
      .join("");
    this.$productList.insertAdjacentHTML("beforeend", productsList);
  }

  renderReturnedChanges(changes: TCoin) {
    this.$changesList.replaceChildren();
    this.$changesList.insertAdjacentHTML(
      "beforeend",
      purchaseTemplate.changes(changes)
    );
  }
}

export default PurchasePageView;
