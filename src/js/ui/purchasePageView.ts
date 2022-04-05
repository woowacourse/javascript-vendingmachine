import { on, emit } from "../util/event";
import { $, createElement } from "../util/dom";
import purchaseTemplate from "../template/purchase.template";
import { ISingleProduct } from "../interface/product.interface";
import { TCoin } from "../interface/vendingMachine.interface";
import productTemplate from "../template/product.template";
import { EVENT_TYPE } from "../constant";

class PurchasePageView {
  $page;
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
    this.$page.replaceChildren();
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
  }

  moneySubmitHandler = (e: Event): void => {
    e.preventDefault();
    emit<any>(EVENT_TYPE.INPUT, {
      money: this.$chargeMoneyInput.valueAsNumber,
    });
    this.$chargeMoneyInput.value = "";
  };

  renderCurrentChargedMoney(changes: number): void {
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
    this.$changesList.insertAdjacentHTML(
      "beforeend",
      purchaseTemplate.changes(changes)
    );
  }
}

export default PurchasePageView;
