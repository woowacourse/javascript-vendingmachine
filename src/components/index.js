import { accessTokenStorage } from '../stores/localStorage';
import LoginComponent from './loginComponent';
import ProductManagementComponent from './ProductManagementComponent';
import PurchaseProductComponent from './PurchaseProductComponent';
import RechargeChangeComponent from './RechargeChangeComponent';
import SignInComponent from './SinginComponent';

class VendingMachineComponent {
  #ProductManagementComponent;
  #PurchaseProductComponent;
  #RechargeChangeComponent;
  #LoginComponent;
  #signInComponent;

  $app;
  constructor(hashRoute) {
    this.$app = document.querySelector('#app');
    this.initDOM();
    this.initChildComponents();
    this.showSectionByRoute(hashRoute);
    this.bindEventListener();
  }

  initDOM() {
    this.tabButtonMap = {
      manageProduct: this.$app.querySelector('#manage-product-tab'),
      rechargeChange: this.$app.querySelector('#recharge-change-tab'),
      purchaseProduct: this.$app.querySelector('#purchase-product-tab'),
    };
    this.$nav = document.querySelector('nav');
    this.$header = document.querySelector('header');
    this.$title = document.querySelector('h1');
    this.$loginUserHref = document.querySelector('.login-user-href');
    this.$userProfileContainer = document.querySelector('.user-profile-container');
  }

  initChildComponents() {
    this.#ProductManagementComponent = new ProductManagementComponent(this.$app);
    this.#PurchaseProductComponent = new PurchaseProductComponent(this.$app);
    this.#RechargeChangeComponent = new RechargeChangeComponent(this.$app);
    this.#LoginComponent = new LoginComponent(this.$app);
    this.#signInComponent = new SignInComponent(this.$app);
    this.$logoutButton = this.$app.querySelector('#logout-button');
  }

  showSectionByRoute(route) {
    this.$header.classList.remove('hide');
    this.$title.textContent = '🍿 자판기 🍿';

    if (this.checkLoginStatus()) {
      this.$nav.classList.remove('hide');
      this.$loginUserHref.classList.add('hide');
      this.$userProfileContainer.classList.remove('hide');

      this.#LoginComponent.hide();
      this.#signInComponent.hide();

      if (route === 'manage') {
        this.#RechargeChangeComponent.hide();
        this.#PurchaseProductComponent.hide();
        this.#LoginComponent.hide();

        this.#ProductManagementComponent.show();
        this.focusTabButton('manageProduct');
      }
      if (route === 'recharge') {
        this.#PurchaseProductComponent.hide();
        this.#ProductManagementComponent.hide();
        this.#LoginComponent.hide();

        this.#RechargeChangeComponent.show();
        this.focusTabButton('rechargeChange');
      }
      if (route === '') {
        this.#ProductManagementComponent.hide();
        this.#RechargeChangeComponent.hide();

        this.#PurchaseProductComponent.show();
        this.focusTabButton('purchaseProduct');
      }
    }

    if (!this.checkLoginStatus()) {
      this.$nav.classList.add('hide');
      this.$loginUserHref.classList.remove('hide');
      this.$userProfileContainer.classList.add('hide');

      this.#ProductManagementComponent.hide();
      this.#RechargeChangeComponent.hide();

      if (route === '') {
        this.#LoginComponent.hide();
        this.#signInComponent.hide();

        this.#PurchaseProductComponent.show();
      }

      if (route === 'login') {
        this.$title.textContent = '로그인';
        this.$header.classList.add('hide');

        this.#PurchaseProductComponent.hide();
        this.#signInComponent.hide();

        this.#LoginComponent.show();
      }

      if (route === 'signin') {
        this.$title.textContent = '회원가입';
        this.$header.classList.add('hide');

        this.#LoginComponent.hide();

        this.#signInComponent.show();
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

  bindEventListener() {
    this.$logoutButton.addEventListener('click', this.onLogOutButtonClick);
  }

  onLogOutButtonClick = e => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
  };
}

export default VendingMachineComponent;
