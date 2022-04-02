import VendingMachine from '../ts/domain/VendingMachine';
import { CASH_ERROR_MESSAGE } from '../ts/constant/errorMessage';

describe('잔돈을 충전할 때, 입력값 유효성 확인', () => {
  const vendingMachine = new VendingMachine();

  test('입력값이 숫자 타입이 아니면 에러가 발생한다.', () => {
    const cashInput = NaN;

    expect(() => vendingMachine.validateCashInput(cashInput)).toThrow(
      CASH_ERROR_MESSAGE.NOT_NUMBER_TYPE
    );
  });

  test('충전할 금액은 10원보다 작으면 에러가 발생한다.', () => {
    const cashInput = 9;

    expect(() => vendingMachine.validateCashInput(cashInput)).toThrow(
      CASH_ERROR_MESSAGE.LOWER_THAN_MIN_RANGE
    );
  });

  test('보유한 금액이 100,000원보다 커지면 에러가 발생한다.', () => {
    const cashInput = 100010;

    expect(() => vendingMachine.validateCashInput(cashInput)).toThrow(
      CASH_ERROR_MESSAGE.EXCEED_TOTAL_AMOUNT_RANGE
    );
  });

  test('충전할 금액이 10원으로 나누어떨어지지 않으면 에러가 발생한다.', () => {
    const cashInput = 11;

    expect(() => vendingMachine.validateCashInput(cashInput)).toThrow(
      CASH_ERROR_MESSAGE.NOT_DIVIDED_BY_UNIT
    );
  });
});
