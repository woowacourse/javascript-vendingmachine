/* eslint-disable max-lines-per-function */
import MoneyBox from '../MoneyBox';

describe('돈통 클래스 테스트', () => {
  let moneyBox;

  beforeEach(() => {
    moneyBox = new MoneyBox();
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

  describe('잔돈 반환 기능 테스트', () => {
    beforeEach(() => {
      const testDistributeStrategy = {
        distribute() {
          return [
            { name: 'FIVE_HUNDRED_WON', value: 500, count: 5 },
            { name: 'ONE_HUNDRED_WON', value: 100, count: 4 },
            { name: 'FIFTY_WON', value: 50, count: 3 },
            { name: 'TEN_WON', value: 10, count: 2 },
          ];
        },
      };
      moneyBox.strategy = testDistributeStrategy;
      moneyBox.addChange(3070);
    });

    test('잔돈을 반환할 때보유한 최소 개수의 동전으로 잔돈을 돌려준다.', () => {
      expect(moneyBox.giveChange(2870)).toEqual({
        FIVE_HUNDRED_WON: 5,
        ONE_HUNDRED_WON: 3,
        FIFTY_WON: 1,
        TEN_WON: 2,
      });
    });

    test('돌려줘야할 금액보다 갖고있는 동전이 적을 경우 반환할 수 있는 금액만 반환한다.', () => {
      expect(moneyBox.giveChange(5030)).toEqual({
        FIVE_HUNDRED_WON: 5,
        ONE_HUNDRED_WON: 4,
        FIFTY_WON: 3,
        TEN_WON: 2,
      });
    });

    test('잔돈을 반환한 후 코인의 개수는 그에 맞게 줄어든다.', () => {
      moneyBox.giveChange(2800);
      expect(moneyBox.coinStatus).toEqual({
        FIVE_HUNDRED_WON: 0,
        ONE_HUNDRED_WON: 1,
        FIFTY_WON: 3,
        TEN_WON: 2,
      });
    });
  });
});
