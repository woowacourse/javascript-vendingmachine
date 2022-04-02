import { isStringLengthInRange, isNumberInRange, isCorrectNumberUnit } from '../src/es/utils';
import { validateProduct, validateHoldingAmountToAdd } from '../src/es/validator';
import { ERROR_MESSAGE } from '../src/es/constants';

describe('검증 유틸리티 테스트', () => {
  test('1-1. 주어지는 문자열 길이가 주어지는 범위 안에 있으면 true를 반환한다.', () => {
    const inputValue = '최대 열글자까지입력';
    const minNumber = 1;
    const maxNumber = 10;

    expect(isStringLengthInRange(inputValue, minNumber, maxNumber)).toBeTruthy();
  });

  test('1-2. 주어지는 문자열 길이가 주어지는 범위 밖에 있으면 false를 반환한다.', () => {
    let inputValue = '최대 열글자까지 입력 초과 케이스';
    const minNumber = 1;
    const maxNumber = 10;

    expect(isStringLengthInRange(inputValue, minNumber, maxNumber)).toBeFalsy();

    inputValue = '';
    expect(isStringLengthInRange(inputValue, minNumber, maxNumber)).toBeFalsy();
  });

  test('2-1. 주어지는 숫자가 주어지는 범위 안에 있으면 true를 반환한다.', () => {
    const inputValue = 5;
    const minNumber = 1;
    const maxNumber = 10;

    expect(isNumberInRange(inputValue, minNumber, maxNumber)).toBeTruthy();
  });

  test('2-2. 주어지는 숫자가 주어지는 범위 밖에 있으면 false를 반환한다.', () => {
    let inputValue = 22;
    const minNumber = 1;
    const maxNumber = 20;

    expect(isNumberInRange(inputValue, minNumber, maxNumber)).toBeFalsy();

    inputValue = -1;
    expect(isNumberInRange(inputValue, minNumber, maxNumber)).toBeFalsy();
  });

  test('3-1. 주어지는 숫자가 주어지는 단위로 나누어 떨어지면 true를 반환한다.', () => {
    const inputValue = 100;
    const unit = 10;

    expect(isCorrectNumberUnit(inputValue, unit)).toBeTruthy();
  });

  test('3-2. 주어지는 숫자가 주어지는 단위로 나누어 떨어지지 않으면 false를 반환한다.', () => {
    const inputValue = 100;
    const unit = 3;

    expect(isCorrectNumberUnit(inputValue, unit)).toBeFalsy();
  });
});

describe('상품 정보 입력값에 대한 유효성 검사 테스트', () => {
  test('1-1. 상품 정보가 올바르게 들어오는 경우 true를 반환한다.', () => {
    const inputValue = { name: '감자', price: 1000, quantity: 5 };
    expect(validateProduct(inputValue)).toBeTruthy();
  });

  test('1-2. 상품명이 비어있을 시 오류를 반환한다.', () => {
    const inputValue = { name: '', price: 1000, quantity: 5 };
    expect(() => validateProduct(inputValue)).toThrow(ERROR_MESSAGE.PRODUCT_NAME_REQUIRED);
  });

  test('1-3. 상품명의 길이가 초과되었을 시 오류를 반환한다.', () => {
    const inputValue = { name: '상품명 초과 입력 테스트입니다.', price: 1000, quantity: 5 };
    expect(() => validateProduct(inputValue)).toThrow(ERROR_MESSAGE.PRODUCT_NAME_LENGTH);
  });

  test('1-4. 상품 가격이 숫자가 아닐 시 오류를 반환한다.', () => {
    const inputValue = { name: '상품명', price: '가격이 숫자가 아닙니다', quantity: 5 };
    expect(() => validateProduct(inputValue)).toThrow(ERROR_MESSAGE.PRODUCT_PRICE_ONLY_NUMBER);
  });

  test('1-5. 상품 가격이 정해진 금액을 초과할 시 오류를 반환한다.', () => {
    const inputValue = { name: '상품명', price: 100000, quantity: 5 };
    expect(() => validateProduct(inputValue)).toThrow(ERROR_MESSAGE.PRODUCT_PRICE_WRONG_RANGE);
  });

  test('1-6. 상품 가격이 정해진 단위로 나누어 떨어지지 않을 시 오류를 반환한다.', () => {
    const inputValue = { name: '상품명', price: 1511, quantity: 5 };
    expect(() => validateProduct(inputValue)).toThrow(ERROR_MESSAGE.PRODUCT_PRICE_WRONG_UNIT);
  });

  test('1-7. 상품 수량이 숫자가 아닌 경우 오류를 반환한다.', () => {
    const inputValue = { name: '상품명', price: 1000, quantity: 50 };
    expect(() => validateProduct(inputValue)).toThrow(ERROR_MESSAGE.PRODUCT_QUANTITY_WRONG_RANGE);
  });

  test('1-8. 상품 수량이 정해진 범위 밖인 경우 오류를 반환한다.', () => {
    const inputValue = { name: '상품명', price: 1000, quantity: 50 };
    expect(() => validateProduct(inputValue)).toThrow(ERROR_MESSAGE.PRODUCT_QUANTITY_WRONG_RANGE);
  });
});

describe('자판기 동전 충전 시 입력값에 대한 유효성 검사 테스트', () => {
  test('1-1. 동전 충전 금액이 올바르게 들어오는 경우 true를 반환한다.', () => {
    const inputValue = 5000;
    const totalAmount = 0;
    expect(validateHoldingAmountToAdd(inputValue, totalAmount)).toBeTruthy();
  });

  test('1-2. 동전 충전 금액이 숫자가 아닐 시 오류를 반환한다.', () => {
    const inputValue = '감자';
    const totalAmount = 0;
    expect(() => validateHoldingAmountToAdd(inputValue, totalAmount)).toThrow(
      ERROR_MESSAGE.HOLDING_AMOUNT_ONLY_NUMBER,
    );
  });

  test('1-3. 동전 충전 금액이 정해진 단위가 아닐 시 오류를 반환한다.', () => {
    const inputValue = 5555;
    const totalAmount = 0;
    expect(() => validateHoldingAmountToAdd(inputValue, totalAmount)).toThrow(
      ERROR_MESSAGE.HOLDING_AMOUNT_WRONG_UNIT,
    );
  });

  test('1-4. 동전 충전 금액이 정해진 범위를 초과하는 경우 오류를 반환한다.', () => {
    const inputValue = 40000;
    const totalAmount = 100000;
    expect(() => validateHoldingAmountToAdd(inputValue, totalAmount)).toThrow(
      ERROR_MESSAGE.HOLDING_AMOUNT_WRONG_LIMIT,
    );
  });
});
