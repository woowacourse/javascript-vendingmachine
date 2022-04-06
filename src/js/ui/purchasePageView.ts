import { on, emit } from "../util/event";
import { $, createElement } from "../util/dom";
import purchaseTemplate from "../template/purchase.template";
import { ISingleProduct } from "../interface/product.interface";
import { TCoin } from "../interface/vendingMachine.interface";
import { EVENT_TYPE } from "../constant";

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

  purchaseHandler = (e: Event): void => {
    const target = e.target as HTMLElement;
    const productId = target.closest("tr").dataset.id;
    emit<any>(EVENT_TYPE.PURCHASE, { id: productId });
  };

  returnChangesHandler = (): void => {
    emit<any>(EVENT_TYPE.RETURN, {});
  };

  moneySubmitHandler = (e: Event): void => {
    e.preventDefault();
    emit<any>(EVENT_TYPE.INPUT, {
      money: this.$chargeMoneyInput.valueAsNumber,
    });
    this.$chargeMoneyInput.value = "";
  };

  renderHeader(userInfo) {
    if (userInfo.isError) {
      this.$header.insertAdjacentHTML(
        "beforeend",
        `<h2>자판기</h2>
        <a class="nav-button" href="#!login">
        로그인
        </a>
        `
      );
      return;
    }
    this.$header.insertAdjacentHTML(
      "beforeend",
      `<h2>자판기</h2>
      <button id="nav-button">로그아웃</button>ㄴ
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
  }

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
    this.$changesList.replaceChildren();
    this.$changesList.insertAdjacentHTML(
      "beforeend",
      purchaseTemplate.changes(changes)
    );
  }
}

export default PurchasePageView;
