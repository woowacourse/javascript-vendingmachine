import CoinInputComponent from './components/CoinManageComponent/CoinInputComponent';
import CoinsStateComponent from './components/CoinManageComponent/CoinsStateComponent';
import NavigatorComponent from './components/NavigatorComponent';
import ProductInputComponent from './components/ProductManageComponent/ProductInputComponent';
import ProductStateComponent from './components/ProductManageComponent/ProductsStateComponent';
import VendingMachineCoinManager from './domains/VendingMachineCoinManager';
import VendingMachineProductManager from './domains/VendingMachineProductManager';

export default function startApp() {
  const productManager = new VendingMachineProductManager();
  const coinManager = new VendingMachineCoinManager();
  new NavigatorComponent();
  new ProductInputComponent(productManager);
  new ProductStateComponent(productManager);
  new CoinInputComponent(coinManager);
  new CoinsStateComponent();
}
