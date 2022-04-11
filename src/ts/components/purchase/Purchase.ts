import { addEvent, selectDom } from "../../utils/dom";
import { validateCharge } from "../../utils/validation";
import { showSnackbar } from "../snackbar/snackbar";
import { insertMoneyText, purchaseProductText } from "../snackbar/snackbarTemplate";
import PurchaseInfo from "./PurchaseInfo";
import PurchaseView from "./PurchaseView";

class Purchase {
  purchaseInfo: PurchaseInfo;
  purchaseView: PurchaseView;
  insertMoneyInput: HTMLElement | HTMLInputElement;
  insertMoneyText: HTMLElement;

  constructor() {
    this.purchaseInfo = new PurchaseInfo();
    this.purchaseView = new PurchaseView();
  }

  bindPurchaseDom() {
    const insertMoneyForm = selectDom("#insert-money-form");
    const purchasePossibleProductTable = selectDom("#purchase-possible-product-table");
    const returnMoneyButton = selectDom("#return-money-button");
    this.insertMoneyInput = selectDom(".insert-money-input", insertMoneyForm);
    this.insertMoneyText = selectDom("#insert-money-text");

    addEvent(insertMoneyForm, "submit", this.handleInsertMoney);
    addEvent(purchasePossibleProductTable, "click", this.handlePurchaseProduct);
    addEvent(returnMoneyButton, "click", this.handleReturnMoney);
  }

  handleInsertMoney = (event: Event) => {
    event.preventDefault();
    const insertMoney = (this.insertMoneyInput as HTMLInputElement).valueAsNumber;
    validateCharge(insertMoney);
    showSnackbar(insertMoneyText(insertMoney));
    this.purchaseInfo.plusInsertMoney(insertMoney);
    this.purchaseView.showInsertMoney(this.purchaseInfo.getInsertMoney());
  }

  handlePurchaseProduct = (event: { target: HTMLTableElement }) => {
    if (event.target.classList.contains("product-purchase-button")) {
      const [productNameTd, productPriceTd] = Array.from(event.target.closest("tr").children);
      this.purchaseInfo.purchaseProduct({ productName: productNameTd.textContent, productPrice: +productPriceTd.textContent });
      showSnackbar(purchaseProductText(productNameTd.textContent));
      this.purchaseView.showInsertMoney(this.purchaseInfo.insertMoney);
      this.purchaseView.editPurchaseProductQuantity(productNameTd.textContent);
    }
  }

  handleReturnMoney = () => {
    this.purchaseInfo.returnCharge();
    this.purchaseView.showReturnCharge(this.purchaseInfo.returnCoinsKindCount);
    this.purchaseView.showInsertMoney(this.purchaseInfo.insertMoney);
  }

  render() {
    this.purchaseView.renderPurchaseView();
    this.purchaseView.showInsertMoney(this.purchaseInfo.insertMoney);
    this.purchaseInfo.updateProductList();
    this.purchaseView.showPurchasePossibleProduct(this.purchaseInfo.productList);
    this.bindPurchaseDom();
  }
}

export default Purchase;
