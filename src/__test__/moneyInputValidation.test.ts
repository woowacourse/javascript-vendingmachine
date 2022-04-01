import { MONEY_ERROR_MESSAGE } from '../ts/constant/errorMessage';
import ItemPurchase from '../ts/vendingMachine/ItemPurchase';

describe('상품을 구입할 때, 입력값 유효성 확인', () => {
  const vendingMachine = new ItemPurchase();
  test('입력값은 숫자 타입이어야 한다.', () => {
    const moneyInput = NaN;

    expect(() => vendingMachine.validateMoneyInput(moneyInput)).toThrow(
      MONEY_ERROR_MESSAGE.NOT_NUMBER_TYPE
    );
  });

  test('투입한 금액은 10원 이상이어야 한다.', () => {
    const moneyInput = 9;

    expect(() => vendingMachine.validateMoneyInput(moneyInput)).toThrow(
      MONEY_ERROR_MESSAGE.EXCEED_TOTAL_AMOUNT_RANGE
    );
  });

  test('한 번에 투입할 수 있는 최대 금액은 10,000원이다.', () => {
    const moneyInput = 10001;

    expect(() => vendingMachine.validateMoneyInput(moneyInput)).toThrow(
      MONEY_ERROR_MESSAGE.EXCEED_TOTAL_AMOUNT_RANGE
    );
  });

  test('10원으로 나누어 떨어져야 한다.', () => {
    const moneyInput = 11;

    expect(() => vendingMachine.validateMoneyInput(moneyInput)).toThrow(
      MONEY_ERROR_MESSAGE.NOT_DIVIDED_BY_UNIT
    );
  });

  test('올바른 값을 입력하면 에러가 뜨지 않는다.', () => {
    const moneyInput = 10000;

    expect(() => vendingMachine.validateMoneyInput(moneyInput)).not.toThrow();
  });
});
