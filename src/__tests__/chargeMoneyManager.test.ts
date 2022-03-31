import { ERROR_MESSAGE } from '../ts/constants/errorMessage';
import { CHARGE_MONEY } from '../ts/constants/chargeMoney';

import VendingMachineChargeMoneyManager from '../ts/domains/VendingMachineChargeMoneyManager';

describe('잔돈 관리 도메인 테스트', () => {
  test('잔돈 충전 탭에서 최초 자판기가 보유한 금액은 0원이며, 각 동전의 개수는 0개이다.', () => {
    const vendingMachineChargeMoneyManager =
      new VendingMachineChargeMoneyManager();

    expect(vendingMachineChargeMoneyManager.getTotalAmount()).toBe(0);
  });

  test(`보유할 수 있는 최대 누적 금액인 ${CHARGE_MONEY.MAX_TOTAL_CHARGE_MONEY}원까지 보관되는지 확인한다.`, () => {
    const vendingMachineChargeMoneyManager =
      new VendingMachineChargeMoneyManager();
    const chargeMoney = 100;

    expect(() => {
      vendingMachineChargeMoneyManager.addCoins(chargeMoney);
    }).not.toThrowError();
  });

  test(`보유할 수 있는 최대 누적 금액인 ${CHARGE_MONEY.MAX_TOTAL_CHARGE_MONEY}원을 초과하면 에러가 발생된다.`, () => {
    const vendingMachineChargeMoneyManager =
      new VendingMachineChargeMoneyManager();

    const chargeMoney = 100000;
    const newChargeMoney = 100;

    vendingMachineChargeMoneyManager.addCoins(chargeMoney);

    expect(() => {
      vendingMachineChargeMoneyManager.addCoins(newChargeMoney);
    }).toThrowError(
      ERROR_MESSAGE.OVERFLOW_CHARGE_MONEY(
        vendingMachineChargeMoneyManager.getTotalAmount()
      )
    );
  });
});
