import { COIN, ERROR_MESSAGE } from '../constants/constants.js';
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
      if (this.amount + chargedAmount > COIN.MAX_AMOUNT) {
        throw new Error(ERROR_MESSAGE.OVER_MAX_AMOUNT);
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
    COIN.UNIT_LIST.forEach((coin) => {
      const maxCoinCount = currentAmount / coin;
      const coinCount = coin === COIN.MIN_UNIT ? maxCoinCount : getRandomNumber(maxCoinCount);
      currentAmount -= coinCount * coin;
      this.coins[coin] += coinCount;
    });
  }
}
