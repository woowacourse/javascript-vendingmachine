import VendingMachine from '../ts/domain/VendingMachine';

describe('잔돈 충전 테스트', () => {
  const vendingMachine = new VendingMachine();

  test('자판기 보유 금액을 누적하여 충전할 수 있다.', () => {
    const rechargeCoin = 1000;
    const prevTotalCoinAmount = vendingMachine.calculateTotalCoinAmount();

    vendingMachine.chargeCoin(rechargeCoin);
    expect(vendingMachine.calculateTotalCoinAmount()).toBe(prevTotalCoinAmount + rechargeCoin);
  });
});
