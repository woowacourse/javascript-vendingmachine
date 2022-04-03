import { addEvent, selectDom } from "../../utils/dom";
import { verifyCharge } from "../../utils/validation";
import PurchaseInfo from "./PurchaseInfo";
import PurchaseView from "./PurchaseView";

class Purchase {
  purchaseInfo: PurchaseInfo;
  purchaseView: PurchaseView;
  insertMoneyForm: HTMLElement;
  insertMoneyInput: HTMLElement | HTMLInputElement;
  insertMoneyText: HTMLElement;
  purchasePossibleProductTable: HTMLElement;

  constructor() {
    this.purchaseInfo = new PurchaseInfo();
    this.purchaseView = new PurchaseView();
  }

  bindPurchaseDom() {
    this.insertMoneyForm = selectDom("#insert-money-form");
    this.insertMoneyInput = selectDom(".insert-money-input");
    this.insertMoneyText = selectDom("#insert-money-text");
    this.purchasePossibleProductTable = selectDom("#purchase-possible-product-table");
    addEvent(this.insertMoneyForm, "submit", this.handleInsertMoney);
    addEvent(this.purchasePossibleProductTable, "click", this.handlePurchaseProduct);
  }

  handleInsertMoney = (event: Event) => {
    event.preventDefault();
    const insertMoney = (this.insertMoneyInput as HTMLInputElement).valueAsNumber;
    verifyCharge(insertMoney);
    this.purchaseInfo.plusInsertMoney(insertMoney);
    this.purchaseView.showInsertMoney(this.purchaseInfo.getInsertMoney());
  }

  handlePurchaseProduct = (event: { target: HTMLTableElement }) => {
    if (event.target.classList.contains("product-purchase-button")) {
      const [productNameTd, productPriceTd] = Array.from(event.target.closest("tr").children);
      this.purchaseInfo.purchaseProduct({ productName: productNameTd.textContent, productPrice: productPriceTd.textContent });
      this.purchaseView.showInsertMoney(this.purchaseInfo.insertMoney);
      this.purchaseView.editPurchaseProductQuantity(productNameTd.textContent);
    }
  }

  render() {
    this.purchaseView.renderPurchaseView();
    this.purchaseView.showInsertMoney(this.purchaseInfo.insertMoney);
    this.purchaseView.showPurchasePossibleProduct(this.purchaseInfo.getProductList());
    this.bindPurchaseDom();
  }
}

export default Purchase;
