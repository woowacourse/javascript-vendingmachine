import CoinManagement from '../domain/CoinManagement';
import MoneyManagement from '../domain/MoneyManagement';
import ProductManagement from '../domain/ProductManagement';
import { $, replaceHTML } from '../utils/dom';
import { basePath } from '../component/App';
import CoinManagementComponent from '../component/CoinManagementComponent';
import ProductManagementComponent from '../component/ProductManagementComponent';
import ProductPurchaseComponent from '../component/ProductPurchaseComponent';

export default class HomePage {
  constructor(
    private readonly routerPage,
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
    this.activateClickedButton = activateClickedButton;
    this.render();
    $('.nav').addEventListener('click', this.navClickHandler);
    $('.login-button').addEventListener('click', this.loginButtonHandler);
  }

  render() {
    replaceHTML($('#app'), this.#template());
    this.renderMainContent(location.pathname);
  }

  #template() {
    return `
      <h1 class="title">🍿 자판기 🍿</h1>
      <button class="login-button user-button" data-pathname="/login">
        로그인
      </button>
      <button class="user-thumbnail user-button">김</button>
      <nav class="nav">
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

  renderMainContent = pathname => {
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

    this.routerPage(pathname);
  };
}
