import { ProductManageView } from './ProductManageView';
import { ChargeBalanceView } from './ChargeBalanceView';

export class NavView {
  productManageNavBtn: HTMLButtonElement;
  chargeBalanceNavBtn: HTMLButtonElement;
  productPurchaseNavBtn: HTMLButtonElement;
  productManageView: ProductManageView;
  chargeBalanceView: ChargeBalanceView;

  constructor() {
    this.productManageNavBtn = document.querySelector('#product-manage-nav-button');
    this.chargeBalanceNavBtn = document.querySelector('#charge-balance-nav-button');
    this.productPurchaseNavBtn = document.querySelector('#product-purchase-nav-button');

    this.productManageNavBtn.addEventListener('click', this.handleShowProductManageTab);
    this.chargeBalanceNavBtn.addEventListener('click', this.handleShowChargeBalanceTab);
    this.productPurchaseNavBtn.addEventListener('click', this.handleShowProductPurchaseTab);

    window.addEventListener('popstate', (savedData) => {
      if (savedData.state === null) {
      } else {
      }
    });
  }

  handleShowProductManageTab = () => {
    this.productManageView = new ProductManageView();
  };

  handleShowChargeBalanceTab = () => {
    this.chargeBalanceView = new ChargeBalanceView();
  };

  handleShowProductPurchaseTab = () => {};
}
