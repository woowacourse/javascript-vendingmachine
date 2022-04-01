import { UserMoney } from '../domain/UserMoney';

import { ERROR_MESSAGE } from '../utils/constants';

describe('사용자가 사용할 금액 투입 테스트', () => {
  let userMoney;

  beforeEach(() => {
    userMoney = new UserMoney();
  });

  test('최초 충전 금액은 0원이다', () => {
    expect(userMoney.getMoney()).toStrictEqual(0);
  });

  test('사용자가 사용할 금액을 투입할 수 있다', () => {
    expect(userMoney.getMoney()).toStrictEqual(0);

    userMoney.addMoney(1000);
    expect(userMoney.getMoney()).toStrictEqual(1000);
  });

  test('사용자가 사용할 금액을 누적으로 투입할 수 있다', () => {
    expect(userMoney.getMoney()).toStrictEqual(0);

    userMoney.addMoney(1000);
    userMoney.addMoney(1000);
    expect(userMoney.getMoney()).toStrictEqual(2000);
  });
});

describe('예외사항', () => {
  let userMoney;

  beforeEach(() => {
    userMoney = new UserMoney();
  });

  test('10원으로 나누어 떨어지는 금액만 투입할 수 있다.', () => {
    expect(() => userMoney.isValidatedMoney(1)).toThrowError(
      new Error(ERROR_MESSAGE.INVALID_USER_MONEY)
    );
  });

  test('최대 투입 금액은 10,000원이다', () => {
    expect(() => userMoney.isValidatedMoney(10010)).toThrowError(
      new Error(ERROR_MESSAGE.OVER_USER_MONEY_LIMIT)
    );
  });
});
