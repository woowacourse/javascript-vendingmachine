import HoldingAmountStore from 'Store/HoldingAmountStore';

const testSetting = {
  holdingAmount: 5000,
  updateCoinList: [9, 4, 2, 0],
  chargeAmount: 3000,
};

describe('자판기 보유 동전 관리 로직 테스트', () => {
  test('1. 동전을 정상적으로 충전할 수 있어야 한다.', () => {
    const spy = jest
      .spyOn(HoldingAmountStore, 'getRandomCoinsFromAmount')
      .mockImplementation(() => testSetting.updateCoinList);

    HoldingAmountStore.addHoldingAmount(testSetting.holdingAmount);
    expect(HoldingAmountStore.getState().holdingCoins).toStrictEqual(testSetting.updateCoinList);

    spy.mockRestore();
  });

  test('2. 보유한 동전의 총액을 계산할 수 있어야 한다.', () => {
    expect(HoldingAmountStore.getTotalAmount()).toBe(testSetting.holdingAmount);
  });

  test('3. 상품 구매를 위한 사용자 충전 금액을 충전하고, 차감할 수 있어야 한다.', () => {
    HoldingAmountStore.updateChargeAmount('charge', testSetting.chargeAmount);
    expect(HoldingAmountStore.getState().chargedAmount).toBe(testSetting.chargeAmount);

    HoldingAmountStore.updateChargeAmount('subtract', testSetting.chargeAmount);
    expect(HoldingAmountStore.getState().chargedAmount).toBe(0);
  });

  describe('4. 상품 구매 후 잔돈을 반환할 수 있어야한다.', () => {
    test('4-1. 일부 금액을 반환 시도한다.', () => {
      HoldingAmountStore.updateChargeAmount('charge', testSetting.chargeAmount);
      HoldingAmountStore.returnCoins();
      expect(HoldingAmountStore.getState().returnCoins).toStrictEqual([6, 0, 0, 0]);
    });

    test('4-2. 초과 금액 반환 시도 후 반환 동전 및 잔액을 확인한다.', () => {
      HoldingAmountStore.updateChargeAmount('charge', 5000);
      HoldingAmountStore.returnCoins();
      expect(HoldingAmountStore.getState().returnCoins).toStrictEqual([3, 4, 2, 0]);
      expect(HoldingAmountStore.getState().chargedAmount).toBe(3000);
    });
  });
});
