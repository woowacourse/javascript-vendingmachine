import { CoinVault } from '../domain/CoinVault.ts';
import { ERROR_MESSAGE } from '../utils/constants.ts';

describe('잔돈생성 테스트', () => {
  let coinValut;

  beforeEach(() => {
    coinValut = new CoinVault();
  });

  test('자판기가 최초 보유한 금액은 0원이다.', () => {
    const { coin500, coin100, coin50, coin10 } = coinValut.getCoins();
    expect(coin500).toStrictEqual(0);
    expect(coin100).toStrictEqual(0);
    expect(coin50).toStrictEqual(0);
    expect(coin10).toStrictEqual(0);

    expect(coinValut.getBalance()).toStrictEqual(0);
  });

  test('자판기 보유 금액은 최대 100,000원 이다.', () => {
    expect(() => coinValut.chargeMoney(100010)).toThrowError(
      new Error(ERROR_MESSAGE.OVER_BALANCE_LIMIT)
    );
  });

  test('자판기 잔돈은 10원 단위만 투입 가능하다', () => {
    expect(() => coinValut.chargeMoney(1234)).toThrowError(
      new Error(ERROR_MESSAGE.NOT_DIVIDED_BY_COIN_UNIT)
    );
  });

  test('잔돈을 충전할 수 있다', () => {
    expect(coinValut.getBalance()).toStrictEqual(0);
    coinValut.chargeMoney(5000);

    expect(coinValut.getBalance()).toStrictEqual(5000);
  });

  test('자판기 보유 금액을 누적하여 충전할 수 있다', () => {
    expect(coinValut.getBalance()).toStrictEqual(0);

    coinValut.chargeMoney(5000);
    expect(coinValut.getBalance()).toStrictEqual(5000);

    coinValut.chargeMoney(5000);
    expect(coinValut.getBalance()).toStrictEqual(10000);
  });

  test('추가 충전후 합산 금액도 100,000 을 넘을 수 없다', () => {
    expect(coinValut.getBalance()).toStrictEqual(0);

    coinValut.chargeMoney(50000);
    expect(coinValut.getBalance()).toStrictEqual(50000);

    expect(() => coinValut.chargeMoney(50010)).toThrowError(
      new Error(ERROR_MESSAGE.OVER_BALANCE_LIMIT)
    );
  });
});
