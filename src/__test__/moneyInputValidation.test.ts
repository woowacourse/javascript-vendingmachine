const validateMoneyInput = (moneyInput) => {
  if (isNaN(moneyInput)) {
    throw new Error('숫자를 입력해주세요.');
  }

  if (moneyInput < 10 || moneyInput > 10000) {
    throw new Error('투입할 수 있는 최소 금액은 10원, 최대 금액은 10,000원입니다.');
  }

  if (moneyInput % 10 !== 0) {
    throw new Error('투입한 금액은 10원으로 나누어 떨어져야 합니다.');
  }
};

describe('상품을 구입할 때, 입력값 유효성 확인', () => {
  test('입력값은 숫자 타입이어야 한다.', () => {
    const moneyInput = NaN;

    expect(() => validateMoneyInput(moneyInput)).toThrow('숫자를 입력해주세요.');
  });

  test('투입한 금액은 10원 이상이어야 한다.', () => {
    const moneyInput = 9;

    expect(() => validateMoneyInput(moneyInput)).toThrow(
      '투입할 수 있는 최소 금액은 10원, 최대 금액은 10,000원입니다.'
    );
  });

  test('한 번에 투입할 수 있는 최대 금액은 10,000원이다.', () => {
    const moneyInput = 10001;

    expect(() => validateMoneyInput(moneyInput)).toThrow(
      '투입할 수 있는 최소 금액은 10원, 최대 금액은 10,000원입니다.'
    );
  });

  test('10원으로 나누어 떨어져야 한다.', () => {
    const moneyInput = 11;

    expect(() => validateMoneyInput(moneyInput)).toThrow(
      '투입한 금액은 10원으로 나누어 떨어져야 합니다.'
    );
  });
});
