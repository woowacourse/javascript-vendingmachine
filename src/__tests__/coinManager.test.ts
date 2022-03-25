import { ERROR_MESSAGE } from '../ts/constants';
import VendingMachineCoinManager, {
  coins,
} from '../ts/VendingMachineCoinManager';

describe('잔돈 관리 도메인 테스트', () => {
  test('잔돈 충전 탭에서 최초 자판기가 보유한 금액은 0원이며, 각 동전의 개수는 0개이다.', () => {
    const vendingMachineCoinManager = new VendingMachineCoinManager();

    expect(vendingMachineCoinManager.getTotalAmount()).toBe(0);
  });

  test('보유할 수 있는 최대 누적 금액은 100,000원이다.', () => {
    const vendingMachineCoinManager = new VendingMachineCoinManager();
    const coins: coins = {
      coin500: 0,
      coin100: 1,
      coin50: 0,
      coin10: 0,
    };

    expect(() => {
      vendingMachineCoinManager.addCoins(coins);
    }).not.toThrowError();
  });

  test(`보유할 수 있는 최대 누적 금액은 100,000원이다.`, () => {
    const vendingMachineCoinManager = new VendingMachineCoinManager();
    const coins: coins = {
      coin500: 0,
      coin100: 1000,
      coin50: 0,
      coin10: 0,
    };
    const newCoins: coins = {
      coin500: 0,
      coin100: 1,
      coin50: 0,
      coin10: 0,
    };

    vendingMachineCoinManager.addCoins(coins);

    expect(() => {
      vendingMachineCoinManager.addCoins(newCoins);
    }).toThrowError(
      ERROR_MESSAGE.OVERFLOW_CHARGE_MONEY(
        vendingMachineCoinManager.getTotalAmount()
      )
    );
  });
});
