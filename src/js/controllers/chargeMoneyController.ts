import ChargeMoneyView from '../views/chargeMoney/chargeMoneyView';
import VendingMachine from '../vendingMachine/vendingMachine';
import { CUSTOM_EVENT } from '../constants/constant';

export default class ChargeMoneyController {
  vendingMachine: VendingMachine;
  chargeMoneyView: ChargeMoneyView;

  constructor(vendingMachine) {
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

  handleChargeMoney(event) {
    const { inputMoney } = event.detail;

    this.vendingMachine.chargeMoney(inputMoney);

    this.chargeMoneyView.updateCurrentMoney(this.vendingMachine.getInputMoney());
    this.chargeMoneyView.updateCoinsTable(this.vendingMachine.getCoins());
  }
}
