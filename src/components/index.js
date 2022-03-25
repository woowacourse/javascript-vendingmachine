import ProductManagementComponent from './ProductManagementComponent';
import PurchaseProductComponent from './PurchaseProductComponent';
import RechargeChangeComponent from './RechargeChangeComponent';

class VendingMachineComponent {
  #ProductManagementComponent;
  #PurchaseProductComponent;
  #RechargeChangeComponent;

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
  }
  initChildComponents() {
    this.#ProductManagementComponent = new ProductManagementComponent(this.$app);
    this.#PurchaseProductComponent = new PurchaseProductComponent(this.$app);
    this.#RechargeChangeComponent = new RechargeChangeComponent(this.$app);
  }
  showSectionByRoute(route) {
    if (route === '') {
      this.#RechargeChangeComponent.hide();
      this.#PurchaseProductComponent.hide();

      this.#ProductManagementComponent.show();
      this.focusTabButton('manageProduct');
    }
    if (route === 'recharge') {
      this.#PurchaseProductComponent.hide();
      this.#ProductManagementComponent.hide();

      this.#RechargeChangeComponent.show();
      this.focusTabButton('rechargeChange');
    }
    if (route === 'purchase') {
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
