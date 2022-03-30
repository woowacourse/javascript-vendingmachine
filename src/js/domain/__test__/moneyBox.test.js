/* eslint-disable max-lines-per-function */
import MoneyBox from '../MoneyBox';
import { COIN_500, COIN_100, COIN_50, COIN_10 } from '../../constants';

describe('돈통 클래스 테스트', () => {
  let moneyBox;
  let mockCoinStatusList;

  function setMockDistributeStrategy() {
    mockCoinStatusList = [
      { name: COIN_500.NAME, value: COIN_500.VALUE, count: 5 },
      { name: COIN_100.NAME, value: COIN_100.VALUE, count: 4 },
      { name: COIN_50.NAME, value: COIN_50.VALUE, count: 1 },
      { name: COIN_10.NAME, value: COIN_10.VALUE, count: 5 },
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
