import { ProductManageView } from './ProductManageView';
import { BalanceChargeView } from './BalanceChargeView';
import { ProductPurchaseView } from './ProductPurchaseView';
import { LoginView } from './LoginView';

import { CoinVault } from '../domain/CoinVault';
import { ProductCatalog } from '../domain/ProductCatalog';

import { URL_PATH } from '../utils/constants';
import { SignupView } from './SignupView';
import { Auth } from '../domain/Auth';
import { Profile } from '../component/Profile';
import { UserInfoEditView } from './UserInfoEditView';

export class Router {
  #nav: HTMLElement;
  #thumbnail: HTMLDivElement;
  #productManageNavBtn: HTMLButtonElement;
  #balanceChargeNavBtn: HTMLButtonElement;
  #productPurchaseNavBtn: HTMLButtonElement;
  #loginBtn: HTMLButtonElement;
  #authSection: HTMLElement;
  #featureSection: HTMLElement;
  #productManageView: ProductManageView;
  #balanceChargeView: BalanceChargeView;
  #productPurchaseView: ProductPurchaseView;
  #loginView: LoginView;
  #signupView: SignupView;
  #profile: Profile;
  #userInfoEditView: UserInfoEditView;
  #coinVault: CoinVault;
  #productCatalog: ProductCatalog;
  #auth: Auth;

  constructor() {
    // DOM 선택
    this.#nav = document.querySelector('nav');
    this.#thumbnail = document.querySelector('.thumbnail');
    this.#productManageNavBtn = document.querySelector('#product-manage-nav-button');
    this.#balanceChargeNavBtn = document.querySelector('#charge-balance-nav-button');
    this.#productPurchaseNavBtn = document.querySelector('#product-purchase-nav-button');
    this.#loginBtn = document.querySelector('#login-button');
    this.#authSection = document.querySelector('.auth-section');
    this.#featureSection = document.querySelector('.feature-section');

    // Domain 인스턴스 생성
    this.#coinVault = new CoinVault();
    this.#productCatalog = new ProductCatalog();
    this.#auth = new Auth();

    // View, Component 인스턴스 생성
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
    this.#loginView = new LoginView({ target: this.#authSection, auth: this.#auth });
    this.#signupView = new SignupView({ target: this.#authSection, auth: this.#auth });
    this.#profile = new Profile({ target: this.#thumbnail, auth: this.#auth });
    this.#userInfoEditView = new UserInfoEditView({ target: this.#authSection, auth: this.#auth });

    // 이벤트 핸들러
    this.#productManageNavBtn.addEventListener('click', this.#handleShowProductManageTab);
    this.#balanceChargeNavBtn.addEventListener('click', this.#handleShowBalanceChargeTab);
    this.#productPurchaseNavBtn.addEventListener('click', this.#handleShowProductPurchaseTab);
    this.#loginBtn.addEventListener('click', this.#handleShowLoginPage);
    this.#authSection.addEventListener('signupPageRequested', this.#handleShowSignupPage);
    this.#authSection.addEventListener('loginCompleted', this.#renderHome);
    this.#authSection.addEventListener('editUserInfoCompleted', this.#renderHome);
    this.#thumbnail.addEventListener('showEditUserInfoRequested', this.#handleShowEditUserInfoPage);
    this.#thumbnail.addEventListener('logoutCompleted', this.#renderHome);
    window.addEventListener('popstate', this.#handlePopstate);

    // 홈 화면 렌더링
    this.#renderHome();
  }

  #handlePopstate = (e) => {
    const { path } = e.state;
    const accessToken = localStorage.getItem('accessToken');

    switch (path) {
      case URL_PATH.PRODUCT_MANAGE:
        if (!accessToken) return this.#renderHome();

        this.#productPurchaseView.hide();
        this.#authSection.classList.add('hide');
        this.#balanceChargeView.hide();

        this.#productManageView.show();
        this.#thumbnail.classList.remove('hide');
        this.#featureSection.classList.remove('hide');

        break;

      case URL_PATH.BALANCE_CHAREGE:
        if (!accessToken) return this.#renderHome();

        this.#productPurchaseView.hide();
        this.#productManageView.hide();
        this.#authSection.classList.add('hide');

        this.#thumbnail.classList.remove('hide');
        this.#balanceChargeView.show();
        this.#featureSection.classList.remove('hide');

        break;

      case URL_PATH.PRODUCT_PURCHASE:
        this.#balanceChargeView.hide();
        this.#productManageView.hide();
        this.#authSection.classList.add('hide');

        this.#productPurchaseView.show();
        this.#featureSection.classList.remove('hide');

        if (accessToken) {
          this.#thumbnail.classList.remove('hide');
          this.#profile.render();
          this.#nav.classList.remove('hide');

          break;
        }

        this.#loginBtn.classList.remove('hide');

        break;

      case URL_PATH.LOGIN:
        this.#featureSection.classList.add('hide');
        this.#loginBtn.classList.add('hide');

        this.#authSection.classList.remove('hide');
        this.#authSection.textContent = '';
        this.#loginView.render();

        break;

      case URL_PATH.SIGNUP:
        this.#featureSection.classList.add('hide');
        this.#loginBtn.classList.add('hide');

        this.#authSection.classList.remove('hide');
        this.#authSection.textContent = '';
        this.#signupView.render();

        break;

      case URL_PATH.EDIT_USER_INFO:
        this.#featureSection.classList.add('hide');
        this.#thumbnail.classList.add('hide');

        this.#authSection.classList.remove('hide');
        this.#authSection.textContent = '';
        this.#userInfoEditView.render();

        break;

      default:
        this.#renderHome();
    }
  };

