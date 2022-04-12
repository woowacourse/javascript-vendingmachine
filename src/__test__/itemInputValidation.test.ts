import ItemManage from '../ts/vendingMachine/ItemManage';
import { ITEM_ERROR_MESSAGE } from '../ts/constant/errorMessage';

describe('상품 추가할 때, 입력값 유효성 확인', () => {
  const vendingMachine = new ItemManage();

  test('입력값이 하나라도 공백이면 에러가 발생한다.', () => {
    const itemName = '';
    const itemPrice = 1000;
    const itemQuantity = 20;

    expect(() => vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })).toThrow(
      ITEM_ERROR_MESSAGE.BLANK_NOT_ALLOWED
    );
  });

  test('가격과 수량이 숫자 타입이 아니면 에러가 발생한다.', () => {
    const itemName = 'asdfasdf';
    const itemPrice = NaN;
    const itemQuantity = NaN;

    expect(() => vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })).toThrow(
      ITEM_ERROR_MESSAGE.NOT_NUMBER_TYPE
    );
  });

  test('상품명이 10글자 초과면 에러가 발생한다.', () => {
    const itemName = 'asdfasdfasdf';
    const itemPrice = 1000;
    const itemQuantity = 10;

    expect(() => vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })).toThrow(
      ITEM_ERROR_MESSAGE.ITEM_NAME_MAX_LENGTH
    );
  });

  test('상품 가격이 100원 미만이면 에러가 발생한다.', () => {
    const itemName = 'asdfasdf';
    const itemPrice = 99;
    const itemQuantity = 10;

    expect(() => vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })).toThrow(
      ITEM_ERROR_MESSAGE.EXCEED_PRICE_RANGE
    );
  });

  test('상품 가격이 10,000원 초과면 에러가 발생한다.', () => {
    const itemName = 'asdfasdf';
    const itemPrice = 10001;
    const itemQuantity = 10;

    expect(() => vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })).toThrow(
      ITEM_ERROR_MESSAGE.EXCEED_PRICE_RANGE
    );
  });

  test('상품 가격이 10원으로 나누어 떨어져지 않으면 에러가 발생한다.', () => {
    const itemName = 'asdfasdf';
    const itemPrice = 1001;
    const itemQuantity = 10;

    expect(() => vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })).toThrow(
      ITEM_ERROR_MESSAGE.NOT_DIVIDED_BY_UNIT
    );
  });

  test('한 제품당 수량이 20개 초과면 에러가 발생한다.', () => {
    const itemName = 'asdfasdf';
    const itemPrice = 1000;
    const itemQuantity = 21;

    expect(() => vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })).toThrow(
      ITEM_ERROR_MESSAGE.EXCEED_QUANTITY_RANGE
    );
  });

  test('올바른 값을 입력하면 에러가 발생하지 않는다.', () => {
    const itemName = 'asdfasdf';
    const itemPrice = 1000;
    const itemQuantity = 20;

    expect(() =>
      vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })
    ).not.toThrow();
  });
});
