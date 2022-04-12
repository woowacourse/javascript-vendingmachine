import CoinRecharge from '../ts/vendingMachine/CoinRecharge';
import { CASH_ERROR_MESSAGE } from '../ts/constant/errorMessage';

describe('잔돈을 충전할 때, 입력값 유효성 확인', () => {
  const vendingMachine = new CoinRecharge();

  test('충전할 금액이 숫자 타입이 아니면 에러가 발생한다.', () => {
    const cashInput = NaN;

    expect(() => vendingMachine.validateCashInput(cashInput)).toThrow(
      CASH_ERROR_MESSAGE.NOT_NUMBER_TYPE
    );
  });

  test('충전할 금액이 10원 이상이 아니면 에러가 발생한다.', () => {
    const cashInput = 9;

    expect(() => vendingMachine.validateCashInput(cashInput)).toThrow(
      CASH_ERROR_MESSAGE.LOWER_THAN_MIN_RANGE
    );
  });

  test('충전할 금액이 보유할 수 있는 최대 금액(100,000원) 이상이면 에러가 발생한다.', () => {
    const cashInput = 100010;

    expect(() => vendingMachine.validateCashInput(cashInput)).toThrow(
      CASH_ERROR_MESSAGE.EXCEED_TOTAL_AMOUNT_RANGE
    );
  });

  test('충전할 금액이 10원으로 나누어 떨어지지 않으면 에러가 발생한다.', () => {
    const cashInput = 11;

    expect(() => vendingMachine.validateCashInput(cashInput)).toThrow(
      CASH_ERROR_MESSAGE.NOT_DIVIDED_BY_UNIT
    );
  });

  test('올바른 값을 입력하면 에러가 발생하지 않는다.', () => {
    const cashInput = 1000;

    expect(() => vendingMachine.validateCashInput(cashInput)).not.toThrow();
  });
});
