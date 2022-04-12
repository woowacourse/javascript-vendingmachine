import {
  ConsumerReturnCoinStateComponent,
  ConsumerChargeMoneyInputComponent,
  ConsumerProductStateComponent,
  ConsumerSignInButtonComponent,
} from './index';

export default class ConsumerComponent {
  constructor(
    private vendingMachineConsumerMoneyManager,
    private vendingMachineChargeMoneyManager
  ) {
    new ConsumerChargeMoneyInputComponent(vendingMachineConsumerMoneyManager);
    new ConsumerProductStateComponent(vendingMachineConsumerMoneyManager);
    new ConsumerReturnCoinStateComponent(
      vendingMachineChargeMoneyManager,
      vendingMachineConsumerMoneyManager
    );
    new ConsumerSignInButtonComponent();
  }
}
