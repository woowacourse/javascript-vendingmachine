interface coins {
  coin500: number;
  coin100: number;
  coin50: number;
  coin10: number;
}

interface CoinManager {
  getCoins(): coins;
  getTotalAmount(): number;
  addCoins(newCoins: coins): void;
}

test('잔돈 충전 탭에서 최초 자판기가 보유한 금액은 0원이며, 각 동전의 개수는 0개이다.', () => {
  const vendingMachineCoinManager = new VendingMachineCoinManager();
  const isEmptyCoinCount = Object.values(
    vendingMachineCoinManager.getCoins()
  ).every((coinCount) => coinCount === 0);

  expect(isEmptyCoinCount).toBe(true);
});

test('잔돈 충전 탭에서 최초 자판기가 보유한 금액은 0원이며, 각 동전의 개수는 0개이다.', () => {
  const vendingMachineCoinManager = new VendingMachineCoinManager();

  expect(vendingMachineCoinManager.getTotalAmount()).toBe(0);
});

test('보유할 수 있는 최대 누적 금액은 100,000원이다.', () => {
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
  }).toThrowError('보유할 수 있는 최대 누적 금액은 100,000원입니다.');
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
