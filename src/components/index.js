import ProductManagementComponent from './ProductManagementComponent';
import PurchaseProductComponent from './PurchaseProductComponent';
import RechargeChangeComponent from './RechargeChangeComponent';

class VendingMachineComponent {
  #ProductManagementComponent;
  #PurchaseProductComponent;
  #RechargeChangeComponent;

  $app;
  constructor() {
    this.$app = document.querySelector('#app');
    this.initChildComponents();
  }
  initChildComponents() {
    this.#ProductManagementComponent = new ProductManagementComponent(this.$app);
    this.#PurchaseProductComponent = new PurchaseProductComponent(this.$app);
    this.#RechargeChangeComponent = new RechargeChangeComponent(this.$app);
  }
}

export default VendingMachineComponent;
