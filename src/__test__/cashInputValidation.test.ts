import CoinRecharge from '../ts/vendingMachine/CoinRecharge';
import { CASH_ERROR_MESSAGE } from '../ts/constant/errorMessage';

describe('잔돈을 충전할 때, 입력값 유효성 확인', () => {
  const vendingMachine = new CoinRecharge();

  test('입력값은 숫자 타입이어야 한다.', () => {
    const cashInput = NaN;

    expect(() => vendingMachine.validateCashInput(cashInput)).toThrow(
      CASH_ERROR_MESSAGE.NOT_NUMBER_TYPE
    );
  });

  test('충전할 금액은 10원 이상이여야 한다.', () => {
    const cashInput = 9;

    expect(() => vendingMachine.validateCashInput(cashInput)).toThrow(
      CASH_ERROR_MESSAGE.LOWER_THAN_MIN_RANGE
    );
  });

  test('보유할 수 있는 최대 금액은 100,000원이다.', () => {
    const cashInput = 100010;

    expect(() => vendingMachine.validateCashInput(cashInput)).toThrow(
      CASH_ERROR_MESSAGE.EXCEED_TOTAL_AMOUNT_RANGE
    );
  });

  test('10원으로 나누어 떨어져야 한다.', () => {
    const cashInput = 11;

    expect(() => vendingMachine.validateCashInput(cashInput)).toThrow(
      CASH_ERROR_MESSAGE.NOT_DIVIDED_BY_UNIT
    );
  });
});
