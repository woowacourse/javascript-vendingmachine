import CoinManagement from '../domain/CoinManagement';
import MoneyManagement from '../domain/MoneyManagement';
import ProductManagement from '../domain/ProductManagement';
import { $, $$, replaceHTML } from '../utils/dom';
import { basePath } from '../../App';
import CoinManagementComponent from '../component/CoinManagementComponent';
import ProductManagementComponent from '../component/ProductManagementComponent';
import ProductPurchaseComponent from '../component/ProductPurchaseComponent';
import { getUser } from '../utils';
import type { routePageType } from '../../App';
import { UserInfoWithPassWord } from '../types';

export default class HomePage {
  readonly productManagement: ProductManagement;
  readonly coinManagement: CoinManagement;
  readonly moneyManagement: MoneyManagement;
  readonly #productManagementComponent: ProductManagementComponent;
  readonly #coinManagementComponent: CoinManagementComponent;
  readonly #productPurchaseComponent: ProductPurchaseComponent;
  $nav: HTMLElement;
  $navButtons: NodeListOf<HTMLButtonElement>;
  $loginButton: HTMLButtonElement;

  constructor(readonly routePage: routePageType) {
    this.routePage = routePage;

    this.productManagement = new ProductManagement();
    this.coinManagement = new CoinManagement();
    this.moneyManagement = new MoneyManagement();
    this.#productManagementComponent = new ProductManagementComponent(
      this.productManagement,
    );
    this.#coinManagementComponent = new CoinManagementComponent(
      this.coinManagement,
    );
    this.#productPurchaseComponent = new ProductPurchaseComponent(
      this.productManagement,
      this.coinManagement,
      this.moneyManagement,
    );
  }

  async render() {
    replaceHTML($('#app'), this.#template());

    this.$nav = $('.nav');
    this.$navButtons = $$('.nav__button');
    this.$loginButton = $('.login-button');

    this.#activateClickedButton(location.pathname);

    this.$nav.addEventListener('click', this.#navClickHandler);
    this.$loginButton.addEventListener('click', this.#loginButtonHandler);

    try {
      const user = await getUser();
      this.#renderAsLogin(user);
    } catch ({ message }) {
      this.#renderAsNotLogin();
    }
  }

  #template() {
    return `
      <h1 class="title">🍿 자판기 🍿</h1>
      <button class="login-button user-button display-none" data-pathname="/login">
        로그인
      </button>
      <select class="logined-user-tab user-button display-none">
        <option class="user-thumbnail" value="" selected >김</option>
        <option class="user-edit-button" value="회원 정보 수정">회원 정보 수정</option>
        <option class="logout-button" value="로그아웃">로그아웃</option>
      </select>
      <nav class="nav display-none">
        <button
          type="button"
          class="nav__button active"
          name="product-management"
          data-pathname="/"
        >
          상품 관리
        </button>
        <button
          type="button"
          class="nav__button"
          name="coin-charge"
          data-pathname="/charge"
        >
          잔돈 충전
        </button>
        <button
          type="button"
          class="nav__button"
          name="product-purchase"
          data-pathname="/purchase"
        >
          상품 구매
        </button>
      </nav>
      <main id="main-content"></main>
    `;
  }

  #renderMainContent = (pathname: string) => {
    switch (pathname) {
      case `${basePath}/`:
        this.#productManagementComponent.render();
        break;
      case `${basePath}/charge`:
        this.#coinManagementComponent.render();
        break;
      case `${basePath}/purchase`:
        this.#productPurchaseComponent.render();
        break;
    }
  };

  #renderAsNotLogin() {
    if (location.pathname !== basePath) {
      history.pushState({}, '', basePath);
    }
    this.#renderMainContent(`${basePath}/purchase`);
    this.$nav.classList.add('display-none');
    this.$loginButton.classList.remove('display-none');
  }

  #renderAsLogin(user: UserInfoWithPassWord) {
    this.#renderMainContent(location.pathname);
    this.$nav.classList.remove('display-none');
    this.$loginButton.classList.add('display-none');

    const $loginedUserTab = $('.logined-user-tab');
    $loginedUserTab.classList.remove('display-none');
    [$('.user-thumbnail').innerText] = user.name;

    $loginedUserTab.addEventListener('change', this.#selectChangeHandler);
  }

  #selectChangeHandler = (e: Event) => {
    if (!(e.target instanceof HTMLSelectElement)) return;

    const selectValue = e.target.options[e.target.selectedIndex].value;
    switch (selectValue) {
      case '회원 정보 수정':
        this.#editClickHandler();
        break;
      case '로그아웃':
        this.#logoutHandler();
        break;
    }
    e.target.selectedIndex = 0;
  };

  #navClickHandler = (e: Event) => {
    if (!(e.target instanceof HTMLButtonElement)) return;

    const pathname = `${basePath}${e.target.dataset.pathname}`;

    if (location.pathname === pathname) return;

    history.pushState({}, '', pathname || '/');

    this.#activateClickedButton(pathname);
    this.#renderMainContent(pathname);
  };

  #activateClickedButton = (pathname: string) => {
    this.$navButtons.forEach($button => {
      if (
        this.#checkMatchPathname(
          $button.dataset.pathname,
          pathname.replace(basePath, ''),
        )
      ) {
        $button.classList.add('active');
        return;
      }
      $button.classList.remove('active');
    });
  };

  #checkMatchPathname(buttonPathname: string, pathname: string) {
    return buttonPathname === pathname;
  }

  #loginButtonHandler = (e: Event) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const pathname = `${basePath}${e.target.dataset.pathname}`;

    this.routePage(pathname);
  };

  #logoutHandler = () => {
    document.cookie = 'user_id=';
    document.cookie = 'access_token=';

    this.routePage(`${basePath}/`);
  };

  #editClickHandler = () => {
    this.routePage('/user-edit');
  };
}
