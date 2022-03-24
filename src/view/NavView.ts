import { ProductManageView } from './ProductManageView';
import { BalanceChargeView } from './BalanceChargeView';

export class NavView {
  productManageNavBtn: HTMLButtonElement;
  balanceChargeNavBtn: HTMLButtonElement;
  productPurchaseNavBtn: HTMLButtonElement;
  productManageView: ProductManageView;
  balanceChargeView: BalanceChargeView;

  constructor() {
    this.productManageNavBtn = document.querySelector('#product-manage-nav-button');
    this.balanceChargeNavBtn = document.querySelector('#charge-balance-nav-button');
    this.productPurchaseNavBtn = document.querySelector('#product-purchase-nav-button');

    this.productManageNavBtn.addEventListener('click', this.handleShowProductManageTab);
    this.balanceChargeNavBtn.addEventListener('click', this.handleShowBalanceChargeTab);
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

  handleShowBalanceChargeTab = () => {
    this.balanceChargeView = new BalanceChargeView();
  };

  handleShowProductPurchaseTab = () => {};
}
