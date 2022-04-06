import VendingMachineConsumerMoneyManager from '../ts/domains/VendingMachineConsumerMoneyManager';
import {
  checkValidConsumerChargeMoney,
  checkCanSubtractConsumerChargeMoney,
} from '../ts/validation/checkConsumerChargeMoney';

test('최초 상품 구매를 위한 금액은 0원이며, 각 동전의 개수가 0개인지 확인한다.', () => {
  const vendingMachineConsumerMoneyManager =
    new VendingMachineConsumerMoneyManager();

  expect(vendingMachineConsumerMoneyManager.getConsumerChargeMoney()).toBe(0);
});

test('상품 구매를 위해 투입한 금액이 정상적으로 투입되는지 확인한다.', () => {
  const vendingMachineConsumerMoneyManager =
    new VendingMachineConsumerMoneyManager();

  vendingMachineConsumerMoneyManager.addConsumerChargeMoney(1000);
  expect(vendingMachineConsumerMoneyManager.getConsumerChargeMoney()).toBe(
    1000
  );
});

test('상품 구매를 위해 투입한 금액이 누적되는지 확인한다.', () => {
  const vendingMachineConsumerMoneyManager =
    new VendingMachineConsumerMoneyManager();

  vendingMachineConsumerMoneyManager.addConsumerChargeMoney(1000);
  vendingMachineConsumerMoneyManager.addConsumerChargeMoney(1000);

  expect(vendingMachineConsumerMoneyManager.getConsumerChargeMoney()).toBe(
    2000
  );
});

test('보유할 수 있는 최대 누적 금액인 10000원 까지 투입되는지 확인한다.', () => {
  const vendingMachineConsumerMoneyManager =
    new VendingMachineConsumerMoneyManager();

  vendingMachineConsumerMoneyManager.addConsumerChargeMoney(10000);

  expect(vendingMachineConsumerMoneyManager.getConsumerChargeMoney()).toBe(
    10000
  );
});

test('누적 금액에서 상품의 가격만큼 차감된 금액이 저장되는지 확인한다.', () => {
  const vendingMachineConsumerMoneyManager =
    new VendingMachineConsumerMoneyManager();

  vendingMachineConsumerMoneyManager.addConsumerChargeMoney(10000);
  vendingMachineConsumerMoneyManager.subtractConsumerChargeMoney(1000);

  expect(vendingMachineConsumerMoneyManager.getConsumerChargeMoney()).toBe(
    9000
  );
});

test('누적 금액보다 상품의 가격이 비쌀 경우 에러가 발생한다.', () => {
  const consumerChargeMoney = 1000;
  const productPrice = 1100;

  expect(() => {
    checkCanSubtractConsumerChargeMoney(consumerChargeMoney, productPrice);
  }).toThrowError(
    '투입된 금액이 부족합니다. 금액을 확인후 금액을 추가로 투입해주세요.'
  );
});

test('보유할 수 있는 최대 누적 금액인 10000원을 초과할 경우 에러가 발생한다.', () => {
  expect(() => {
    checkValidConsumerChargeMoney(10010);
  }).toThrowError(
    '충전 금액을 잘못 입력하셨습니다. 충전 금액은 최소 10원 이상 10000원 이하로 입력해주세요.'
  );
});
