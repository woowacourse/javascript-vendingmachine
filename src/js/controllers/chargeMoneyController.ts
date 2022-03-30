import ChargeMoneyView from '../views/chargeMoneyView';
import VendingMachine from '../vendingMachine/vendingMachine';

export default class ChargeMoneyController {
  vendingMachine: VendingMachine;
  chargeMoneyView: ChargeMoneyView;

  constructor(vendingMachine: VendingMachine) {
    this.chargeMoneyView = new ChargeMoneyView(vendingMachine);
  }

  loadPage() {
    this.chargeMoneyView.render();
  }
}
