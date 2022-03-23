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
    this.initChildComponents();
    this.showSectionByRoute(hashRoute);
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
    }
    if (route === 'recharge') {
      this.#PurchaseProductComponent.hide();
      this.#ProductManagementComponent.hide();

      this.#RechargeChangeComponent.show();
    }
    if (route === 'purchase') {
      this.#ProductManagementComponent.hide();
      this.#RechargeChangeComponent.hide();

      this.#PurchaseProductComponent.show();
    }
  }
}

export default VendingMachineComponent;
