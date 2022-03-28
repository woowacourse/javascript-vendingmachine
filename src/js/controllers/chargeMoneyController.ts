import ChargeMoneyView from '../views/chargeMoneyView';
import VendingMachine from '../vendingMachine/vendingMachine';
import { CUSTOM_EVENT } from '../constants/constants';
import { ChargeMoneyDetailType } from '../types/types';

export default class ChargeMoneyController {
  vendingMachine: VendingMachine;
  chargeMoneyView: ChargeMoneyView;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
    this.chargeMoneyView = new ChargeMoneyView();

    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener(CUSTOM_EVENT.CHARGE_MONEY, this.handleChargeMoney.bind(this));
  }

  loadPage() {
    const { coins, inputMoney } = this.vendingMachine;

    this.chargeMoneyView.render(coins, inputMoney);
  }

  handleChargeMoney(event: CustomEvent) {
    const { inputMoney }: ChargeMoneyDetailType = event.detail;

    this.vendingMachine.chargeMoney(inputMoney);

    this.chargeMoneyView.repaintCurrentMoney(this.vendingMachine.inputMoney);
    this.chargeMoneyView.repaintCoinsTable(this.vendingMachine.coins);
  }
}
