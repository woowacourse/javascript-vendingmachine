import { COINS } from '../constants/vendingMachineConstants';
import CoinManager from './coinManager';

describe('잔돈 충전', () => {
  test('최초 자판기가 가지고있는 각 동전의 개수는 0개이다.', () => {
    const vendingMachine = new CoinManager();

    expect(vendingMachine.coins).toEqual({ ten: 0, fifty: 0, hundred: 0, fiveHundred: 0 });
  });

  test('자판기 보유 금액을 충전할 수 있다.', () => {
    const vendingMachine = new CoinManager();
    const validInputCoinsSum = 610;
    let totalMoney = 0;

    vendingMachine.chargeCoinsSum(validInputCoinsSum);

    const { coins } = vendingMachine;

    Object.keys(coins).forEach(key => {
      totalMoney += COINS[key] * coins[key];
    });

    expect(totalMoney).toBe(validInputCoinsSum);
  });
});
