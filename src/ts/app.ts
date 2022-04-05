import RouteManager from './routes/routes';

import VendingMachineChargeMoneyManager from './domains/VendingMachineChargeMoneyManager';
import VendingMachineProductManager from './domains/VendingMachineProductManager';
import VendingMachineConsumerMoneyManager from './domains/VendingMachineConsumerMoneyManager';

import NavigatorComponent from './components/NavigatorComponent';

import ProductInputComponent from './components/ProductManageComponents/ProductInputComponent';
import ProductStateComponent from './components/ProductManageComponents/ProductsStateComponent';

import ChargeMoneyInputComponent from './components/ChargeMoneyManageComponents/ChargeMoneyInputComponent';
import ChargeMoneyStateComponent from './components/ChargeMoneyManageComponents/ChargeMoneyStateComponent';

import ConsumerChargeMoneyInputComponent from './components/PurchaseProductManageComponents/ConsumerChargeMoneyInputComponent';
import ConsumerProductStateComponent from './components/PurchaseProductManageComponents/ConsumerProductStateComponent';
import ConsumerReturnCoinStateComponent from './components/PurchaseProductManageComponents/ConsumerReturnCoinStateComponent';
import ConsumerSignInButtonComponent from './components/PurchaseProductManageComponents/ConsumerSignInButtonComponent';

import SignInComponent from './components/membershipComponents/SignInComponent';
import SignUpComponent from './components/membershipComponents/SignUpComponent';
import UserThumbnailComponent from './components/membershipComponents/UserThumbnailComponent';
import DimmerComponent from './components/DimmerComponent';

const startApp = () => {
  new NavigatorComponent();
  new RouteManager();
  new SignInComponent();
  new SignUpComponent();
  new ConsumerSignInButtonComponent();
  new UserThumbnailComponent();
  new DimmerComponent();

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
