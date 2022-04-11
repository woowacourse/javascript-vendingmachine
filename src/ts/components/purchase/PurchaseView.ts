import { selectDom, selectDomAll } from "../../utils/dom";
import { CoinsProps, ProductProps } from "../../utils/interface";
import { purchasePossibleProductTemplate, purchaseTemplate } from "./purchaseTemplate";

class PurchaseView {
  vendingmachineFunctionWrap: HTMLElement;

  constructor() {
    this.vendingmachineFunctionWrap = selectDom(".main");
  }

  showInsertMoney(totalMoney: number) {
    const insertMoneyText = selectDom("#insert-money-text", this.vendingmachineFunctionWrap);
    insertMoneyText.textContent = `${totalMoney}`;
  }

  showPurchasePossibleProduct(productList: ProductProps[]) {
    const purchasePossibleProductTable = selectDom("#purchase-possible-product-table", this.vendingmachineFunctionWrap);
    purchasePossibleProductTable.insertAdjacentHTML(
      "beforeend",
      productList.map((product) => purchasePossibleProductTemplate(product)).join(" ")
    );
  }

  editPurchaseProductQuantity(productName: string) {
    const [, , productQuantity, purchaseButton] = Array.from(
      selectDomAll(".product-name", this.vendingmachineFunctionWrap)
        .find((productNameTd) => productNameTd.textContent === productName)
        .closest("tr")
        .children)
      productQuantity.textContent = `${+productQuantity.textContent - 1}`;

    if (+productQuantity.textContent === 0) {
      purchaseButton.textContent = "품절";
    }
  }

  showReturnCharge(returnCoinsKindCount: CoinsProps) {
    const returnChargeCoinCount = selectDomAll(".return-coin-count", this.vendingmachineFunctionWrap);
    const returnCoinsResult = Object.values(returnCoinsKindCount).reverse();
    returnChargeCoinCount.forEach((returnCoinCount, index) =>
      (returnCoinCount.innerText = `${returnCoinsResult[index]}개`));
  }

  renderPurchaseView() {
    this.vendingmachineFunctionWrap.replaceChildren();
    this.vendingmachineFunctionWrap.insertAdjacentHTML("beforeend", purchaseTemplate);
  }
}

export default PurchaseView;
