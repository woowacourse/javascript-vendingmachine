import { Coins } from '../ts/types/CoinManager';

import { ERROR_MESSAGE, COINS, CHARGE_MONEY } from '../ts/constants';
import CoinManager from '../ts/domains/CoinManager';

describe('잔돈 관리 도메인 테스트', () => {
  test('잔돈 충전 탭에서 최초 자판기가 보유한 금액은 0원이며, 각 동전의 개수는 0개이다.', () => {
    const coinManager = new CoinManager();

    expect(coinManager.getTotalAmount()).toBe(0);
  });

  test(`보유할 수 있는 최대 누적 금액은 ${CHARGE_MONEY.MAX_TOTAL_CHARGE_MONEY}원이다.`, () => {
    const coinManager = new CoinManager();
    const coins: Coins = {
      ...COINS.INITIAL_STATE,
      COIN_100: 1,
    };

    expect(() => {
      coinManager.addCoins(coins);
    }).not.toThrowError();
  });

  test(`보유할 수 있는 최대 누적 금액은 ${CHARGE_MONEY.MAX_TOTAL_CHARGE_MONEY}원이다.`, () => {
    const coinManager = new CoinManager();
    const coins: Coins = {
      ...COINS.INITIAL_STATE,
      COIN_100: 1000,
    };
    const newCoins: Coins = {
      ...COINS.INITIAL_STATE,
      COIN_100: 1,
    };

    coinManager.addCoins(coins);

    expect(() => {
      coinManager.addCoins(newCoins);
    }).toThrowError(ERROR_MESSAGE.OVERFLOW_CHARGE_MONEY);
  });
});
