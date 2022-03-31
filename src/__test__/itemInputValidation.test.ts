import VendingMachine from '../ts/domain/VendingMachine';
import { ITEM_ERROR_MESSAGE } from '../ts/constant/errorMessage';

describe('상품 추가할 때, 입력값 유효성 확인', () => {
  const vendingMachine = new VendingMachine();

  test('입력값은 공백이 아니어야 한다.', () => {
    const itemName = '';
    const itemPrice = 1000;
    const itemQuantity = 20;

    expect(() => vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })).toThrow(
      ITEM_ERROR_MESSAGE.BLANK_NOT_ALLOWED
    );
  });

  test('가격과 수량은 숫자 타입이어야 한다.', () => {
    const itemName = 'asdfasdf';
    const itemPrice = NaN;
    const itemQuantity = NaN;

    expect(() => vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })).toThrow(
      ITEM_ERROR_MESSAGE.NOT_NUMBER_TYPE
    );
  });

  test('상품명은 최대 10글자까지 가능하다.', () => {
    const itemName = 'asdfasdfasdf';
    const itemPrice = 1000;
    const itemQuantity = 10;

    expect(() => vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })).toThrow(
      ITEM_ERROR_MESSAGE.ITEM_NAME_MAX_LENGTH
    );
  });

  test('상품 가격은 100원 이상이어야 한다.', () => {
    const itemName = 'asdfasdf';
    const itemPrice = 99;
    const itemQuantity = 10;

    expect(() => vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })).toThrow(
      ITEM_ERROR_MESSAGE.EXCEED_PRICE_RANGE
    );
  });

  test('상품 가격은 10,000원 이하이어야 한다.', () => {
    const itemName = 'asdfasdf';
    const itemPrice = 10001;
    const itemQuantity = 10;

    expect(() => vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })).toThrow(
      ITEM_ERROR_MESSAGE.EXCEED_PRICE_RANGE
    );
  });

  test('상품 가격은 100원 이상, 10,000원 이하여야 한다.', () => {
    const itemName = 'asdfasdf';
    const itemPrice = 10000;
    const itemQuantity = 10;

    expect(() =>
      vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })
    ).not.toThrow();
  });

  test('10원으로 나누어 떨어져야 한다.', () => {
    const itemName = 'asdfasdf';
    const itemPrice = 1001;
    const itemQuantity = 10;

    expect(() => vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })).toThrow(
      ITEM_ERROR_MESSAGE.NOT_DIVIDED_BY_PRICE_UNIT
    );
  });

  test('한 제품당 수량은 최대 20개까지 넣을 수 있다.', () => {
    const itemName = 'asdfasdf';
    const itemPrice = 1000;
    const itemQuantity = 21;

    expect(() => vendingMachine.validateItemInput({ itemName, itemPrice, itemQuantity })).toThrow(
      ITEM_ERROR_MESSAGE.EXCEED_QUANTITY_RANGE
    );
  });
});
