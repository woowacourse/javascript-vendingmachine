import MoneyBox from '../MoneyBox';

describe('돈통 클래스 테스트', () => {
  let moneyBox;
  let mockCoinStatusList;

  function setMockDistributeStrategy() {
    mockCoinStatusList = [
      { name: 'FIVE_HUNDRED_WON', value: 500, count: 5 },
      { name: 'ONE_HUNDRED_WON', value: 100, count: 4 },
      { name: 'FIFTY_WON', value: 50, count: 1 },
      { name: 'TEN_WON', value: 10, count: 5 },
    ];

    const mockCoinDistributeStrategy = {
      distribute() {
        return mockCoinStatusList;
      },
    };

    moneyBox.strategy = mockCoinDistributeStrategy;
  }

  beforeEach(() => {
    moneyBox = new MoneyBox();
  });

  test('금액을 투입했을 때 금액에 맞는 동전을 충전할 수 있다.', () => {
    const inputMoney = 3000;

    setMockDistributeStrategy();
    moneyBox.addChange(inputMoney);

    expect(moneyBox.coinStatusList).toEqual(mockCoinStatusList);
  });

  test('금액을 투입하고 총 보유 금액을 확인할 수 있다.', () => {
    const inputMoney = 3000;
    moneyBox.addChange(inputMoney);

    expect(moneyBox.totalChange).toEqual(inputMoney);
  });

  test('금액을 추가 투입하면 총 보유 금액에 더해진다.', () => {
    const firstInputMoney = 3000;
    moneyBox.addChange(firstInputMoney);

    const secondInputMoney = 2000;
    moneyBox.addChange(secondInputMoney);

    expect(moneyBox.totalChange).toEqual(firstInputMoney + secondInputMoney);
  });
});
