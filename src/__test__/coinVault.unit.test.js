import { CoinVault } from '../domain/CoinVault.ts';

import { COINS_INIT_QUANTITY, ERROR_MESSAGE } from '../utils/constants.ts';

describe('잔돈생성 테스트', () => {
  let coinVault;

  const initCoins = () => {
    coinVault.setCoins(COINS_INIT_QUANTITY);
  };

  beforeEach(() => {
    coinVault = new CoinVault();
    initCoins();
  });

  test('자판기가 최초 보유한 금액은 0원이다.', () => {
    const { coin500, coin100, coin50, coin10 } = coinVault.getCoins();
    
    expect(coin500).toStrictEqual(0);
    expect(coin100).toStrictEqual(0);
    expect(coin50).toStrictEqual(0);
    expect(coin10).toStrictEqual(0);

    expect(coinVault.getBalance()).toStrictEqual(0);
  });

  test('자판기 보유 금액은 최대 100,000원 이다.', () => {
    expect(() => coinVault.chargeMoney(100_010)).toThrowError(
      new Error(ERROR_MESSAGE.OVER_BALANCE_LIMIT)
    );
  });

  test('자판기 잔돈은 10원 단위만 투입 가능하다', () => {
    expect(() => coinVault.chargeMoney(1234)).toThrowError(
      new Error(ERROR_MESSAGE.NOT_DIVIDED_BY_COIN_UNIT)
    );
  });

  test('잔돈을 충전할 수 있다', () => {
    expect(coinVault.getBalance()).toStrictEqual(0);
    coinVault.chargeMoney(5000);

    expect(coinVault.getBalance()).toStrictEqual(5000);
  });

  test('자판기 보유 금액을 누적하여 충전할 수 있다', () => {
    expect(coinVault.getBalance()).toStrictEqual(0);

    coinVault.chargeMoney(5000);
    expect(coinVault.getBalance()).toStrictEqual(5000);

    coinVault.chargeMoney(5000);
    expect(coinVault.getBalance()).toStrictEqual(10_000);
  });

  test('추가 충전후 합산 금액도 100,000 을 넘을 수 없다', () => {
    expect(coinVault.getBalance()).toStrictEqual(0);

    coinVault.chargeMoney(50_000);
    expect(coinVault.getBalance()).toStrictEqual(50_000);

    expect(() => coinVault.chargeMoney(50010)).toThrowError(
      new Error(ERROR_MESSAGE.OVER_BALANCE_LIMIT)
    );
  });
});

describe('잔돈 반환 테스트', () => {
  const initCoins = () => {
    coinVault.setCoins(COINS_INIT_QUANTITY);
  };

  beforeAll(() => {
    jest.spyOn(CoinVault.prototype, 'generateRandomCoins').mockImplementation(() => {
      return {
        coin500: 0,
        coin100: 3,
        coin50: 2,
        coin10: 2,
      };
    });
  });

  let coinVault;

  beforeEach(() => {
    coinVault = new CoinVault();
    initCoins();
  });

  test('현재 보유한 최소 개수의 동전으로 잔돈을 돌려준다', () => {
    const purchaseMoney = 100;
    const returnedCoins = {
      coin500: 0,
      coin100: 1,
      coin50: 0,
      coin10: 0,
    };
    const remainder = 0;

    coinVault.chargeMoney(100);
    expect(coinVault.returnCoins(purchaseMoney)).toStrictEqual([returnedCoins, remainder]);
  });

  test('잔돈을 반환할 수 없는 경우 잔돈으로 반환할 수 있는 금액만 반환한다', () => {
    const purchaseMoney = 480;
    const returnedCoins = {
      coin500: 0,
      coin100: 3,
      coin50: 2,
      coin10: 2,
    };
    const remainder = 60;

    coinVault.chargeMoney(420);
    expect(coinVault.returnCoins(purchaseMoney)).toStrictEqual([returnedCoins, remainder]);
  });
});
