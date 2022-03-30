import ChargeMoneyView from '../views/chargeMoneyView';
import VendingMachine from '../vendingMachine/vendingMachine';
import { CUSTOM_EVENT } from '../constants/appContants';
import { ChargeMoneyDetailType } from '../types/types';

export default class ChargeMoneyController {
  vendingMachine: VendingMachine;
  chargeMoneyView: ChargeMoneyView;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
    this.chargeMoneyView = new ChargeMoneyView();

    window.addEventListener(CUSTOM_EVENT.CHARGE_MONEY, this.handleChargeMoney.bind(this));
  }

  loadPage() {
    const { coins, money } = this.vendingMachine;

    this.chargeMoneyView.render(coins, money);
  }

  handleChargeMoney(event: CustomEvent) {
    try {
      const { inputMoney }: ChargeMoneyDetailType = event.detail;

      this.vendingMachine.chargeMoney(inputMoney);

      this.chargeMoneyView.repaintCurrentMoney(this.vendingMachine.money);
      this.chargeMoneyView.repaintCoinsTable(this.vendingMachine.coins);
    } catch (error) {
      alert(error.message);
    }
  }
}
