import RouteManager from './routes/routes';
import NavigatorComponent from './components/NavigatorComponent';
import ProductInputComponent from './components/ProductManageComponents/ProductInputComponent';
import ProductStateComponent from './components/ProductManageComponents/ProductsStateComponent';
import ChargeMoneyInputComponent from './components/ChargeMoneyManageComponents/ChargeMoneyInputComponent';
import ChargeMoneyStateComponent from './components/ChargeMoneyManageComponents/ChargeMoneyStateComponent';
import VendingMachineChargeMoneyManager from './domains/VendingMachineChargeMoneyManager';
import VendingMachineProductManager from './domains/VendingMachineProductManager';

const startApp = () => {
  new NavigatorComponent();
  new RouteManager();

  const vendingMachineProductManager = new VendingMachineProductManager();
  const vendingMachineChargeMoneyManager =
    new VendingMachineChargeMoneyManager();

  new ProductInputComponent(vendingMachineProductManager);
  new ProductStateComponent(vendingMachineProductManager);

  new ChargeMoneyInputComponent(vendingMachineChargeMoneyManager);
  new ChargeMoneyStateComponent();
};

export default startApp;
