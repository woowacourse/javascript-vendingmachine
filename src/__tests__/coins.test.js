import Coin from '../js/models/Coin.ts';
import { ERROR_MESSAGE, COIN } from '../js/constants/constants.js';

describe('잔돈 충전 테스트', () => {
  it('정상적인 충전 금액을 입력할 수 있다', () => {
    const coin = new Coin();
    const amount = 1000;
    coin.setAmount(amount);
    expect(coin.getAmount()).toEqual(amount);
  });

  it('충전 금액은 10원 단위가 아니면 입력할 수 없다.', () => {
    const coin = new Coin();
    const indivisibleAmount = 10001;
    expect(() => coin.setAmount(indivisibleAmount)).toThrowError(ERROR_MESSAGE.NOT_DIVIDE_NUMBER);
  });

  it('보유 금액은 100,000원 이상 보유할 수 없다.', () => {
    const coin = new Coin();
    const largeAmount = 51000;
    coin.setAmount(largeAmount);
    expect(() => coin.setAmount(largeAmount)).toThrowError(ERROR_MESSAGE.OVER_MAX_AMOUNT);
  });

  it('충전 금액만큼의 동전이 무작위로 생성된다.', () => {
    const coin = new Coin();
    const amount = 1000;
    coin.setAmount(amount);
    const coinValues = Object.values(coin.getCoins()).reverse();
    const totalAmount = coinValues.reduce((acc, cur, idx) => {
      return acc + cur * COIN.UNIT_LIST[idx];
    }, 0);
    expect(coin.getAmount()).toEqual(totalAmount);
  });
});
