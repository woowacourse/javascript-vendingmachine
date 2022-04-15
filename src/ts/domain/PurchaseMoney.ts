import { checkPurchaseMoney } from './validator';
import PurchaseMoneyType from '../type/PurchaseMoneyType';

export interface PurchaseMoneyInterface extends PurchaseMoneyType {
  getMoney(): number;
  increaseMoney(money: number): number;
  decreaseMoney(money: number): number;
}

class PurchaseMoney implements PurchaseMoneyInterface {
  money: number;

  constructor(money: number) {
    this.money = money;
  }

  getMoney = () => this.money;

  increaseMoney = (money: number) => {
    checkPurchaseMoney(money);
    return (this.money += money);
  };

  decreaseMoney = (money: number) => {
    return (this.money -= money);
  };
}

export default PurchaseMoney;
