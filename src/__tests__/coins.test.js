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

  it('최소 10원까지 잔돈 충전을 할 수 있다.', () => {
    const coin = new Coin();
    const minimumAmount = 10;
    coin.setAmount(minimumAmount);
    expect(coin.getAmount()).toEqual(minimumAmount);
  });

  it('최대 100,000원까지 잔돈 충전을 할 수 있다.', () => {
    const coin = new Coin();
    const maximumAmount = 100000;
    coin.setAmount(maximumAmount);
    expect(coin.getAmount()).toEqual(maximumAmount);
  });

  it('10원 미만으로 잔돈 충전을 할 수 없다.', () => {
    const coin = new Coin();
    const underAmount = 9;
    expect(() => coin.setAmount(underAmount)).toThrowError(ERROR_MESSAGE.NOT_DIVIDE_NUMBER);
  });

  it('잔돈 충전 금액은 100,000원 초과 할 수 없다.', () => {
    const coin = new Coin();
    const overAmount = 100010;
    expect(() => coin.setAmount(overAmount)).toThrowError(ERROR_MESSAGE.OVER_MAX_AMOUNT);
  });

  it('충전 금액만큼의 동전이 무작위로 생성된다.', () => {
    const coin = new Coin();
    const amount = 1000;
    coin.setAmount(amount);
    const coinValues = Object.values(coin.getCoins());
    const totalAmount = coinValues.reduce((acc, cur, idx) => {
      return acc + cur * COIN.UNIT_LIST[idx];
    }, 0);
    expect(coin.getAmount()).toEqual(totalAmount);
  });
});
