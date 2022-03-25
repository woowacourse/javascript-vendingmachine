import { ProductManageView } from './ProductManageView';
import { BalanceChargeView } from './BalanceChargeView';
import { URL_PATH } from '../utils/constants';

export class NavView {
  productManageNavBtn: HTMLButtonElement;
  balanceChargeNavBtn: HTMLButtonElement;
  productPurchaseNavBtn: HTMLButtonElement;
  productManageView: ProductManageView;
  balanceChargeView: BalanceChargeView;

  constructor() {
    this.productManageView = new ProductManageView();
    this.balanceChargeView = new BalanceChargeView();

    this.contentsContainer = document.querySelector('#contents-container');
    this.productManageNavBtn = document.querySelector('#product-manage-nav-button');
    this.balanceChargeNavBtn = document.querySelector('#charge-balance-nav-button');
    this.productPurchaseNavBtn = document.querySelector('#product-purchase-nav-button');

    this.productManageNavBtn.addEventListener('click', this.handleShowProductManageTab);
    this.balanceChargeNavBtn.addEventListener('click', this.handleShowBalanceChargeTab);

    window.addEventListener('popstate', (savedData) => {
      this.handlePopstate(savedData);
    });

    this.renderHome();
  }

  handlePopstate = (savedData) => {
    if (savedData.state.path === URL_PATH.HOME) {
      this.renderHome();

      return;
    }

    if (savedData.state.path === URL_PATH.PRODUCT_MANAGE) {
      this.productManageView.init();
      this.productManageView.renderAll();

      return;
    }

    if (savedData.state.path === URL_PATH.BALANCE_CHAREGE) {
      this.balanceChargeView.init();
      this.balanceChargeView.renderAll();

      return;
    }
  };

  handleShowProductManageTab = () => {
    this.productManageView.init();
    this.productManageView.renderAll();

    const path = URL_PATH.PRODUCT_MANAGE;
    history.pushState({ path }, null, path);
  };

  handleShowBalanceChargeTab = () => {
    this.balanceChargeView.init();
    this.balanceChargeView.renderAll();

    const path = URL_PATH.BALANCE_CHAREGE;
    history.pushState({ path }, null, path);
  };

  contentsContainer: HTMLDivElement;
  renderHome() {
    const path = URL_PATH.HOME;

    history.pushState({ path }, null, path);
    this.contentsContainer.textContent = '';
  }
}
