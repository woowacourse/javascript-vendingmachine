import MoneyChargeView from '../views/moneyChargeView';
import { COINS } from '../constants/constant';

export default class MoneyChargeController {
  vendingMachine: any;
  moneyChargeView: any;

  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;
    this.moneyChargeView = new MoneyChargeView();
  }

  render() {
    const coins = this.vendingMachine.getCoins();
    const totalMoney = this.getTotalMoney(coins);
    this.moneyChargeView.render(coins, totalMoney);
  }

  getTotalMoney(coins) {
    let totalMoney = 0;
    Object.keys(coins).forEach(coinKey => {
      totalMoney += coins[coinKey] * COINS[coinKey];
    });
    return totalMoney;
  }
}
