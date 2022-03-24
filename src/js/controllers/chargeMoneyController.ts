import ChargeMoneyView from '../views/chargeMoney/chargeMoneyView';
import { COINS } from '../constants/constant';

export default class ChargeMoneyController {
  vendingMachine: any;
  chargeMoneyView: any;

  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;
    this.chargeMoneyView = new ChargeMoneyView();
  }

  render() {
    const coins = this.vendingMachine.getCoins();
    const totalMoney = this.getTotalMoney(coins);
    this.chargeMoneyView.render(coins, totalMoney);
  }

  getTotalMoney(coins) {
    let totalMoney = 0;
    Object.keys(coins).forEach(coinKey => {
      totalMoney += coins[coinKey] * COINS[coinKey];
    });
    return totalMoney;
  }
}
