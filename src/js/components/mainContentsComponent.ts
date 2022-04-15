import { PATH_NAME } from '../constants';
import router from '../routes';
import Auth from '../utils/Auth';
import throwableFunctionHandler from '../utils/throwableFunctionHandler';
import { getUserInitial, logout } from '../utils/userAction';
import * as Component from './abstractComponents/Component';

export default class MainContentsComponent extends Component.StaticComponent {
  $mainContents: HTMLElement;
  isLogin: Boolean;

  constructor() {
    super();
    this.$mainContents = document.querySelector('.main-contents');
    this.isLogin = Auth();
  }

  protected bindEventAndElement() {
    const productManageButton = document.querySelector('#product-manage-button');
    const changeAddButton = document.querySelector('#change-add-button');
    const productPurchaseButton = document.querySelector('#product-purchase-button');
    const loginPageButton = document.querySelector('#login-page-button');
    const userMenuSymbolButton = document.querySelector('.user-menu-symbol');
    const userMenuSelectWrapper = document.querySelector('.user-menu-select-wrapper');
    const userDataModifyButton = document.querySelector('#user-data-modify');
    const logoutButton = document.querySelector('#logout');

    if (this.isLogin) {
      productManageButton.addEventListener('click', () => {
        router.go(PATH_NAME.PRODUCT_MANAGE);
      });

      changeAddButton.addEventListener('click', () => {
        router.go(PATH_NAME.ADD_CHANGE);
      });

      productPurchaseButton.addEventListener('click', () => {
        router.go(PATH_NAME.PRODUCT_PURCHASE);
      });

      userMenuSymbolButton.addEventListener('click', () => {
        userMenuSelectWrapper.classList.toggle('hide');
      });

      userDataModifyButton.addEventListener('click', () => {
        router.go(PATH_NAME.USER_INFOMATION);
      });

      logoutButton.addEventListener('click', () => {
        if (throwableFunctionHandler(() => logout())) {
          router.go(PATH_NAME.LOGOUT);
        }
      });

      return;
    }

    loginPageButton.addEventListener('click', () => {
      router.go(PATH_NAME.LOGIN);
    });
  }

  render = () => {
    this.$mainContents.replaceChildren();
    this.$mainContents.insertAdjacentHTML('beforeend', this.template());
    this.bindEventAndElement();
  };

  protected template = () => `
  <div class="user-menu">
    ${this.isLogin ? this.LoginStateMenu(getUserInitial()) : this.LogoutStateMenu()}
  </div>
  <div class="section-container">
    <header>
      <h1>🍿 자판기 🍿</h1>
      ${this.isLogin ? this.administratorNav() : ''}
    </header>
    <section class="input-section"></section>
    <section class="contents-container"></section>
  </div>`;

  private LogoutStateMenu = () => `
  <button type="button" id="login-page-button">로그인</button>
  `;

  private LoginStateMenu = (userInitial: string) => `
  <div id="user-menu-select-container">
    <div class="user-menu-symbol">
      <p>${userInitial}</p>
    </div>
    <div class="user-menu-select-wrapper hide">
      <button id="user-data-modify">회원 정보 수정</button>
      <button id="logout">로그아웃</button>
    </div>
  </div>
  `;

  private administratorNav = () => `
  <nav>
    <button type="button" id="product-manage-button">상품 관리</button>
    <button type="button" id="change-add-button">잔돈 충전</button>
    <button type="button" id="product-purchase-button">상품 구매</button>
  </nav>`;
}
