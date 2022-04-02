import { ERROR_MESSAGE } from '../constants/errorConstants';
import { MONEY } from '../constants/vendingMachineConstants';
import { validateChargeCoins, validateInputMoney } from './validates';

describe('입력된 돈이 주어지면', () => {
  test('충전할 돈이 정수가 아니면 에러를 throw한다.', () => {
    const money = 0.1;

    expect(() => {
      validateChargeCoins(money);
    }).toThrowError(ERROR_MESSAGE.INPUT_MONEY.NOT_INTEGER);
  });

  test('충전할 돈이 0이하면 에러를 throw한다.', () => {
    const money = MONEY.MIN - 1;

    expect(() => {
      validateChargeCoins(money);
    }).toThrowError(ERROR_MESSAGE.INPUT_MONEY.UNDER_MIN);
  });

  test('충전할 돈이 100,000보다 크다면 에러를 throw한다.', () => {
    const money = MONEY.CHARGE_MAX + 1;

    expect(() => {
      validateChargeCoins(money);
    }).toThrowError(ERROR_MESSAGE.INPUT_MONEY.OVER_CHARGE_MAX);
  });

  test('충전할 돈이 10단위가 아니라면 에러를 throw한다.', () => {
    const money = MONEY.UNIT + 1;

    expect(() => {
      validateChargeCoins(money);
    }).toThrowError(ERROR_MESSAGE.INPUT_MONEY.INVALID_UNIT);
  });

  test('구매를 위해 투입한 돈이 10,000보다 크다면 에러를 throw 한다.', () => {
    const inputMoney = MONEY.INPUT_MAX + 1;

    expect(() => validateInputMoney(inputMoney)).toThrowError(
      ERROR_MESSAGE.INPUT_MONEY.OVER_INPUT_MAX
    );
  });
});
