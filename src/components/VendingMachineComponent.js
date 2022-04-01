import router from '../router';
import { VENDING_MACHINE_ROUTE_NAME } from '../utils/constants';
import ProductManagementComponent from './ProductManagementComponent';
import PurchaseProductComponent from './PurchaseProductComponent';
import RechargeChangeComponent from './RechargeChangeComponent';

class VendingMachineComponent {
  #ProductManagementComponent;
  #PurchaseProductComponent;
  #RechargeChangeComponent;

  $app;

  constructor(handlers) {
    this.$app = document.querySelector('#app');
    this.handlers = handlers;
    this.initDOM();
    this.initChildComponents();
    this.bindEventHandler();
  }

  initDOM() {
    this.$pageTitle = this.$app.querySelector('#page-title');
    this.$tabNav = this.$app.querySelector('#tab-nav');
    this.$loginButton = this.$app.querySelector('#login-button');
    this.tabButtonMap = {
      [VENDING_MACHINE_ROUTE_NAME.MANAGE]: this.$app.querySelector('#manage-product-tab'),
      [VENDING_MACHINE_ROUTE_NAME.RECHARGE]: this.$app.querySelector('#recharge-change-tab'),
      [VENDING_MACHINE_ROUTE_NAME.PURCHASE]: this.$app.querySelector('#purchase-product-tab'),
    };
  }

  initChildComponents() {
    this.#ProductManagementComponent = new ProductManagementComponent(this.$app);
    this.#PurchaseProductComponent = new PurchaseProductComponent(this.$app);
    this.#RechargeChangeComponent = new RechargeChangeComponent(this.$app);
  }
  bindEventHandler() {
    const { onClickNavigation } = this.handlers;
    this.$tabNav.addEventListener('click', onClickNavigation);
  }

  showSection(name) {
    this.$pageTitle.textContent = '🍿 자판기 🍿';
    this.$tabNav.classList.remove('hide');
    this.$loginButton.classList.remove('hide');

    if (name === VENDING_MACHINE_ROUTE_NAME.MANAGE) {
      this.showManageSection();
    }
    if (name === VENDING_MACHINE_ROUTE_NAME.RECHARGE) {
      this.showRechargeSection();
    }
    if (name === VENDING_MACHINE_ROUTE_NAME.PURCHASE) {
      this.showPurchaseSection();
    }

    this.focusTabButton(name);
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

  showManageSection() {
    this.#RechargeChangeComponent.hide();
    this.#PurchaseProductComponent.hide();

    this.#ProductManagementComponent.show();
  }

  showRechargeSection() {
    this.#PurchaseProductComponent.hide();
    this.#ProductManagementComponent.hide();

    this.#RechargeChangeComponent.show();
  }
  showPurchaseSection() {
    this.#ProductManagementComponent.hide();
    this.#RechargeChangeComponent.hide();

    this.#PurchaseProductComponent.show();
  }

  hide() {
    this.$tabNav.classList.add('hide');
    this.#ProductManagementComponent.hide();
    this.#RechargeChangeComponent.hide();
    this.#PurchaseProductComponent.hide();
  }
}

export default VendingMachineComponent;
