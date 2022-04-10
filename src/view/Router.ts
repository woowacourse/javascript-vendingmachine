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
    this.#authSection.addEventListener('loginCompleted', this.#handleShowHome);
    this.#authSection.addEventListener('editUserInfoCompleted', this.#handleShowHome);
    this.#thumbnail.addEventListener('showEditUserInfoRequested', this.#handleShowEditUserInfoPage);
    this.#thumbnail.addEventListener('logoutCompleted', this.#handleShowHome);
    window.addEventListener('popstate', this.#handlePopstate);

    // 홈 화면 렌더링 or 새로고침 렌더링
    const path =
      location.pathname === URL_PATH.HOME ? URL_PATH.PRODUCT_PURCHASE : location.pathname;
    this.#handleHistoryState(path);
  }

  #handlePopstate = (e) => {
    const { path } = e.state;
    const accessToken = localStorage.getItem('accessToken');

    this.#routes(path, accessToken);
  };

  #handleHistoryState(path: string) {
    const accessToken = localStorage.getItem('accessToken');

    this.#routes(path, accessToken);

    const isSamePath = location.pathname === path;

    if (isSamePath) {
      history.replaceState({ path }, null, path);

      return;
    }

    history.pushState({ path }, null, path);
  }

  #routes = (path, accessToken = null) => {
    const featureTabs = {
      [URL_PATH.PRODUCT_MANAGE]: this.#productManageView,
      [URL_PATH.BALANCE_CHARGE]: this.#balanceChargeView,
      [URL_PATH.PRODUCT_PURCHASE]: this.#productPurchaseView,
    };

    const authPages = {
      [URL_PATH.LOGIN]: this.#loginView,
      [URL_PATH.EDIT_USER_INFO]: this.#userInfoEditView,
      [URL_PATH.SIGNUP]: this.#signupView,
    };

    switch (path) {
      case URL_PATH.PRODUCT_MANAGE:
      case URL_PATH.BALANCE_CHARGE:
      case URL_PATH.PRODUCT_PURCHASE:
        const notPermittedAccess =
          !accessToken && (path === URL_PATH.PRODUCT_MANAGE || path === URL_PATH.BALANCE_CHARGE);

        if (notPermittedAccess) {
          this.#handleShowHome();

          break;
        }

        this.#showAndHideTabs(featureTabs, path);

        if (!featureTabs[path].getIsRendered()) {
          featureTabs[path].renderAll();
        }

        this.#authSection.classList.add('hide');

        this.#loginBtn.classList.toggle('hide', accessToken);
        this.#nav.classList.toggle('hide', !accessToken);
        this.#thumbnail.classList.toggle('hide', !accessToken);

        accessToken && this.#profile.render();
        this.#featureSection.classList.remove('hide');

        break;

      case URL_PATH.LOGIN:
      case URL_PATH.EDIT_USER_INFO:
      case URL_PATH.SIGNUP:
        this.#featureSection.classList.add('hide');
        this.#loginBtn.classList.add('hide');

        this.#authSection.classList.remove('hide');
        this.#authSection.textContent = '';

        authPages[path].render();

        break;

      default:
        break;
    }
  };

  #handleShowProductManageTab = () => {
    this.#handleHistoryState(URL_PATH.PRODUCT_MANAGE);
  };

  #handleShowBalanceChargeTab = () => {
    this.#handleHistoryState(URL_PATH.BALANCE_CHARGE);
  };

  #handleShowProductPurchaseTab = () => {
    this.#handleHistoryState(URL_PATH.PRODUCT_PURCHASE);
  };

  #handleShowLoginPage = () => {
    this.#handleHistoryState(URL_PATH.LOGIN);
  };

  #handleShowSignupPage = () => {
    this.#handleHistoryState(URL_PATH.SIGNUP);
  };

  #handleShowEditUserInfoPage = () => {
    this.#handleHistoryState(URL_PATH.EDIT_USER_INFO);
  };

  #handleShowHome = () => {
    this.#handleHistoryState(URL_PATH.PRODUCT_PURCHASE);
  };

  #showAndHideTabs(featureTabs: object, path) {
    Object.entries(featureTabs).forEach(([key, tab]) => {
      if (key === path) {
        tab.show();

        return;
      }
      tab.hide();
    });
  }
}
