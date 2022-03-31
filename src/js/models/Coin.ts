import { COIN } from '../constants/constants.js';
import { getRandomNumber } from '../utils/common.js';
import { validChargeAmount } from './validation.js';
import { Coins, CoinInterface } from '../interface/coins.interface';

export default class Coin implements CoinInterface {
  #coins: Coins;

  constructor() {
    this.#coins = {
      500: 0,
      100: 0,
      50: 0,
      10: 0,
    };
  }

  addAmount(chargedAmount: number): void {
    const currentAmount = this.getAmount() + chargedAmount;
    validChargeAmount(chargedAmount, currentAmount);
    this.makeRandomCoins(chargedAmount);
  }

  getAmount(): number {
    const totalAmount = Object.entries(this.#coins).reduce((acc, [coin, count]) => {
      return acc + Number(coin) * count;
    }, 0);
    return totalAmount;
  }

  getCoins(): Coins {
    return this.#coins;
  }

  // [500, 100, 50] 큰 단위 순으로 보유할 수 있는 동전 개수중에서 랜덤 숫자를 뽑는다.
  // 뽑은 숫자 만큼 동전을 추가한다.
  // 나머지 금액은 10원 동전으로 바꾼다.
  makeRandomCoins(amount: number): void {
    let currentAmount = amount;
    COIN.UNIT_LIST.forEach((coin) => {
      const maxCoinCount = Math.floor(currentAmount / coin);
      const coinCount = coin === COIN.MIN_UNIT ? maxCoinCount : getRandomNumber(maxCoinCount);
      currentAmount -= coinCount * coin;
      this.#coins[coin] += coinCount;
    });
  }
}
