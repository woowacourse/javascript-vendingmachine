import { ERROR_MESSAGE } from '../constants/errorConstants';
import { MONEY } from '../constants/vendingMachineConstants';
import { validateChargeMoney } from './validates';

describe('입력된 충전할 돈이 주어지면', () => {
  test('돈이 정수가 아니면 에러를 throw한다.', () => {
    const money = 0.1;

    expect(() => {
      validateChargeMoney(money);
    }).toThrowError(ERROR_MESSAGE.INPUT_MONEY.NOT_INTEGER);
  });

  test('돈이 0이하면 에러를 throw한다.', () => {
    const money = MONEY.MIN - 1;

    expect(() => {
      validateChargeMoney(money);
    }).toThrowError(ERROR_MESSAGE.INPUT_MONEY.UNDER_MIN);
  });

  test('돈이 100,000보다 크다면 에러를 throw한다.', () => {
    const money = MONEY.CHARGE_MAX + 1;

    expect(() => {
      validateChargeMoney(money);
    }).toThrowError(ERROR_MESSAGE.INPUT_MONEY.OVER_MAX);
  });

  test('돈이 10단위가 아니라면 에러를 throw한다.', () => {
    const money = MONEY.UNIT + 1;

    expect(() => {
      validateChargeMoney(money);
    }).toThrowError(ERROR_MESSAGE.INPUT_MONEY.INVALID_UNIT);
  });
});
