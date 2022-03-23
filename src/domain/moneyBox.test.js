import MoneyBox from './MoneyBox';

describe('돈통 클래스 테스트', () => {
  test('금액을 투입했을 때 금액에 맞는 동전을 충전할 수 있다.', () => {
    const inputMoney = '3000';
    const mockCoinStatus = {
      FIVE_HUNDRED_WON: 5,
      ONE_HUNDRED_WON: 4,
      FIFTY_WON: 1,
      TEN_WON: 5,
    };
    const mockCoinDistributeStrategy = {
      distribute() {
        return mockCoinStatus;
      },
    };
    const moneyBox = new MoneyBox();
    moneyBox.strategy = mockCoinDistributeStrategy;
    moneyBox.charge(inputMoney);
    expect(moneyBox.coinStatus).toEqual(mockCoinStatus);
  });
});
