import { PATH_NAME } from '../constants';
import router from '../routes';

export default class MainContentsComponent {
  $mainContents: HTMLElement;

  constructor() {
    this.$mainContents = document.querySelector('.main-contents');
  }

  private bindElementAndEvent = () => {
    const productManageButton = document.querySelector('#product-manage-button');
    const changeAddButton = document.querySelector('#change-add-button');
    const productPurchaseButton = document.querySelector('#product-purchase-button');
    const loginPageButton = document.querySelector('#login-page-button');

    productManageButton.addEventListener('click', () => {
      router.go(PATH_NAME.PRODUCT_MANAGE);
    });

    changeAddButton.addEventListener('click', () => {
      router.go(PATH_NAME.ADD_CHANGE);
    });

    productPurchaseButton.addEventListener('click', () => {
      router.go(PATH_NAME.PRODUCT_PURCHASE);
    });

    loginPageButton.addEventListener('click', () => {
      router.go(PATH_NAME.LOGIN);
    });
  };

  render = () => {
    this.$mainContents.replaceChildren();
    this.$mainContents.insertAdjacentHTML('beforeend', this.template());
    this.bindElementAndEvent();
  };

  private template = () => `
  <div class="user-menu">
  <button type="button" id="login-page-button">로그인</button>
</div>
<div class="section-container">
  <header>
    <h1>🍿 자판기 🍿</h1>
    <nav>
      <button type="button" id="product-manage-button">상품 관리</button>
      <button type="button" id="change-add-button">잔돈 충전</button>
      <button type="button" id="product-purchase-button">상품 구매</button>
    </nav>
  </header>
  <section class="input-section"></section>
  <section class="contents-container"></section>
</div>`;
}
