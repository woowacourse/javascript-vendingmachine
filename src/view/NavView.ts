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

    this.productManageView = new ProductManageView();
    this.balanceChargeView = new BalanceChargeView();

    window.addEventListener('popstate', (savedData) => {
      if (savedData.state === null) {
        this.productManageView.init();
        this.productManageView.renderAll();
      }
      if (savedData.state.path === '/productManage') {
        this.productManageView.init();
        this.productManageView.renderAll();
      }
      if (savedData.state.path === '/balanceCharge') {
        this.balanceChargeView.init();
        this.balanceChargeView.renderAll();
      }
    });
  }

  handleShowProductManageTab = () => {
    //url 뒤에 선택자? 로 넣어주기
    this.productManageView.init();
    this.productManageView.renderAll();

    const path = '/productManage';
    history.pushState({ path }, null, path);
  };

  handleShowBalanceChargeTab = () => {
    //url 뒤에 선택자? 로 넣어주기
    this.balanceChargeView.init();
    this.balanceChargeView.renderAll();

    const path = '/balanceCharge';
    history.pushState({ path }, null, path);
  };

  handleShowProductPurchaseTab = () => {};
}

// console.log(window.location.pathname);

// if (window.location.pathname === '/productManage') {
//   this.handleShowProductManageTab();
// }

// if (window.location.pathname === '/') {
//   this.handleShowProductManageTab();
// }
// if (window.location.pathname === '/balanceCharge') {
//   this.handleShowProductManageTab();
// }
