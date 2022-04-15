import RouteManager from './routes/routes';
import NavigatorComponent from './components/NavigatorComponent';
import DimmerComponent from './components/DimmerComponent';

import { ProductComponent } from './components/ProductManageComponents/index';
import { ChargeMoneyComponent } from './components/ChargeMoneyManageComponents/index';
import { ConsumerComponent } from './components/PurchaseProductManageComponents/index';
import { MembershipComponent } from './components/UserComponents/index';

import {
  VendingMachineChargeMoneyManager,
  VendingMachineProductManager,
  VendingMachineConsumerMoneyManager,
} from './domains/index';

const startApp = () => {
  const vendingMachineProductManager = new VendingMachineProductManager();
  const vendingMachineChargeMoneyManager =
    new VendingMachineChargeMoneyManager();
  const vendingMachineConsumerMoneyManager =
    new VendingMachineConsumerMoneyManager();

  new NavigatorComponent();
  new RouteManager();

  new DimmerComponent();

  new MembershipComponent();
  new ProductComponent(vendingMachineProductManager);
  new ChargeMoneyComponent(vendingMachineChargeMoneyManager);
  new ConsumerComponent(
    vendingMachineConsumerMoneyManager,
    vendingMachineChargeMoneyManager
  );
};

export default startApp;
