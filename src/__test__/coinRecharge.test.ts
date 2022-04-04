import CoinRecharge from '../ts/vendingMachine/CoinRecharge';

describe('잔돈 충전 테스트', () => {
  const vendingMachine = new CoinRecharge();

  test('자판기 보유 금액을 누적하여 충전할 수 있다.', () => {
    const chargeCoin = 3000;
    const prevTotalCoinAmount = vendingMachine.chargeCoin(chargeCoin);

    const rechargeCoin = 1000;
    expect(vendingMachine.chargeCoin(rechargeCoin)).toBe(prevTotalCoinAmount + rechargeCoin);
  });
});
