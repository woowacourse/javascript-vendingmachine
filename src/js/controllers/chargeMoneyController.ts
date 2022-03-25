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
    const coins = this.vendingMachine.getCoins();
    const totalMoney = this.vendingMachine.getInputMoney();

    this.chargeMoneyView.render(coins, totalMoney);
  }

  handleChargeMoney(event: CustomEvent) {
    const { inputMoney }: ChargeMoneyDetailType = event.detail;

    this.vendingMachine.chargeMoney(inputMoney);

    this.chargeMoneyView.repaintCurrentMoney(this.vendingMachine.getInputMoney());
    this.chargeMoneyView.repaintCoinsTable(this.vendingMachine.getCoins());
  }
}
