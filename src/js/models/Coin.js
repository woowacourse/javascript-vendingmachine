import { COIN_UNITS } from '../constants/constants.js';
import { getRandomNumber } from '../utils/common.js';

export default class Coin {
  constructor() {
    this.amount = 0;
    this.coins = {
      500: 0,
      100: 0,
      50: 0,
      10: 0,
    };
  }

  setAmount(chargedAmount) {
    try {
      if (this.amount + chargedAmount > 100000) {
        throw new Error('최대 보유 금액은 100,000원 을 넘을 수 없습니다.');
      }
      this.amount += chargedAmount;
      this.makeRandomCoins(chargedAmount);
    } catch (error) {
      alert(error.message);
    }
  }

  getAmount() {
    return this.amount;
  }

  getCoins() {
    return this.coins;
  }

  makeRandomCoins(amount) {
    let currentAmount = amount;
    let count;
    COIN_UNITS.forEach((coin) => {
      if (coin === 10) {
        count = currentAmount / coin;
      } else {
        count = getRandomNumber(currentAmount / coin);
      }
      currentAmount -= count * coin;
      this.coins[coin] += count;
    });
  }
}
