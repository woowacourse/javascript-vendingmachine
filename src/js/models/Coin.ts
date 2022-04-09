import { COIN } from '../constants/constants.js';
import { getRandomNumber } from '../utils/common.js';
import { validChargeAmount } from '../utils/validation.js';
import { Coins } from './types';

interface CoinInterface {
  getCoins: () => Coins;
  getTotalAmount: (coins: object) => number;
  addCoinCount: (index: number) => number;
  makeRandomCoins: (amount: number) => void;
}

export default class CoinModel implements CoinInterface {
  #coins: Coins;

  constructor() {
    this.#coins = {
      500: 0,
      100: 0,
      50: 0,
      10: 0,
    };
  }

  getCoins(): Coins {
    return this.#coins;
  }

  getTotalAmount(coins: object): number {
    let total = 0;
    for (const unit in coins) {
      total += Number(unit) * coins[unit];
    }
    return total;
  }

  // 뽑을 수 있는 동전리스트 인덱스 범위를 찾는다. ex) 잔돈이 120원 일 경우 [10, 50, 100] 중 랜덤 인덱스
  // 해당 동전의 카운트를 증가한다
  // 0원이 될때까지 반복한다
  addCoinCount(index: number) {
    const coinCount = getRandomNumber(index);
    const coin = COIN.UNIT_LIST[coinCount];
    this.#coins[coin] += 1;
    return coin;
  }

  makeRandomCoins(amount: number): void {
    validChargeAmount(amount);
    let currentAmount = amount;

    while (currentAmount > 0) {
      if (currentAmount >= COIN.UNIT_LIST[3]) {
        currentAmount -= this.addCoinCount(3);
      } else if (currentAmount >= COIN.UNIT_LIST[2]) {
        currentAmount -= this.addCoinCount(2);
      } else if (currentAmount >= COIN.UNIT_LIST[1]) {
        currentAmount -= this.addCoinCount(1);
      } else {
        this.#coins[COIN.UNIT_LIST[0]] += currentAmount / COIN.UNIT_LIST[0];
        break;
      }
    }
  }

  returnCoins(amount: number): object {
    const returnedCoins = {};
    let currentAmount = amount;

    COIN.UNIT_LIST.reverse().forEach((unit) => {
      const maxAmount = Math.min(Math.floor(currentAmount / unit), this.#coins[unit]);
      this.#coins[unit] -= maxAmount;
      returnedCoins[unit] = maxAmount;
      currentAmount -= maxAmount * unit;
    });
    return returnedCoins;
  }
}
