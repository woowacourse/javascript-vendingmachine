import PurchaseInfo from "./PurchaseInfo";
import PurchaseView from "./PurchaseView";

class Purchase {
  purchaseInfo: PurchaseInfo;
  purchaseView: PurchaseView;

  constructor() {
    this.purchaseInfo = new PurchaseInfo();
    this.purchaseView = new PurchaseView();
  }
}

export default Purchase;
