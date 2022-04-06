import { CHARGE_MONEY } from '../ts/constants/chargeMoney';
import { ERROR_MESSAGE } from '../ts/constants/errorMessage';
import {
  checkValidConsumerChargeMoney,
  checkCanSubtractConsumerChargeMoney,
} from '../ts/validation/checkConsumerChargeMoney';

describe('올바른 충전 금액 확인', () => {
  test(`잔돈이 ${CHARGE_MONEY.UNIT}원으로 나누어 떨어지는지 확인한다.`, () => {
    const chargeMoney = 1000;

    expect(() => {
      checkValidConsumerChargeMoney(chargeMoney);
    }).not.toThrowError();
  });

  test(`잔돈이 ${CHARGE_MONEY.UNIT}원으로 나누어 떨어지지 않을경우 에러가 발생된다.`, () => {
    const chargeMoney = 501;

    expect(() => {
      checkValidConsumerChargeMoney(chargeMoney);
    }).toThrowError(ERROR_MESSAGE.WRONG_UNIT_CHARGE_MONEY);
  });

  test(`충전 금액을 ${CHARGE_MONEY.UNIT}원 미만으로 입력했을 경우 에러가 발생한다.`, () => {
    const chargeMoney = 9;

    expect(() => {
      checkValidConsumerChargeMoney(chargeMoney);
    }).toThrowError(ERROR_MESSAGE.WRONG_RANGE_CHARGE_MONEY);
  });

  test(`충전 금액이 ${CHARGE_MONEY.CONSUMER_MAX_CHARGE_MONEY}원을 초과할 경우 에러가 발생한다.`, () => {
    const chargeMoney = 10010;

    expect(() => {
      checkValidConsumerChargeMoney(chargeMoney);
    }).toThrowError(ERROR_MESSAGE.WRONG_RANGE_CHARGE_MONEY);
  });

  test(`충전 금액은 ${CHARGE_MONEY.CONSUMER_MAX_CHARGE_MONEY}원까지 충전할 수 있다.`, () => {
    const chargeMoney = 10000;

    expect(() => {
      checkValidConsumerChargeMoney(chargeMoney);
    }).not.toThrowError();
  });

  test('투입된 금액보다 상품의 가격이 더 큰 경우 에러가 발생한다.', () => {
    const chargeMoney = 1000;
    const productPrice = 1300;

    expect(() => {
      checkCanSubtractConsumerChargeMoney(chargeMoney, productPrice);
    }).toThrowError(ERROR_MESSAGE.LACK_CHARGE_MONEY);
  });

  test('투입된 금액이 상품의 가격과 같거나 많은 경우 상품을 구매할 수 있다.', () => {
    const chargeMoney = 1000;
    const productPrice = 1000;

    expect(() => {
      checkCanSubtractConsumerChargeMoney(chargeMoney, productPrice);
    }).not.toThrowError();
  });
});
