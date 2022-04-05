import CoinStore from '../../domains/stores/CoinStore';
import { createAction, COIN_ACTION } from '../../domains/actions';
import { checkMachineMoneyValidation } from '../../validators';
import { ERROR_MESSAGE, MONEY } from '../../constants';

describe('잔돈 충전에 대한 유효성을 검사한다.', () => {
  const chargeCoin = (machineMoneyInputValue) => {
    checkMachineMoneyValidation(machineMoneyInputValue);

    CoinStore.instance.updateMoneyStorage(createAction(COIN_ACTION.CHARGE, machineMoneyInputValue));
  };

  beforeEach(() => {
    CoinStore._instance = null;
  });

  test('입력한 금액이 10원 단위로 나누어 떨어지지 않는 것을 허용하지 않는다.', () => {
    // given
    let machineMoneyInputValue = 1001;

    // when
    try {
      chargeCoin(machineMoneyInputValue);
    } catch (error) {
      // then
      expect(error.message).toBe(ERROR_MESSAGE.MONEY_CANNOT_DIVIDED_BY_TEN);
    }

    expect(CoinStore.instance.machine.money).toBe(MONEY.DEFAULT);

    // given
    machineMoneyInputValue = 1002;

    // when
    try {
      chargeCoin(machineMoneyInputValue);
    } catch (error) {
      // then
      expect(error.message).toBe(ERROR_MESSAGE.MONEY_CANNOT_DIVIDED_BY_TEN);
    }

    expect(CoinStore.instance.machine.money).toBe(MONEY.DEFAULT);

    // given
    machineMoneyInputValue = 1005;

    // when
    try {
      chargeCoin(machineMoneyInputValue);
    } catch (error) {
      // then
      expect(error.message).toBe(ERROR_MESSAGE.MONEY_CANNOT_DIVIDED_BY_TEN);
    }

    expect(CoinStore.instance.machine.money).toBe(MONEY.DEFAULT);
  });

  test(`현재 보유 금액이 ${MONEY.MACHINE_MAX}원을 초과하는 것을 허용하지 않는다.`, () => {
    // given
    const machineMoneyInputValue = MONEY.MACHINE_MAX + 1;

    // when
    try {
      chargeCoin(machineMoneyInputValue);
    } catch (error) {
      // then
      expect(error.message).toBe(ERROR_MESSAGE.IS_OVER_MAX_MACHINE_MONEY);
    }

    expect(CoinStore.instance.machine.money).toBe(MONEY.DEFAULT);
  });
});
