import ProductManagementComponent from './ProductManagementComponent';
import PurchaseProductComponent from './PurchaseProductComponent';
import RechargeChangeComponent from './RechargeChangeComponent';

class VendingMachineComponent {
  #ProductManagementComponent;
  #PurchaseProductComponent;
  #RechargeChangeComponent;

  $app;

  #currentSectionName = '';

  constructor(currentSectionName) {
    this.$app = document.querySelector('#app');
    this.initDOM();
    this.initChildComponents();
    this.showSection(currentSectionName);
    this.$tabNav.addEventListener('click', this.onClickNavigation);
  }

  initDOM() {
    this.$tabNav = this.$app.querySelector('#tab-nav');
    this.tabButtonMap = {
      manageProduct: this.$app.querySelector('#manage-product-tab'),
      rechargeChange: this.$app.querySelector('#recharge-change-tab'),
      purchaseProduct: this.$app.querySelector('#purchase-product-tab'),
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
    if (id === 'manage-product-tab' && this.#currentSectionName !== '') {
      history.pushState({ path: '' }, '', '/');

      this.showSection('');
    }
    if (id === 'recharge-change-tab' && this.#currentSectionName !== 'recharge') {
      history.pushState({ path: 'recharge' }, '', '/recharge');

      this.showSection('recharge');
    }
    if (id === 'purchase-product-tab' && this.#currentSectionName !== 'purchase') {
      history.pushState({ path: 'purchase' }, '', '/purchase');

      this.showSection('purchase');
    }
  };

  showSection(name) {
    this.#currentSectionName = name;
    if (name === '') {
      this.#RechargeChangeComponent.hide();
      this.#PurchaseProductComponent.hide();

      this.#ProductManagementComponent.show();
      this.focusTabButton('manageProduct');
    }
    if (name === 'recharge') {
      this.#PurchaseProductComponent.hide();
      this.#ProductManagementComponent.hide();

      this.#RechargeChangeComponent.show();
      this.focusTabButton('rechargeChange');
    }
    if (name === 'purchase') {
      this.#ProductManagementComponent.hide();
      this.#RechargeChangeComponent.hide();

      this.#PurchaseProductComponent.show();
      this.focusTabButton('purchaseProduct');
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
}

export default VendingMachineComponent;
