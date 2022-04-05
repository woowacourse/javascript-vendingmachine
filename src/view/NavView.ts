import { ProductManageView } from './ProductManageView';
import { BalanceChargeView } from './BalanceChargeView';
import { ProductPurchaseView } from './ProductPurchaseView';

import { CoinVault } from '../domain/CoinVault';
import { ProductCatalog } from '../domain/ProductCatalog';

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
  #coinVault: CoinVault;
  #productCatalog: ProductCatalog;

  constructor() {
    this.#coinVault = new CoinVault();
    this.#productCatalog = new ProductCatalog();

    this.#productManageView = new ProductManageView({
      productCatalog: this.#productCatalog,
    });
    this.#balanceChargeView = new BalanceChargeView({
      coinVault: this.#coinVault,
    });
    this.#productPurchaseView = new ProductPurchaseView({
      productCatalog: this.#productCatalog,
      coinVault: this.#coinVault,
    });

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
      this.#productManageView.show();
      this.#balanceChargeView.hide();
      this.#productPurchaseView.hide();

      return;
    }

    if (savedData.state.path === URL_PATH.BALANCE_CHAREGE) {
      this.#balanceChargeView.show();
      this.#productPurchaseView.hide();
      this.#productManageView.hide();

      return;
    }
  };

  #handleShowProductManageTab = () => {
    if (!this.#productManageView.getIsRendered()) {
      this.#productManageView.renderAll();
      this.#productManageView.setIsRendered(true);
    }

    this.#productManageView.show();
    this.#balanceChargeView.hide();
    this.#productPurchaseView.hide();

    const path = URL_PATH.PRODUCT_MANAGE;
    this.#handleUrlPath(path);
  };

  #handleShowBalanceChargeTab = () => {
    if (!this.#balanceChargeView.getIsRendered()) {
      this.#balanceChargeView.renderAll();
      this.#balanceChargeView.setIsRendered(true);
    }

    this.#balanceChargeView.show();
    this.#productPurchaseView.hide();
    this.#productManageView.hide();

    const path = URL_PATH.BALANCE_CHAREGE;
    this.#handleUrlPath(path);
  };

  #handleShowProductPurhcaseTab = () => {
    // 렌더링이 되어있지 않다면 렌더링을 해주고
    // 되어있다면 class hide show만 조정
    if (!this.#productPurchaseView.getIsRendered()) {
      this.#productPurchaseView.renderAll();
      this.#productPurchaseView.setIsRendered(true);
    }

    this.#productPurchaseView.show();
    this.#balanceChargeView.hide();
    this.#productManageView.hide();

    const path = URL_PATH.PRODUCT_PURCHASE;
    this.#handleUrlPath(path);
  };

  #renderHome() {
    this.#handleShowProductPurhcaseTab();
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
