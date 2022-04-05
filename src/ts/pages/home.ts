import CoinManagement from '../domain/CoinManagement';
import MoneyManagement from '../domain/MoneyManagement';
import ProductManagement from '../domain/ProductManagement';
import { $, replaceHTML } from '../utils/dom';
import { basePath } from '../component/App';
import CoinManagementComponent from '../component/CoinManagementComponent';
import ProductManagementComponent from '../component/ProductManagementComponent';
import ProductPurchaseComponent from '../component/ProductPurchaseComponent';
import { getUser } from '../utils';
import type { UserInfoWithPassWord } from '../../apis';

export default class HomePage {
  constructor(
    private readonly routePage,
    private readonly activateClickedButton,
    private readonly productManagement = new ProductManagement(),
    private readonly coinManagement = new CoinManagement(),
    private readonly moneyManagement = new MoneyManagement(),
    private readonly productManagementComponent = new ProductManagementComponent(
      productManagement,
    ),
    private readonly coinManagementComponent = new CoinManagementComponent(
      coinManagement,
    ),
    private readonly productPurchaseComponent = new ProductPurchaseComponent(
      productManagement,
      coinManagement,
      moneyManagement,
    ),
  ) {
    this.routePage = routePage;
    this.activateClickedButton = activateClickedButton;
  }

  async render() {
    replaceHTML($('#app'), this.#template());
    this.activateClickedButton(location.pathname);

    $('.nav').addEventListener('click', this.navClickHandler);
    $('.login-button').addEventListener('click', this.loginButtonHandler);

    const user = await getUser();

    if (typeof user === 'string') {
      this.#renderAsNotLogin();
      return;
    }

    this.#renderAsLogin(user);
  }

  #renderAsNotLogin() {
    if (location.pathname !== basePath) {
      history.pushState({}, '', basePath);
    }
    this.renderMainContent(`${basePath}/purchase`);
    $('.nav').classList.add('display-none');
    $('.login-button').classList.remove('display-none');
  }

  #renderAsLogin(user: UserInfoWithPassWord) {
    this.renderMainContent(location.pathname);
    $('.nav').classList.remove('display-none');
    $('.login-button').classList.add('display-none');
    $('.logined-user-tab').classList.remove('display-none');
    [$('.user-thumbnail').innerText] = user.name;

    $('.logined-user-tab').addEventListener('change', this.selectChangeHandler);
  }

  selectChangeHandler = (e: Event) => {
    if (!(e.target instanceof HTMLSelectElement)) return;

    const selectValue = e.target.options[e.target.selectedIndex].value;
    switch (selectValue) {
      case '회원 정보 수정':
        this.editClickHandler();
        break;
      case '로그아웃':
        this.logoutHandler();
        break;
    }
    e.target.selectedIndex = 0;
  };

  editClickHandler = () => {
    history.pushState({}, '', '/user-edit');
    this.routePage('/user-edit');
  };

  logoutHandler = () => {
    document.cookie = 'user_id=';
    document.cookie = 'access_token=';

    history.pushState({}, '', `${basePath}/`);
    this.routePage(`${basePath}/`);
  };

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

  renderMainContent = (pathname: string) => {
    switch (pathname) {
      case `${basePath}/`:
        this.productManagementComponent.render();
        break;
      case `${basePath}/charge`:
        this.coinManagementComponent.render();
        break;
      case `${basePath}/purchase`:
        this.productPurchaseComponent.render();
        break;
    }
  };

  private navClickHandler = e => {
    if (!(e.target instanceof HTMLButtonElement)) return;

    const pathname = `${basePath}${e.target.dataset.pathname}`;

    history.pushState({}, '', pathname || '/');

    this.activateClickedButton(pathname);
    this.renderMainContent(pathname);
  };

  private loginButtonHandler = e => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const pathname = `${basePath}${e.target.dataset.pathname}`;

    history.pushState({}, '', pathname || '/');

    this.routePage(pathname);
  };
}
