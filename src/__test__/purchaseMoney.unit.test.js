import { PurchaseMoney } from '../domain/PurchaseMoney';

import { ERROR_MESSAGE } from '../utils/constants';

describe('사용자가 사용할 금액 투입 테스트', () => {
  let purchaseMoney;

  const initPurchaseMoney = () => {
    purchaseMoney.setMoney(0);
  };

  beforeEach(() => {
    purchaseMoney = new PurchaseMoney();
  });

  test('최초 충전 금액은 0원이다', () => {
    expect(purchaseMoney.getMoney()).toStrictEqual(0);
  });

  test('사용자가 사용할 금액을 투입할 수 있다', () => {
    expect(purchaseMoney.getMoney()).toStrictEqual(0);

    purchaseMoney.addMoney(1000);
    expect(purchaseMoney.getMoney()).toStrictEqual(1000);
  });

  test('사용자가 사용할 금액을 누적으로 투입할 수 있다', () => {
    initPurchaseMoney();
    expect(purchaseMoney.getMoney()).toStrictEqual(0);

    purchaseMoney.addMoney(1000);
    purchaseMoney.addMoney(1000);
    expect(purchaseMoney.getMoney()).toStrictEqual(2000);
  });
});

describe('예외사항', () => {
  let purchaseMoney;

  beforeEach(() => {
    purchaseMoney = new PurchaseMoney();
  });

  test('10원으로 나누어 떨어지는 금액만 투입할 수 있다.', () => {
    expect(() => purchaseMoney.addMoney(1)).toThrowError(
      new Error(ERROR_MESSAGE.INVALID_PURCHASE_MONEY)
    );
  });

  test('최대 투입 금액은 10,000원이다', () => {
    expect(() => purchaseMoney.addMoney(10010)).toThrowError(
      new Error(ERROR_MESSAGE.OVER_PURCHASE_MONEY_LIMIT)
    );
  });
});
