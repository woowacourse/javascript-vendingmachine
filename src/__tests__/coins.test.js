import Coin from '../js/models/Coin.ts';
import { ERROR_MESSAGE, COIN } from '../js/constants/constants.js';

describe('잔돈 충전 테스트', () => {
  let coin;
  beforeEach(() => {
    coin = new Coin();
  });

  it('정상적인 충전 금액을 입력할 수 있다', () => {
    const amount = 1000;
    coin.addAmount(amount);
    expect(coin.getAmount()).toEqual(amount);
  });

  it(`충전 금액은 ${COIN.MIN_UNIT}원 단위가 아니면 입력할 수 없다.`, () => {
    const indivisibleAmount = 10001;
    expect(() => coin.addAmount(indivisibleAmount)).toThrowError(ERROR_MESSAGE.NOT_DIVIDE_NUMBER);
  });

  it(`보유 금액은 ${COIN.MAX_AMOUNT}원 이상 보유할 수 없다.`, () => {
    const largeAmount = 51000;
    coin.addAmount(largeAmount);
    expect(() => coin.addAmount(largeAmount)).toThrowError(ERROR_MESSAGE.OVER_MAX_AMOUNT);
  });
});
