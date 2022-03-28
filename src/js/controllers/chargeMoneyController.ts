import ChargeMoneyView from '../views/chargeMoneyView';
import VendingMachine from '../vendingMachine/vendingMachine';
import { CUSTOM_EVENT } from '../constants/constants';
import { ChargeMoneyDetailType } from '../types/types';
import { Controller } from '../types/interface';

export default class ChargeMoneyController implements Controller {
  private vendingMachine: VendingMachine;
  private chargeMoneyView: ChargeMoneyView;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
    this.chargeMoneyView = new ChargeMoneyView();

    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener(CUSTOM_EVENT.CHARGE_MONEY, this.handleChargeMoney.bind(this));
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
