import VendingMachine from '../ts/domain/VendingMachine';
import { ITEM_ERROR_MESSAGE } from '../ts/constant/errorMessage';

describe('상품 추가할 때, 입력값 유효성 확인', () => {
  const vendingMachine = new VendingMachine();

  test('상품 이름이 빈 값이면 에러가 발생한다.', () => {
    const itemName = '';
    const itemPrice = 1000;
    const itemQuantity = 20;

    expect(() => vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })).toThrow(
      ITEM_ERROR_MESSAGE.BLANK_NOT_ALLOWED
    );
  });

  test('가격과 수량은 숫자 타입이 아니면 에러가 발생한다.', () => {
    const itemName = '콜라';
    const itemPrice = NaN;
    const itemQuantity = NaN;

    expect(() => vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })).toThrow(
      ITEM_ERROR_MESSAGE.NOT_NUMBER_TYPE
    );
  });

  test('상품명이 10글자가 넘으면 에러가 발생한다.', () => {
    const itemName = '12345678901';
    const itemPrice = 1000;
    const itemQuantity = 10;

    expect(() => vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })).toThrow(
      ITEM_ERROR_MESSAGE.ITEM_NAME_MAX_LENGTH
    );
  });

  test('상품 가격이 100원보다 작으면 에러가 발생한다.', () => {
    const itemName = '콜라';
    const itemPrice = 99;
    const itemQuantity = 10;

    expect(() => vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })).toThrow(
      ITEM_ERROR_MESSAGE.EXCEED_PRICE_RANGE
    );
  });

  test('상품 가격이 10,000원보다 크면 에러가 발생한다.', () => {
    const itemName = '콜라';
    const itemPrice = 10001;
    const itemQuantity = 10;

    expect(() => vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })).toThrow(
      ITEM_ERROR_MESSAGE.EXCEED_PRICE_RANGE
    );
  });

  test('상품 가격은 100원 이상, 10,000원 이하여야 한다.', () => {
    const itemName = '콜라';
    const itemPrice = 10000;
    const itemQuantity = 10;

    expect(() =>
      vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })
    ).not.toThrow();
  });

  test('상품 가격이 10원으로 나누어떨어지지 않으면 에러가 발생한다.', () => {
    const itemName = '콜라';
    const itemPrice = 1001;
    const itemQuantity = 10;

    expect(() => vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })).toThrow(
      ITEM_ERROR_MESSAGE.NOT_DIVIDED_BY_PRICE_UNIT
    );
  });

  test('상품 수량이 20개 보다 많으면 에러가 발생한다.', () => {
    const itemName = '콜라';
    const itemPrice = 1000;
    const itemQuantity = 21;

    expect(() => vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })).toThrow(
      ITEM_ERROR_MESSAGE.EXCEED_QUANTITY_RANGE
    );
  });
});
