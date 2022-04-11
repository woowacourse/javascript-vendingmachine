import { Coins } from '../ts/types/vendingMachineCoinManager';

import { ERROR_MESSAGE, COINS, CHARGE_MONEY } from '../ts/constants';
import VendingMachineCoinManager from '../ts/domains/VendingMachineCoinManager';

describe('잔돈 관리 도메인 테스트', () => {
  test('잔돈 충전 탭에서 최초 자판기가 보유한 금액은 0원이며, 각 동전의 개수는 0개이다.', () => {
    const vendingMachineCoinManager = new VendingMachineCoinManager();

    expect(vendingMachineCoinManager.getTotalAmount()).toBe(0);
  });

  test(`보유할 수 있는 최대 누적 금액은 ${CHARGE_MONEY.MAX_TOTAL_CHARGE_MONEY}원이다.`, () => {
    const vendingMachineCoinManager = new VendingMachineCoinManager();
    const coins: Coins = {
      ...COINS.INITIAL_STATE,
      COIN_100: 1,
    };

    expect(() => {
      vendingMachineCoinManager.addCoins(coins);
    }).not.toThrowError();
  });

  test(`보유할 수 있는 최대 누적 금액은 ${CHARGE_MONEY.MAX_TOTAL_CHARGE_MONEY}원이다.`, () => {
    const vendingMachineCoinManager = new VendingMachineCoinManager();
    const coins: Coins = {
      ...COINS.INITIAL_STATE,
      COIN_100: 1000,
    };
    const newCoins: Coins = {
      ...COINS.INITIAL_STATE,
      COIN_100: 1,
    };

    vendingMachineCoinManager.addCoins(coins);

    expect(() => {
      vendingMachineCoinManager.addCoins(newCoins);
    }).toThrowError(ERROR_MESSAGE.OVERFLOW_CHARGE_MONEY);
  });
});
