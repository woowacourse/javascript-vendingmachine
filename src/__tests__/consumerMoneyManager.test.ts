// - [ ] 상품 구매 페이지에서 최초 충전 금액은 0원이며, 반환된 각 동전의 개수는 0개이다. // domain
// - [ ] 사용자는 투입할 금액 입력 요소에 투입 금액을 입력한 후, 투입하기버튼을 이용하여 금액을 투입한다. // 금액이 투입되는지 확인 domain
//   - [ ] 금액은 10원으로 나누어 떨어지는 금액만 투입할 수 있다. // utils
//   - [ ] 최대 투입 금액은 10,000원이다. // utils
// - [ ] 금액은 누적으로 투입할 수 있다. // domain 누적 되는지 확인
// - [ ] 사용자가 버튼을 클릭했을 때 해당 행위가 정상적으로 동작하거나, 실패하였음을 snackbar를 통해 보여준다.
import VendingMachineConsumerMoneyManager, {
  checkValidConsumerChargeMoney,
  checkConsumerChargeMoneyLessThenPurchaseMoney,
} from '../ts/domains/VendingMachineConsumerMoneyManager';

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
    checkConsumerChargeMoneyLessThenPurchaseMoney(
      consumerChargeMoney,
      productPrice
    );
  }).toThrowError();
});

test('보유할 수 있는 최대 누적 금액인 10000원을 초과할 경우 에러가 발생한다.', () => {
  expect(() => {
    checkValidConsumerChargeMoney(10010);
  }).toThrowError(
    '충전 금액을 잘못 입력하셨습니다. 충전 금액은 최소 10원 이상 10000원 이하로 입력해주세요.'
  );
});
