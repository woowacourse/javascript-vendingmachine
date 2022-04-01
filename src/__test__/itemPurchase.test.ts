import { COIN_10, COIN_100, COIN_50, COIN_500 } from '../ts/constant/rule';
import type { CoinCollection } from '../ts/vendingMachine/CoinRecharge';

const giveChange = (moneyInput: number, coinCollection: CoinCollection) => {
  const change: CoinCollection = {
    [COIN_500]: 0,
    [COIN_100]: 0,
    [COIN_50]: 0,
    [COIN_10]: 0,
  };
  let remainedMoney = moneyInput;
  const coins = { ...coinCollection };

  Object.keys(coins)
    .sort((a, b) => Number(b) - Number(a))
    .forEach((coin) => {
      const coinValue = Number(coin);
      while (coinValue <= remainedMoney) {
        if (coins[coinValue] === 0) break;
        change[coinValue]++;
        remainedMoney -= coinValue;
        coins[coinValue] -= 1;
      }
    });
  return {
    change,
    remainedMoney,
  };
};

const calculateTotalChange = (change: CoinCollection) => {
  return Object.entries(change).reduce((prev, [key, value]) => prev + Number(key) * value, 0);
};

describe('잔돈 반환 테스트', () => {
  test('남은 투입 금액을 반환할 수 있다.', () => {
    const coinCollection: CoinCollection = {
      [COIN_500]: 0,
      [COIN_100]: 5,
      [COIN_50]: 1,
      [COIN_10]: 1,
    };
    const remainedMoneyInput = 1000;
    const { change, remainedMoney } = giveChange(remainedMoneyInput, coinCollection);
    expect(calculateTotalChange(change)).toBe(remainedMoneyInput - remainedMoney);
  });

  test('현재 보유한 최소 개수의 동전으로 잔돈을 돌려준다.', () => {
    const coinCollection: CoinCollection = {
      [COIN_500]: 3,
      [COIN_100]: 15,
      [COIN_50]: 10,
      [COIN_10]: 10,
    };
    const remainedMoneyInput = 1500;
    const { change } = giveChange(remainedMoneyInput, coinCollection);
    expect(change[COIN_500]).toBe(3);
  });
});
