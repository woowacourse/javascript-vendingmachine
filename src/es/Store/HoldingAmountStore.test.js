import HoldingAmountStore from '@Store/HoldingAmountStore';

describe('자판기 보유 동전 관리 로직 테스트', () => {
  beforeEach(() => {
    HoldingAmountStore.setState({ coins: [0, 0, 0, 0] });
  });

  test('1. 동전을 정상적으로 충전할 수 있어야 한다.', () => {
    const inputValue = 5000;
    HoldingAmountStore.addAmount(inputValue);

    expect(HoldingAmountStore.getTotalAmount()).toBe(inputValue);
  });
});
