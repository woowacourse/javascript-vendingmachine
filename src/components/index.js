import { accessTokenStorage } from '../stores/authStorage';
import LoginComponent from './loginComponent';
import ProductManagementComponent from './ProductManagementComponent';
import PurchaseProductComponent from './PurchaseProductComponent';
import RechargeChangeComponent from './RechargeChangeComponent';

class VendingMachineComponent {
  #ProductManagementComponent;
  #PurchaseProductComponent;
  #RechargeChangeComponent;
  #LoginComponent;

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
    this.$loginUserHref = document.querySelector('.login-user-href');
    this.$userProfileContainer = document.querySelector('.user-profile-container');
  }

  initChildComponents() {
    this.#ProductManagementComponent = new ProductManagementComponent(this.$app);
    this.#PurchaseProductComponent = new PurchaseProductComponent(this.$app);
    this.#RechargeChangeComponent = new RechargeChangeComponent(this.$app);
    this.#LoginComponent = new LoginComponent(this.$app);
  }

  showSectionByRoute(route) {
    if (this.checkLoginStatus()) {
      this.$nav.classList.remove('hide');
      this.$loginUserHref.classList.add('hide');
      this.$userProfileContainer.classList.remove('hide');

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
        this.#LoginComponent.hide();

        this.#PurchaseProductComponent.show();
        this.focusTabButton('purchaseProduct');
      }
    }

    if (!this.checkLoginStatus()) {
      this.$nav.classList.add('hide');
      this.$loginUserHref.classList.remove('hide');
      this.$userProfileContainer.classList.add('hide');

      if (route === '') {
        this.#ProductManagementComponent.hide();
        this.#RechargeChangeComponent.hide();
        this.#LoginComponent.hide();

        this.#PurchaseProductComponent.show();
      }

      if (route === 'login') {
        this.#RechargeChangeComponent.hide();
        this.#ProductManagementComponent.hide();
        this.#PurchaseProductComponent.hide();

        this.#LoginComponent.show();
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
    const accessToken = accessTokenStorage.getAccessTokenStorage();
    if (accessToken) {
      return true;
    }
    return false;
  }
}

export default VendingMachineComponent;
