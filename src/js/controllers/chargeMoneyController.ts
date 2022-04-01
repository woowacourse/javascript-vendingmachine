import ChargeMoneyView from '../views/chargeMoneyView';
import VendingMachine from '../vendingMachine/vendingMachine';
import { ChargeMoneyDetailType } from '../types';
import { Controller } from '../types/interface';
import { onCustomEvent } from '../utils/common';

export default class ChargeMoneyController implements Controller {
  private vendingMachine: VendingMachine;
  private chargeMoneyView: ChargeMoneyView;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
    this.chargeMoneyView = new ChargeMoneyView();

    this.bindEvents();
  }

  bindEvents() {
    onCustomEvent('CHARGE_MONEY', this.handleChargeMoney.bind(this));
  }

  handleChargeMoney(event: CustomEvent) {
    const { inputMoney }: ChargeMoneyDetailType = event.detail;

    this.vendingMachine.chargeMoney(inputMoney);

    this.chargeMoneyView.repaintCurrentMoney(this.vendingMachine.getInputMoney());
    this.chargeMoneyView.repaintCoinsTable(this.vendingMachine.getCoins());
  }

  loadPage() {
    const coins = this.vendingMachine.getCoins();
    const totalMoney = this.vendingMachine.getInputMoney();

    this.chargeMoneyView.render(coins, totalMoney);
  }
}
