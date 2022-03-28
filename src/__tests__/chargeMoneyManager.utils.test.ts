import { checkValidChargeMoney } from '../ts/utils/utils';
import { CHARGE_MONEY, ERROR_MESSAGE } from '../ts/constants';

describe('올바른 잔돈 확인', () => {
  test(`잔돈이 ${CHARGE_MONEY.UNIT}으로 나누어 떨어지는지 확인한다.`, () => {
    const chargeMoney = 1000;

    expect(() => {
      checkValidChargeMoney(chargeMoney);
    }).not.toThrowError();
  });

  test(`잔돈이 ${CHARGE_MONEY.UNIT}으로 나누어 떨어지지 않을경우 에러가 발생된다.`, () => {
    const chargeMoney = 501;

    expect(() => {
      checkValidChargeMoney(chargeMoney);
    }).toThrowError(ERROR_MESSAGE.WRONG_UNIT_CHARGE_MONEY);
  });
});
