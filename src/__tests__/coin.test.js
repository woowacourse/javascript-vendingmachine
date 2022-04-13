import CoinStoreInstance from '../domains/stores/CoinStore';
import { createAction, COIN_ACTION } from '../domains/actions';

import { COIN, MONEY } from '../constants';

describe('잔돈을 충전할 수 있다.', () => {
  test('최초 자판기가 보유한 금액은 0원이다.', () => {
    expect(CoinStoreInstance.coinsCount.sum).toBe(MONEY.DEFAULT);
  });

  test('최초 각 동전의 개수는 0개이다.', () => {
    const initCoinsCount = {
      500: COIN.DEFAULT_COUNT,
      100: COIN.DEFAULT_COUNT,
      50: COIN.DEFAULT_COUNT,
      10: COIN.DEFAULT_COUNT,
      sum: MONEY.DEFAULT,
      money_input: MONEY.DEFAULT,
    };

    expect(CoinStoreInstance.coinsCount).toStrictEqual(initCoinsCount);
  });

  test('현재 보유 금액을 충전할 수 있다.', () => {
    const coinInputValue = 1000;
    
    CoinStoreInstance.updateCoinsCount(createAction(COIN_ACTION.COIN_CHARGE, coinInputValue));

    expect(CoinStoreInstance.coinsCount.sum).toBe(coinInputValue);
  });
});
