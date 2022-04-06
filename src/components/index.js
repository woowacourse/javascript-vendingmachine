import { accessTokenStorage } from '../stores/localStorage';
import { ERROR_MSG } from '../utils/constants';
import EditUserInfoComponent from './EditUserInfoComponent';
import HeaderComponent from './headerComponent';
import LoginComponent from './loginComponent';
import ProductManagementComponent from './ProductManagementComponent';
import PurchaseProductComponent from './PurchaseProductComponent';
import RechargeChangeComponent from './RechargeChangeComponent';
import SignInComponent from './SinginComponent';

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
    localStorage.clear();
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
    this.#HeaderComponent.headerShow();
    this.$title.textContent = '🍿 자판기 🍿';

    if (this.checkLoginStatus()) {
      this.$nav.classList.remove('hide');
      this.#HeaderComponent.loginUserHide();
      this.#HeaderComponent.userProfileShow();

      this.#LoginComponent.hide();
      this.#SignInComponent.hide();

      if (route === 'manage') {
        this.#RechargeChangeComponent.hide();
        this.#PurchaseProductComponent.hide();
        this.#LoginComponent.hide();
        this.#EditUserComponent.hide();

        this.#ProductManagementComponent.show();
        this.focusTabButton('manageProduct');
      }
      if (route === 'recharge') {
        this.#PurchaseProductComponent.hide();
        this.#ProductManagementComponent.hide();
        this.#LoginComponent.hide();
        this.#EditUserComponent.hide();

        this.#RechargeChangeComponent.show();
        this.focusTabButton('rechargeChange');
      }
      if (route === '') {
        this.#ProductManagementComponent.hide();
        this.#RechargeChangeComponent.hide();
        this.#EditUserComponent.hide();

        this.#PurchaseProductComponent.show();
        this.focusTabButton('purchaseProduct');
      }
      if (route === 'edit-user-info') {
        this.$title.textContent = '회원 정보 수정';
        this.#ProductManagementComponent.hide();
        this.#RechargeChangeComponent.hide();
        this.#PurchaseProductComponent.hide();

        this.#HeaderComponent.loginUserHide();
        this.#HeaderComponent.userProfileHide();

        this.$nav.classList.add('hide');

        this.#EditUserComponent.show();
        this.#EditUserComponent.renderUserInfo();
      }

      if (route === 'login' || route === 'signin') {
        alert(ERROR_MSG.WRONG_ACCESS);
        window.location.href = 'http://localhost:9000/#';
      }
    }

    if (!this.checkLoginStatus()) {
      this.$nav.classList.add('hide');
      this.#HeaderComponent.loginUserShow();
      this.#HeaderComponent.userProfileHide();

      this.#ProductManagementComponent.hide();
      this.#RechargeChangeComponent.hide();
      this.#EditUserComponent.hide();

      if (route === '') {
        this.#LoginComponent.hide();
        this.#SignInComponent.hide();

        this.#PurchaseProductComponent.show();
      }

      if (route === 'login') {
        this.$title.textContent = '로그인';
        this.#HeaderComponent.headerHide();

        this.#PurchaseProductComponent.hide();
        this.#SignInComponent.hide();

        this.#LoginComponent.show();
      }

      if (route === 'signin') {
        this.$title.textContent = '회원가입';
        this.#HeaderComponent.headerHide();

        this.#LoginComponent.hide();
        this.#PurchaseProductComponent.hide();

        this.#SignInComponent.show();
      }

      if (route === 'manage' || route === 'recharge' || route === 'edit-user-info') {
        alert(ERROR_MSG.WRONG_ACCESS);
        window.location.href = 'http://localhost:9000/#';
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
