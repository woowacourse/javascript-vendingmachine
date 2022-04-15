import VendingMachineConsumerMoneyManager from '../ts/domains/VendingMachineConsumerMoneyManager';
import { CHARGE_MONEY } from '../ts/constants/chargeMoney';

describe('상품 구매 도메인 테스트', () => {
  const chargeMoney = 1000;

  test('최초 상품 구매를 위한 금액은 0원이며, 각 동전의 개수가 0개인지 확인한다.', () => {
    const vendingMachineConsumerMoneyManager =
      new VendingMachineConsumerMoneyManager();

    expect(vendingMachineConsumerMoneyManager.getConsumerChargeMoney()).toBe(0);
  });

  test('상품 구매를 위해 투입한 금액이 정상적으로 투입되는지 확인한다.', () => {
    const vendingMachineConsumerMoneyManager =
      new VendingMachineConsumerMoneyManager();

    vendingMachineConsumerMoneyManager.addConsumerChargeMoney(chargeMoney);
    expect(vendingMachineConsumerMoneyManager.getConsumerChargeMoney()).toBe(
      chargeMoney
    );
  });

  test('상품 구매를 위해 투입한 금액이 누적되는지 확인한다.', () => {
    const vendingMachineConsumerMoneyManager =
      new VendingMachineConsumerMoneyManager();

    vendingMachineConsumerMoneyManager.addConsumerChargeMoney(chargeMoney);
    vendingMachineConsumerMoneyManager.addConsumerChargeMoney(chargeMoney);

    expect(vendingMachineConsumerMoneyManager.getConsumerChargeMoney()).toBe(
      chargeMoney + chargeMoney
    );
  });

  test(`보유할 수 있는 최대 누적 금액인 ${CHARGE_MONEY.CONSUMER_MAX_CHARGE_MONEY}원 까지 투입되는지 확인한다.`, () => {
    const vendingMachineConsumerMoneyManager =
      new VendingMachineConsumerMoneyManager();

    vendingMachineConsumerMoneyManager.addConsumerChargeMoney(
      CHARGE_MONEY.CONSUMER_MAX_CHARGE_MONEY
    );

    expect(vendingMachineConsumerMoneyManager.getConsumerChargeMoney()).toBe(
      CHARGE_MONEY.CONSUMER_MAX_CHARGE_MONEY
    );
  });

  test('누적 금액에서 상품의 가격만큼 차감된 금액이 저장되는지 확인한다.', () => {
    const vendingMachineConsumerMoneyManager =
      new VendingMachineConsumerMoneyManager();
    const subtractMoney = 1000;

    vendingMachineConsumerMoneyManager.addConsumerChargeMoney(
      CHARGE_MONEY.CONSUMER_MAX_CHARGE_MONEY
    );
    vendingMachineConsumerMoneyManager.subtractConsumerChargeMoney(
      subtractMoney
    );

    expect(vendingMachineConsumerMoneyManager.getConsumerChargeMoney()).toBe(
      CHARGE_MONEY.CONSUMER_MAX_CHARGE_MONEY - subtractMoney
    );
  });
});
