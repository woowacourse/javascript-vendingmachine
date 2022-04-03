import { ProductManageView } from './ProductManageView';
import { BalanceChargeView } from './BalanceChargeView';
import { ProductPurchaseView } from './ProductPurchaseView';
import { URL_PATH } from '../utils/constants';

// 임시
// import { LoginView } from './LoginView';
// import { SignupView } from './SignupView';
// import { UserInfoEditView } from './userInfoEditView';
// 임시 종료

export class NavView {
  #productManageNavBtn: HTMLButtonElement;
  #balanceChargeNavBtn: HTMLButtonElement;
  #productPurchaseNavBtn: HTMLButtonElement;
  #contentsContainer: HTMLDivElement;
  #productManageView: ProductManageView;
  #balanceChargeView: BalanceChargeView;
  #productPurchaseView: ProductPurchaseView;

  constructor() {
    this.#productManageView = new ProductManageView();
    this.#balanceChargeView = new BalanceChargeView();
    this.#productPurchaseView = new ProductPurchaseView();

    this.#contentsContainer = document.querySelector('#contents-container');
    /**
     * 임시
     */
    // new LoginView(document.querySelector('#auth-section')).render();
    // new SignupView(document.querySelector('#auth-section')).render();
    // new UserInfoEditView(document.querySelector('#auth-section')).render();
    /**
     * 임시 종료
     */

    this.#productManageNavBtn = document.querySelector('#product-manage-nav-button');
    this.#balanceChargeNavBtn = document.querySelector('#charge-balance-nav-button');
    this.#productPurchaseNavBtn = document.querySelector('#product-purchase-nav-button');

    this.#productManageNavBtn.addEventListener('click', this.#handleShowProductManageTab);
    this.#balanceChargeNavBtn.addEventListener('click', this.#handleShowBalanceChargeTab);
    this.#productPurchaseNavBtn.addEventListener('click', this.#handleShowProductPurhcaseTab);

    window.addEventListener('popstate', (savedData) => {
      this.#handlePopstate(savedData);
    });

    this.#renderHome();
  }

  #handlePopstate = (savedData) => {
    if (savedData.state.path === URL_PATH.HOME) {
      this.#renderHome();

      return;
    }

    if (savedData.state.path === URL_PATH.PRODUCT_MANAGE) {
      this.#productManageView.init();
      this.#productManageView.renderAll();

      return;
    }

    if (savedData.state.path === URL_PATH.BALANCE_CHAREGE) {
      this.#balanceChargeView.init();
      this.#balanceChargeView.renderAll();

      return;
    }
  };

  #handleShowProductManageTab = () => {
    this.#productManageView.init();
    this.#productManageView.renderAll();

    const path = URL_PATH.PRODUCT_MANAGE;
    this.#handleUrlPath(path);
  };

  #handleShowBalanceChargeTab = () => {
    this.#balanceChargeView.init();
    this.#balanceChargeView.renderAll();

    const path = URL_PATH.BALANCE_CHAREGE;
    this.#handleUrlPath(path);
  };

  #handleShowProductPurhcaseTab = () => {
    // this.#productPurchaseView.init();
    // this.#productPurchaseView.renderAll();

    const path = URL_PATH.PRODUCT_PURCHASE;
    this.#handleUrlPath(path);
  };

  #renderHome() {
    const path = URL_PATH.PRODUCT_PURCHASE;
    history.pushState({ path }, null, path);
  }

  #handleUrlPath(path: string) {
    const isSamePath = location.pathname === path;

    if (isSamePath) {
      history.replaceState({ path }, null, path);

      return;
    }

    history.pushState({ path }, null, path);
  }
}
