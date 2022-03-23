import ProductInputComponent from './components/ProductInputComponent';
import ProductStateComponent from './components/ProductsStateComponent';
import VendingMachineProductManager from './VendingMachineProductManager';

export default function startApp() {
  const vendingMachineProductManager = new VendingMachineProductManager();
  new ProductStateComponent(vendingMachineProductManager);
  new ProductInputComponent(vendingMachineProductManager);
}
