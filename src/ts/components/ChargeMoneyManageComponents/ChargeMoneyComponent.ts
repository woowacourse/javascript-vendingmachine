import { ChargeMoneyInputComponent, ChargeMoneyStateComponent } from './index';

export default class ChargeMoneyComponent {
  constructor(private vendingMachineChargeMoneyManager) {
    new ChargeMoneyInputComponent(vendingMachineChargeMoneyManager);
    new ChargeMoneyStateComponent(vendingMachineChargeMoneyManager);
  }
}
