import { COIN } from '../constants/constants.js';
import { getRandomNumber } from '../utils/common.js';
import { validChargeAmount } from '../utils/validation.js';
import { Coins, CoinInterface } from '../interface/coins.interface';

export default class Coin implements CoinInterface {
  private amount: number;
  private coins: Coins;

  constructor() {
    this.amount = 0;
    this.coins = {
      500: 0,
      100: 0,
      50: 0,
      10: 0,
    };
  }

  setAmount(chargedAmount: number): void {
    const currentAmount = this.amount + chargedAmount;
    validChargeAmount(chargedAmount, currentAmount);
    this.amount = currentAmount;
    this.makeRandomCoins(chargedAmount);
  }

  getAmount(): number {
    return this.amount;
  }

  getCoins(): Coins {
    return this.coins;
  }

  // 뽑을 수 있는 동전리스트 인덱스 범위를 찾는다. ex) 잔돈이 120원 일 경우 [10, 50, 100] 중 랜덤 인덱스
  // 해당 동전의 카운트를 증가한다
  // 0원이 될때까지 반복한다
  addCoinCount(index: number) {
    const coinCount = getRandomNumber(index);
    const coin = COIN.UNIT_LIST[coinCount];
    this.coins[coin] += 1;
    return coin;
  }

  makeRandomCoins(amount: number): void {
    let currentAmount = amount;

    while (currentAmount > 0) {
      if (currentAmount >= COIN.UNIT_LIST[3]) {
        currentAmount -= this.addCoinCount(3);
        continue;
      }
      if (currentAmount >= COIN.UNIT_LIST[2]) {
        currentAmount -= this.addCoinCount(2);
        continue;
      }
      if (currentAmount >= COIN.UNIT_LIST[1]) {
        currentAmount -= this.addCoinCount(1);
        continue;
      }
      // 잔돈이 50 보다 작을 경우 전부 다 10원으로 충전한다
      this.coins[COIN.UNIT_LIST[0]] += currentAmount / COIN.UNIT_LIST[0];
      break;
    }
  }
}
