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

export class NavView {
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
    this.#productPurchaseNavBtn.addEventListener('click', this.#handleShowProductPurhcaseTab);
    this.#loginBtn.addEventListener('click', this.#handleShowLoginPage);
    this.#authSection.addEventListener('signupPageRequested', this.#handleShowSignupPage);
    this.#authSection.addEventListener('loginCompleted', this.#renderHome);
    this.#authSection.addEventListener('editUserInfoCompleted', this.#renderHome);
    this.#thumbnail.addEventListener('showEditUserInfoRequested', this.#handleShowEditUserInfoPage);
    this.#thumbnail.addEventListener('logoutCompleted', this.#renderHome);
    window.addEventListener('popstate', (savedData) => {
      this.#handlePopstate(savedData);
    });

    // 홈 화면 렌더링
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
      this.#featureSection.classList.remove('hide');
      this.#authSection.classList.add('hide');

      return;
    }

    if (savedData.state.path === URL_PATH.BALANCE_CHAREGE) {
      this.#balanceChargeView.show();
      this.#productPurchaseView.hide();
      this.#productManageView.hide();
      this.#featureSection.classList.remove('hide');
      this.#authSection.classList.add('hide');

      return;
    }

    if (savedData.state.path === URL_PATH.PRODUCT_PURCHASE) {
      const accessToken = localStorage.getItem('accessToken');
      this.#balanceChargeView.hide();
      this.#productPurchaseView.show();
      this.#productManageView.hide();
      this.#authSection.classList.add('hide');

      this.#featureSection.classList.remove('hide');

      if (accessToken) {
        this.#thumbnail.classList.remove('hide');
        this.#profile.render();
        this.#nav.classList.remove('hide');

        return;
      }

      this.#loginBtn.classList.remove('hide');
      return;
    }

    if (savedData.state.path === URL_PATH.LOGIN) {
      this.#featureSection.classList.add('hide');
      this.#loginBtn.classList.add('hide');

      this.#authSection.classList.remove('hide');
      this.#authSection.textContent = '';
      this.#loginView.render();

      return;
    }

    if (savedData.state.path === URL_PATH.SINGUP) {
      this.#featureSection.classList.add('hide');
      this.#loginBtn.classList.add('hide');

      this.#authSection.classList.remove('hide');
      this.#authSection.textContent = '';
      this.#signupView.render();

      return;
    }

    if (savedData.state.path === URL_PATH.EDIT_USER_INFO) {
      this.#featureSection.classList.add('hide');
      this.#thumbnail.classList.add('hide');

      this.#authSection.classList.remove('hide');
      this.#authSection.textContent = '';
      this.#userInfoEditView.render();

      return;
    }
  };

  #handleShowProductManageTab = () => {
    if (!this.#productManageView.getIsRendered()) {
      this.#productManageView.renderAll();
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
    }

    this.#balanceChargeView.show();
    this.#productPurchaseView.hide();
    this.#productManageView.hide();

    const path = URL_PATH.BALANCE_CHAREGE;
    this.#handleUrlPath(path);
  };

  #handleShowProductPurhcaseTab = () => {
    if (!this.#productPurchaseView.getIsRendered()) {
      this.#productPurchaseView.renderAll();
    }

    this.#productPurchaseView.show();
    this.#balanceChargeView.hide();
    this.#productManageView.hide();

    const path = URL_PATH.PRODUCT_PURCHASE;
    this.#handleUrlPath(path);
  };

  #handleShowLoginPage = () => {
    this.#featureSection.classList.add('hide');
    this.#loginBtn.classList.add('hide');

    this.#authSection.classList.remove('hide');
    this.#authSection.textContent = '';
    this.#loginView.render();

    const path = URL_PATH.LOGIN;
    this.#handleUrlPath(path);
  };

  #handleShowSignupPage = () => {
    this.#featureSection.classList.add('hide');
    this.#loginBtn.classList.add('hide');

    this.#authSection.classList.remove('hide');
    this.#authSection.textContent = '';
    this.#signupView.render();

    const path = URL_PATH.SINGUP;
    this.#handleUrlPath(path);
  };

  #handleShowEditUserInfoPage = () => {
    this.#featureSection.classList.add('hide');
    this.#thumbnail.classList.add('hide');

    this.#authSection.classList.remove('hide');
    this.#authSection.textContent = '';
    this.#userInfoEditView.render();

    const path = URL_PATH.EDIT_USER_INFO;
    this.#handleUrlPath(path);
  };

  #renderHome = () => {
    // 공통
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

    this.#handleShowProductPurhcaseTab();
  };

  #handleUrlPath(path: string) {
    const isSamePath = location.pathname === path;

    if (isSamePath) {
      history.replaceState({ path }, null, path);

      return;
    }

    history.pushState({ path }, null, path);
  }
}
