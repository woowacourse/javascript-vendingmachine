import RouteManager from './routes/routes';
import NavigatorComponent from './components/NavigatorComponent';
import ProductInputComponent from './components/ProductManageComponents/ProductInputComponent';
import ProductStateComponent from './components/ProductManageComponents/ProductsStateComponent';
import ChargeMoneyInputComponent from './components/ChargeMoneyManageComponents/ChargeMoneyInputComponent';
import ChargeMoneyStateComponent from './components/ChargeMoneyManageComponents/ChargeMoneyStateComponent';
import VendingMachineChargeMoneyManager from './domains/VendingMachineChargeMoneyManager';
import VendingMachineProductManager from './domains/VendingMachineProductManager';
import ConsumerChargeMoneyInputComponent from './components/PurchaseProductManageComponents/ConsumerChargeMoneyInputComponent';
import VendingMachineConsumerMoneyManager from './domains/VendingMachineConsumerMoneyManager';
import ConsumerProductStateComponent from './components/PurchaseProductManageComponents/ConsumerProductStateComponent';
import ConsumerReturnCoinStateComponent from './components/PurchaseProductManageComponents/ConsumerReturnCoinStateComponent';
import SignInComponent from './components/membershipComponents/SignInComponent';
import SignUpComponent from './components/membershipComponents/SignUpComponent';
import ConsumerSignInButtonComponent from './components/PurchaseProductManageComponents/ConsumerSignInButtonComponent';

const startApp = () => {
  new NavigatorComponent();
  new RouteManager();
  new SignInComponent();
  new SignUpComponent();
  new ConsumerSignInButtonComponent();

  const vendingMachineProductManager = new VendingMachineProductManager();
  const vendingMachineChargeMoneyManager =
    new VendingMachineChargeMoneyManager();

  const vendingMachineConsumerMoneyManager =
    new VendingMachineConsumerMoneyManager();

  new ProductInputComponent(vendingMachineProductManager);
  new ProductStateComponent(vendingMachineProductManager);

  new ChargeMoneyInputComponent(vendingMachineChargeMoneyManager);
  new ChargeMoneyStateComponent(vendingMachineChargeMoneyManager);

  new ConsumerChargeMoneyInputComponent(vendingMachineConsumerMoneyManager);
  new ConsumerProductStateComponent(vendingMachineConsumerMoneyManager);
  new ConsumerReturnCoinStateComponent(
    vendingMachineChargeMoneyManager,
    vendingMachineConsumerMoneyManager
  );
};

export default startApp;
