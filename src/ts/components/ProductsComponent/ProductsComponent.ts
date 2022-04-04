import ProductInputComponent from './ProductInputComponent';
import ProductStateComponent from './ProductsStateComponent';

export default class ProductsComponent {
  constructor(private vendingMachineProductManager) {
    new ProductInputComponent(this.vendingMachineProductManager);
    new ProductStateComponent(this.vendingMachineProductManager);
  }
}
