import { ProductManageView } from './ProductManageView';
import { BalanceChargeView } from './BalanceChargeView';

export class NavView {
  productManageNavBtn: HTMLButtonElement;
  balanceChargeNavBtn: HTMLButtonElement;
  productPurchaseNavBtn: HTMLButtonElement;
  productManageView: ProductManageView;
  balanceChargeView: BalanceChargeView;

  constructor() {
    this.productManageView = new ProductManageView();
    this.balanceChargeView = new BalanceChargeView();

    this.productManageNavBtn = document.querySelector('#product-manage-nav-button');
    this.balanceChargeNavBtn = document.querySelector('#charge-balance-nav-button');
    this.productPurchaseNavBtn = document.querySelector('#product-purchase-nav-button');

    this.productManageNavBtn.addEventListener('click', this.handleShowProductManageTab);
    this.balanceChargeNavBtn.addEventListener('click', this.handleShowBalanceChargeTab);

    this.renderHome();
    window.addEventListener('popstate', (savedData) => {
      this.handlePopstate(savedData);
    });
  }

  handlePopstate = (savedData) => {
    if (savedData.state.path === '/') {
      this.renderHome();
    }
    if (savedData.state.path === '/productManage') {
      this.productManageView.eraseAll();
      this.productManageView.renderAll();
    }
    if (savedData.state.path === '/balanceCharge') {
      this.balanceChargeView.eraseAll();
      this.balanceChargeView.renderAll();
    }
  };

  handleShowProductManageTab = () => {
    this.productManageView.eraseAll();
    this.productManageView.renderAll();

    const path = '/productManage';
    history.pushState({ path }, null, path);
  };

  handleShowBalanceChargeTab = () => {
    this.balanceChargeView.eraseAll();
    this.balanceChargeView.renderAll();

    const path = '/balanceCharge';
    history.pushState({ path }, null, path);
  };

  contentsContainer: HTMLDivElement;
  renderHome() {
    const path = '/';
    history.pushState({ path }, null, path);
    this.contentsContainer = document.querySelector('#contents-container');
    this.contentsContainer.textContent = '';
  }
}
