import { ProductManageView } from './ProductManageView';
import { BalanceChargeView } from './BalanceChargeView';
import { URL_PATH } from '../utils/constants';

export class NavView {
  private productManageNavBtn: HTMLButtonElement;
  private balanceChargeNavBtn: HTMLButtonElement;
  private productManageView: ProductManageView;
  private balanceChargeView: BalanceChargeView;
  private contentsContainer: HTMLDivElement;

  constructor() {
    this.productManageView = new ProductManageView();
    this.balanceChargeView = new BalanceChargeView();

    this.contentsContainer = document.querySelector('#contents-container');
    this.productManageNavBtn = document.querySelector('#product-manage-nav-button');
    this.balanceChargeNavBtn = document.querySelector('#charge-balance-nav-button');

    this.productManageNavBtn.addEventListener('click', this.handleShowProductManageTab);
    this.balanceChargeNavBtn.addEventListener('click', this.handleShowBalanceChargeTab);

    window.addEventListener('popstate', (savedData) => {
      this.handlePopstate(savedData);
    });

    this.renderHome();
  }

  private handlePopstate = (savedData) => {
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

  private handleShowProductManageTab = () => {
    this.productManageView.init();
    this.productManageView.renderAll();

    const path = URL_PATH.PRODUCT_MANAGE;
    this.handleUrlPath(path);
  };

  private handleShowBalanceChargeTab = () => {
    this.balanceChargeView.init();
    this.balanceChargeView.renderAll();

    const path = URL_PATH.BALANCE_CHAREGE;
    this.handleUrlPath(path);
  };

  private renderHome() {
    this.contentsContainer.textContent = '';

    const path = URL_PATH.HOME;
    history.pushState({ path }, null, path);
  }

  private handleUrlPath(path: string) {
    const isSamePath = location.pathname === path;

    if (isSamePath) {
      history.replaceState({ path }, null, path);

      return;
    }

    history.pushState({ path }, null, path);
  }
}
