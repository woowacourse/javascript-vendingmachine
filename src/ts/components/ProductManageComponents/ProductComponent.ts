import { ProductInputComponent, ProductsStateComponent } from './index';

export default class ProductComponent {
  constructor(private vendingMachineProductManager) {
    new ProductInputComponent(vendingMachineProductManager);
    new ProductsStateComponent(vendingMachineProductManager);
  }
}
