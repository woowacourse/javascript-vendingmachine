import CoinStore from '../../domains/stores/CoinStore';
import { createAction, COIN_ACTION } from '../../domains/actions';
import { COIN, MONEY } from '../../constants';

describe('잔돈을 충전할 수 있다.', () => {
  beforeEach(() => {
    CoinStore._instance = null;
  });

  test(`최초 자판기가 보유한 금액은 ${MONEY.DEFAULT}원이다.`, () => {
    expect(CoinStore.instance.machine.money).toBe(MONEY.DEFAULT);
  });

  test(`최초 각 동전의 개수는 ${COIN.DEFAULT_COUNT}개이다.`, () => {
    const initialCoinsCount = {
      500: COIN.DEFAULT_COUNT,
      100: COIN.DEFAULT_COUNT,
      50: COIN.DEFAULT_COUNT,
      10: COIN.DEFAULT_COUNT,
    };

    expect(CoinStore.instance.machine.coinsCount).toStrictEqual(initialCoinsCount);
  });

  test('현재 보유 금액을 충전할 수 있다.', () => {
    const machineMoneyInputValue = 1000;

    CoinStore.instance.updateMoneyStorage(createAction(COIN_ACTION.CHARGE, machineMoneyInputValue));

    expect(CoinStore.instance.machine.money).toBe(machineMoneyInputValue);
  });
});
