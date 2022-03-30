import ChargeMoneyImpl from '../core/ChargeMoneyImpl';
import { isValidMoney, totalAmount } from '../validation/isValidMoney';

jest.spyOn(window, 'alert').mockImplementation(() => {});

describe('chargeMoney', () => {
  let chargeMoney;

  beforeEach(
    () =>
      (chargeMoney = new ChargeMoneyImpl([
        { amount: 10, count: 0 },
        { amount: 50, count: 0 },
        { amount: 100, count: 0 },
        { amount: 500, count: 0 },
      ])),
  );

  test('투입 금액이 10으로 나누어 떨어지지 않을 때, 동전이 충전되지 않는지 확인', () => {
    const inputMoney = 1555;

    expect(isValidMoney(inputMoney, chargeMoney.coins)).toBe(false);
  });

  test('투입 금액이 1000원보다 작을 때, 동전이 충전되지 않는지 확인', () => {
    const inputMoney = 900;

    expect(isValidMoney(inputMoney, chargeMoney.coins)).toBe(false);
  });

  test('보유 금액과 투입 금액의 합이 100,000을 넘을 때, 동전이 충전되지 않는지 확인', () => {
    const inputMoney = 11000;
    const holdingMoney = 90000;

    chargeMoney.chargeMoney(chargeMoney.generateRandomCoins(holdingMoney));

    expect(isValidMoney(inputMoney, chargeMoney.coins)).toBe(false);
  });

  test('투입 금액만큼 동전이 만들어지는지 확인', () => {
    const inputMoney = 89500;

    chargeMoney.chargeMoney(chargeMoney.generateRandomCoins(inputMoney));

    expect(totalAmount(chargeMoney.coins)).toBe(inputMoney);
  });
});
