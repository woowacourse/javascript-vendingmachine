import VendingMachine from '../ts/VendingMachine';

describe('잔돈을 충전할 때, 입력값 유효성 확인', () => {
  const vendingMachine = new VendingMachine();

  test('입력값은 숫자 타입이어야 한다.', () => {
    const cashInput = 'ㄱㄴ';

    expect(() => vendingMachine.validateCashInput(cashInput)).toThrow('숫자를 입력해주세요.');
  });

  test('충전할 금액은 10원 이상이여야 한다.', () => {
    const cashInput = 9;

    expect(() => vendingMachine.validateCashInput(cashInput)).toThrow(
      '충전할 금액은 10원 이상이여야 합니다.'
    );
  });

  test('보유할 수 있는 최대 금액은 100,000원이다.', () => {
    const cashInput = 100010;

    expect(() => vendingMachine.validateCashInput(cashInput)).toThrow(
      '보유할 수 있는 최소 금액은 0원, 최대 금액은 100,000원입니다.'
    );
  });

  test('10원으로 나누어 떨어져야 한다.', () => {
    const cashInput = 11;

    expect(() => vendingMachine.validateCashInput(cashInput)).toThrow(
      '잔돈은 10원으로 나누어 떨어져야 합니다.'
    );
  });
});
