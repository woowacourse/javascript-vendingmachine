import { ERROR_MESSAGE } from '../ts/constants/errorMessage';
import { CHARGE_MONEY } from '../ts/constants/chargeMoney';
import { COINS } from '../ts/constants/chargeMoney';

import VendingMachineChargeMoneyManager from '../ts/domains/VendingMachineChargeMoneyManager';
import { checkCanAddMoney } from '../ts/validation/checkChargeMoney';

describe('잔돈 관리 도메인 테스트', () => {
  const chargeCoins = {
    ...COINS.INITIAL_QUANTITY_STATE,
    QUANTITY_COIN_100: 1000,
  };

  test('잔돈 충전 탭에서 최초 자판기가 보유한 금액은 0원이며, 각 동전의 개수는 0개이다.', () => {
    const vendingMachineChargeMoneyManager =
      new VendingMachineChargeMoneyManager();

    expect(vendingMachineChargeMoneyManager.getTotalAmount()).toBe(0);
  });

  test(`보유할 수 있는 최대 누적 금액인 ${CHARGE_MONEY.MAX_TOTAL_CHARGE_MONEY}원까지 보관되는지 확인한다.`, () => {
    const vendingMachineChargeMoneyManager =
      new VendingMachineChargeMoneyManager();

    expect(() => {
      vendingMachineChargeMoneyManager.addCoins(chargeCoins);
    }).not.toThrowError();
  });

  test(`보유할 수 있는 최대 누적 금액인 ${CHARGE_MONEY.MAX_TOTAL_CHARGE_MONEY}원을 초과하면 에러가 발생된다.`, () => {
    const vendingMachineChargeMoneyManager =
      new VendingMachineChargeMoneyManager();

    const newChargeCoins = {
      ...COINS.INITIAL_QUANTITY_STATE,
      QUANTITY_COIN_100: 1,
    };

    vendingMachineChargeMoneyManager.addCoins(chargeCoins);
    const totalChargeMoney = vendingMachineChargeMoneyManager.getTotalAmount();

    expect(() => {
      checkCanAddMoney(totalChargeMoney, newChargeCoins);
    }).toThrowError(ERROR_MESSAGE.OVERFLOW_CHARGE_MONEY(totalChargeMoney));
  });

  test('반환 금액이 자판기가 보유하고 있는 최소 동전 개수로 반환되는지 확인한다.', () => {
    const vendingMachineChargeMoneyManager =
      new VendingMachineChargeMoneyManager();

    const userChargeMoney = 1000;
    const chargeCoins = {
      QUANTITY_COIN_500: 1,
      QUANTITY_COIN_100: 4,
      QUANTITY_COIN_50: 4,
      QUANTITY_COIN_10: 10,
    };
    const returnCoins = {
      QUANTITY_COIN_500: 1,
      QUANTITY_COIN_100: 4,
      QUANTITY_COIN_50: 2,
      QUANTITY_COIN_10: 0,
    };

    vendingMachineChargeMoneyManager.addCoins(chargeCoins);

    const returnCoinsQuantity =
      vendingMachineChargeMoneyManager.getReturnCoins(userChargeMoney);
    expect(returnCoinsQuantity.QUANTITY_COIN_500).toBe(
      returnCoins.QUANTITY_COIN_500
    );
    expect(returnCoinsQuantity.QUANTITY_COIN_100).toBe(
      returnCoins.QUANTITY_COIN_100
    );
    expect(returnCoinsQuantity.QUANTITY_COIN_50).toBe(
      returnCoins.QUANTITY_COIN_50
    );
    expect(returnCoinsQuantity.QUANTITY_COIN_10).toBe(
      returnCoins.QUANTITY_COIN_10
    );
  });

  test('반환 금액이 자판기가 보유하고 있는 동전의 개수를 초과할 경우 보유한 금액 만큼 동전이 반환되는지 확인한다.', () => {
    const vendingMachineChargeMoneyManager =
      new VendingMachineChargeMoneyManager();

    const userChargeMoney = 1000;
    const chargeCoins = {
      QUANTITY_COIN_500: 1,
      QUANTITY_COIN_100: 2,
      QUANTITY_COIN_50: 4,
      QUANTITY_COIN_10: 5,
    };
    const returnCoins = {
      QUANTITY_COIN_500: 1,
      QUANTITY_COIN_100: 2,
      QUANTITY_COIN_50: 4,
      QUANTITY_COIN_10: 5,
    };

    vendingMachineChargeMoneyManager.addCoins(chargeCoins);

    const returnCoinsQuantity =
      vendingMachineChargeMoneyManager.getReturnCoins(userChargeMoney);

    expect(returnCoinsQuantity.QUANTITY_COIN_500).toBe(
      returnCoins.QUANTITY_COIN_500
    );
    expect(returnCoinsQuantity.QUANTITY_COIN_100).toBe(
      returnCoins.QUANTITY_COIN_100
    );
    expect(returnCoinsQuantity.QUANTITY_COIN_50).toBe(
      returnCoins.QUANTITY_COIN_50
    );
    expect(returnCoinsQuantity.QUANTITY_COIN_10).toBe(
      returnCoins.QUANTITY_COIN_10
    );
  });
});
