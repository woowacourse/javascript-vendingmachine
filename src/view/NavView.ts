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

    this.renderHome();

    window.addEventListener('popstate', (savedData) => {
      if (savedData.state.path === '/') {
        this.renderHome();
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
    this.productManageView.init();
    this.productManageView.renderAll();

    const path = '/productManage';
    history.pushState({ path }, null, path);
  };

  handleShowBalanceChargeTab = () => {
    this.balanceChargeView.init();
    this.balanceChargeView.renderAll();

    const path = '/balanceCharge';
    history.pushState({ path }, null, path);
  };

  handleShowProductPurchaseTab = () => {};

  contentsContainer: HTMLDivElement;
  renderHome() {
    const path = '/';
    history.pushState({ path }, null, path);
    this.contentsContainer = document.querySelector('#contents-container');
    this.contentsContainer.textContent = '';
  }
}
