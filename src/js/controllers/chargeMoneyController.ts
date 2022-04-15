import ChargeMoneyView from '../views/chargeMoneyView';
import VendingMachine from '../vendingMachine/vendingMachine';
import { MoneyDetailType } from '../types';
import { Controller } from '../types/interface';
import { onCustomEvent } from '../utils/common';
import { IsLogIn } from '../constants/constants';

export default class ChargeMoneyController implements Controller {
  private vendingMachine: VendingMachine;
  private chargeMoneyView: ChargeMoneyView;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
    this.chargeMoneyView = new ChargeMoneyView();

    this.bindEvents();
  }

  public bindEvents() {
    onCustomEvent('CHARGE_MONEY', this.handleChargeMoney);
  }

  private handleChargeMoney = (event: CustomEvent) => {
    const { inputMoney }: MoneyDetailType = event.detail;
    const isLogin = sessionStorage.getItem(IsLogIn) === 'true' ? true : false;

    this.vendingMachine.chargeOwnMoney(inputMoney);

    this.chargeMoneyView.repaintCoinsTable(this.vendingMachine.getCoins());

    this.loadPage(isLogin);
  };

  public loadPage(isLogin: boolean) {
    const coins = this.vendingMachine.getCoins();
    const totalMoney = this.vendingMachine.getCurrentOwnMoney();

    this.chargeMoneyView.render(isLogin, coins, totalMoney);
  }
}
