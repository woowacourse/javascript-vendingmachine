import { accessTokenStorage } from '../stores/localStorage';
import { ERROR_MSG, HEADER_TITLE, ROUTER_ADDRESS } from '../utils/constants';
import {
  EditUserInfoComponent,
  HeaderComponent,
  LoginComponent,
  ProductManagementComponent,
  PurchaseProductComponent,
  RechargeChangeComponent,
  SignInComponent,
} from './index';

class VendingMachineComponent {
  #ProductManagementComponent;
  #PurchaseProductComponent;
  #RechargeChangeComponent;
  #HeaderComponent;
  #LoginComponent;
  #SignInComponent;
  #EditUserComponent;

  $app;
  constructor(hashRoute) {
    this.$app = document.querySelector('#app');
    this.initDOM();
    this.initChildComponents();
    this.showSectionByRoute(hashRoute);
  }

  initDOM() {
    this.tabButtonMap = {
      manageProduct: this.$app.querySelector('#manage-product-tab'),
      rechargeChange: this.$app.querySelector('#recharge-change-tab'),
      purchaseProduct: this.$app.querySelector('#purchase-product-tab'),
    };
    this.$nav = document.querySelector('nav');
    this.$title = document.querySelector('h1');
  }

  initChildComponents() {
    this.#HeaderComponent = new HeaderComponent(this.$app);
    this.#ProductManagementComponent = new ProductManagementComponent(this.$app);
    this.#PurchaseProductComponent = new PurchaseProductComponent(this.$app);
    this.#RechargeChangeComponent = new RechargeChangeComponent(this.$app);
    this.#LoginComponent = new LoginComponent(this.$app);
    this.#SignInComponent = new SignInComponent(this.$app);
    this.#EditUserComponent = new EditUserInfoComponent(this.$app);
  }

  showSectionByRoute(route) {
    const isLoginStatus = this.checkLoginStatus();
    this.#HeaderComponent.headerShow();
    this.$title.textContent = HEADER_TITLE.MAIN;

    if (isLoginStatus) {
      this.$nav.classList.remove('hide');
      this.#HeaderComponent.loginUserHide();
      this.#HeaderComponent.userProfileShow();

      this.#LoginComponent.hide();
      this.#SignInComponent.hide();

      if (route === ROUTER_ADDRESS.MANAGE_PRODUCT) {
        this.#RechargeChangeComponent.hide();
        this.#PurchaseProductComponent.hide();
        this.#LoginComponent.hide();
        this.#EditUserComponent.hide();

        this.#ProductManagementComponent.show();
        this.focusTabButton('manageProduct');
      }
      if (route === ROUTER_ADDRESS.RECHARGE_COIN) {
        this.#PurchaseProductComponent.hide();
        this.#ProductManagementComponent.hide();
        this.#LoginComponent.hide();
        this.#EditUserComponent.hide();

        this.#RechargeChangeComponent.show();
        this.focusTabButton('rechargeChange');
      }
      if (route === ROUTER_ADDRESS.PURCHASE_PRODUCT) {
        this.#ProductManagementComponent.hide();
        this.#RechargeChangeComponent.hide();
        this.#EditUserComponent.hide();

        this.#PurchaseProductComponent.show();
        this.focusTabButton('purchaseProduct');
      }
      if (route === ROUTER_ADDRESS.EDIT_USER_INFO) {
        this.$title.textContent = HEADER_TITLE.EDIT_INFO;
        this.#ProductManagementComponent.hide();
        this.#RechargeChangeComponent.hide();
        this.#PurchaseProductComponent.hide();

        this.#HeaderComponent.loginUserHide();
        this.#HeaderComponent.userProfileHide();

        this.$nav.classList.add('hide');

        this.#EditUserComponent.show();
        this.#EditUserComponent.renderUserInfo();
      }

      if (route === ROUTER_ADDRESS.LOGIN || route === ROUTER_ADDRESS.SIGN_IN) {
        alert(ERROR_MSG.WRONG_ACCESS);
        window.location.href = ROUTER_ADDRESS.PURCHASE_PRODUCT;
      }
    }

    if (!isLoginStatus) {
      this.$nav.classList.add('hide');
      this.#HeaderComponent.loginUserShow();
      this.#HeaderComponent.userProfileHide();

      this.#ProductManagementComponent.hide();
      this.#RechargeChangeComponent.hide();
      this.#EditUserComponent.hide();

      if (route === ROUTER_ADDRESS.PURCHASE_PRODUCT) {
        this.#LoginComponent.hide();
        this.#SignInComponent.hide();

        this.#PurchaseProductComponent.show();
      }

      if (route === ROUTER_ADDRESS.LOGIN) {
        this.$title.textContent = HEADER_TITLE.LOGIN;
        this.#HeaderComponent.headerHide();

        this.#PurchaseProductComponent.hide();
        this.#SignInComponent.hide();

        this.#LoginComponent.show();
      }

      if (route === ROUTER_ADDRESS.SIGN_IN) {
        this.$title.textContent = HEADER_TITLE.SIGN_IN;
        this.#HeaderComponent.headerHide();

        this.#LoginComponent.hide();
        this.#PurchaseProductComponent.hide();

        this.#SignInComponent.show();
      }

      if (
        route === ROUTER_ADDRESS.MANAGE_PRODUCT ||
        route === ROUTER_ADDRESS.RECHARGE_COIN ||
        route === ROUTER_ADDRESS.EDIT_USER_INFO
      ) {
        alert(ERROR_MSG.WRONG_ACCESS);
        window.location.href = ROUTER_ADDRESS.PURCHASE_PRODUCT;
      }
    }
  }

  focusTabButton(buttonName) {
    Object.entries(this.tabButtonMap).forEach(([key, node]) => {
      if (key === buttonName) {
        node.classList.add('checked');
        return;
      }
      node.classList.remove('checked');
    });
  }

  checkLoginStatus() {
    const accessToken = accessTokenStorage.getAccessToken();
    if (accessToken) {
      return true;
    }
    return false;
  }
}

export default VendingMachineComponent;
