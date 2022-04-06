import ChargeMoneyTab from '../core/ChargeMoneyTab';
import VerifyValueValidation from '../validations/verifyValueValidation';
import { generateRandomCoins } from '../utils/productUtil';

describe('chargeMoney', () => {
  const coins = [
    { amount: 10, count: 0 },
    { amount: 50, count: 0 },
    { amount: 100, count: 0 },
    { amount: 500, count: 0 },
  ];
  const verifyValue = new VerifyValueValidation([], coins);
  const chargeMoney = new ChargeMoneyTab(coins);

  test('투입 금액이 10으로 나누어 떨어지지 않을 때, 동전이 충전되지 않는지 확인', () => {
    const inputMoney = 1555;
    expect(verifyValue.isValidChargeMoney(inputMoney)).toBe(false);
  });

  test('투입 금액이 1000원보다 작을 때, 동전이 충전되지 않는지 확인', () => {
    const inputMoney = 900;
    expect(verifyValue.isValidChargeMoney(inputMoney)).toBe(false);
  });

  test('보유 금액과 투입 금액의 합이 100,000을 넘을 때, 동전이 충전되지 않는지 확인', () => {
    const inputMoney = 11000;
    const holdingMoney = 90000;

    chargeMoney.chargeMoney(generateRandomCoins.call(chargeMoney, holdingMoney));
    expect(verifyValue.isValidChargeMoneyOver(inputMoney)).toBe(false);
  });

  test('투입 금액만큼 동전이 만들어지는지 확인', () => {
    chargeMoney.coins = [
      { amount: 10, count: 0 },
      { amount: 50, count: 0 },
      { amount: 100, count: 0 },
      { amount: 500, count: 0 },
    ];
    const inputMoney = 89500;

    chargeMoney.chargeMoney(generateRandomCoins.call(chargeMoney, inputMoney));
    expect(verifyValue.totalAmount.call(chargeMoney, chargeMoney.coins)).toBe(inputMoney);
  });
});