  #handleShowProductManageTab = () => {
    if (!this.#productManageView.getIsRendered()) {
      this.#productManageView.renderAll();
    }

    this.#balanceChargeView.hide();
    this.#productPurchaseView.hide();
    this.#productManageView.show();

    this.#handleHistoryState(URL_PATH.PRODUCT_MANAGE);
  };

  #handleShowBalanceChargeTab = () => {
    if (!this.#balanceChargeView.getIsRendered()) {
      this.#balanceChargeView.renderAll();
    }

    this.#productPurchaseView.hide();
    this.#productManageView.hide();
    this.#balanceChargeView.show();

    this.#handleHistoryState(URL_PATH.BALANCE_CHAREGE);
  };

  #handleShowProductPurchaseTab = () => {
    if (!this.#productPurchaseView.getIsRendered()) {
      this.#productPurchaseView.renderAll();
    }

    this.#balanceChargeView.hide();
    this.#productManageView.hide();
    this.#productPurchaseView.show();

    this.#handleHistoryState(URL_PATH.PRODUCT_PURCHASE);
  };

  #handleShowLoginPage = () => {
    this.#featureSection.classList.add('hide');
    this.#loginBtn.classList.add('hide');

    this.#authSection.classList.remove('hide');
    this.#authSection.textContent = '';
    this.#loginView.render();

    this.#handleHistoryState(URL_PATH.LOGIN);
  };

  #handleShowSignupPage = () => {
    this.#featureSection.classList.add('hide');
    this.#loginBtn.classList.add('hide');

    this.#authSection.classList.remove('hide');
    this.#authSection.textContent = '';
    this.#signupView.render();

    this.#handleHistoryState(URL_PATH.SIGNUP);
  };

  #handleShowEditUserInfoPage = () => {
    this.#featureSection.classList.add('hide');
    this.#thumbnail.classList.add('hide');

    this.#authSection.classList.remove('hide');
    this.#authSection.textContent = '';
    this.#userInfoEditView.render();

    this.#handleHistoryState(URL_PATH.EDIT_USER_INFO);
  };

  #renderHome = () => {
    this.#authSection.classList.add('hide');
    this.#featureSection.classList.remove('hide');

    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      this.#profile.render();
      this.#thumbnail.classList.remove('hide');
      this.#loginBtn.classList.add('hide');
      this.#nav.classList.remove('hide');
    } else {
      this.#thumbnail.classList.add('hide');
      this.#loginBtn.classList.remove('hide');
      this.#nav.classList.add('hide');
    }

    this.#handleShowProductPurchaseTab();
  };

  #handleHistoryState(path: string) {
    const isSamePath = location.pathname === path;

    if (isSamePath) {
      history.replaceState({ path }, null, path);

      return;
    }

    history.pushState({ path }, null, path);
  }
}

// const routes = (path) => {
//   switch (path) {
//     case '/login':
//       console.log('login');
//     case '/productPurchase':
//       console.log('productPurchase');
//   }
// };
