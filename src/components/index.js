import router from '../router';
import { TAB_NAME } from '../utils/constants';
import ProductManagementComponent from './ProductManagementComponent';
import PurchaseProductComponent from './PurchaseProductComponent';
import RechargeChangeComponent from './RechargeChangeComponent';

class VendingMachineComponent {
  #ProductManagementComponent;
  #PurchaseProductComponent;
  #RechargeChangeComponent;

  $app;

  #currentSectionName;

  constructor() {
    this.$app = document.querySelector('#app');
    this.initDOM();
    this.initChildComponents();
    this.showSection(localStorage.getItem('current-section'));
    this.$tabNav.addEventListener('click', this.onClickNavigation);
  }

  initDOM() {
    this.$tabNav = this.$app.querySelector('#tab-nav');
    this.tabButtonMap = {
      [TAB_NAME.MANAGE]: this.$app.querySelector('#manage-product-tab'),
      [TAB_NAME.RECHARGE]: this.$app.querySelector('#recharge-change-tab'),
      [TAB_NAME.PURCHASE]: this.$app.querySelector('#purchase-product-tab'),
    };
  }

  initChildComponents() {
    this.#ProductManagementComponent = new ProductManagementComponent(this.$app);
    this.#PurchaseProductComponent = new PurchaseProductComponent(this.$app);
    this.#RechargeChangeComponent = new RechargeChangeComponent(this.$app);
  }

  onClickNavigation = e => {
    const {
      target: { id },
    } = e;

    /** history가 중복해서 쌓이지 않게 관리 */
    if (id === 'manage-product-tab' && this.#currentSectionName !== TAB_NAME.MANAGE) {
      router.pushState({ path: TAB_NAME.MANAGE }, 'home');
      this.showSection(TAB_NAME.MANAGE);
    }
    if (id === 'recharge-change-tab' && this.#currentSectionName !== TAB_NAME.RECHARGE) {
      router.pushState({ path: TAB_NAME.RECHARGE }, 'recharge');
      this.showSection(TAB_NAME.RECHARGE);
    }
    if (id === 'purchase-product-tab' && this.#currentSectionName !== TAB_NAME.PURCHASE) {
      router.pushState({ path: TAB_NAME.PURCHASE }, 'purchase');
      this.showSection(TAB_NAME.PURCHASE);
    }
  };

  showSection(name) {
    this.#currentSectionName = name;
    localStorage.setItem('current-section', this.#currentSectionName);
    if (name === TAB_NAME.MANAGE) {
      this.#RechargeChangeComponent.hide();
      this.#PurchaseProductComponent.hide();

      this.#ProductManagementComponent.show();
    }
    if (name === TAB_NAME.RECHARGE) {
      this.#PurchaseProductComponent.hide();
      this.#ProductManagementComponent.hide();

      this.#RechargeChangeComponent.show();
    }
    if (name === TAB_NAME.PURCHASE) {
      this.#ProductManagementComponent.hide();
      this.#RechargeChangeComponent.hide();

      this.#PurchaseProductComponent.show();
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
}

export default VendingMachineComponent;
