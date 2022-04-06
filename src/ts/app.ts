import CoinComponent from './components/CoinComponent/CoinComponent';
import NavigatorComponent from './components/NavigatorComponent';
import ProductComponent from './components/ProductsComponent/ProductsComponent';
import PurchaseProductComponent from './components/PurchaseProductComponent/PurchaseProductComponent';
import UserComponent from './components/UserComponent/UserComponent';

import PurchaseManager from './domains/PurchaseManager';
import VendingMachineCoinManager from './domains/VendingMachineCoinManager';
import VendingMachineProductManager from './domains/VendingMachineProductManager';

const startApp = () => {
  const productManager = new VendingMachineProductManager();
  const coinManager = new VendingMachineCoinManager();
  const purchaseManager = new PurchaseManager();

  new NavigatorComponent();
  new ProductComponent(productManager);
  new CoinComponent(coinManager);
  new PurchaseProductComponent(productManager, coinManager, purchaseManager);
  new UserComponent();
};

export default startApp;
