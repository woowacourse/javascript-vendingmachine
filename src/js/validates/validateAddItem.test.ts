import { ERROR_MESSAGE } from '../constants/errorConstants';
import { ITEM } from '../constants/vendingMachineConstants';
import Item from '../vendingMachine/item';
import ItemManager from '../vendingMachine/itemManager';
import { checkDuplicatedItem, validateAddItemInput } from './validates';

describe('입력된 상품 이름, 가격, 수량이 주어질 떼', () => {
  test('이름이 공백이라면 에러를 throw 한다.', () => {
    const name = '';
    const price = ITEM.PRICE.MAX;
    const quantity = ITEM.QUANTITY.MAX;

    expect(() => {
      validateAddItemInput({ name, price, quantity });
    }).toThrowError(ERROR_MESSAGE.ITEM_NAME.EMPTY_NAME);
  });

  test('이름이 10자를 넘는다면 에러를 throw 한다.', () => {
    const name = '코카콜라환타펩시오란씨';
    const price = ITEM.PRICE.MAX;
    const quantity = ITEM.QUANTITY.MAX;

    expect(() => {
      validateAddItemInput({ name, price, quantity });
    }).toThrowError(ERROR_MESSAGE.ITEM_NAME.OVER_MAX_LENGTH);
  });

  test('가격이 정수가 아니라면 에러를 throw 한다.', () => {
    const name = '콜라';
    const price = 0.1;
    const quantity = ITEM.QUANTITY.MAX;

    expect(() => {
      validateAddItemInput({ name, price, quantity });
    }).toThrowError(ERROR_MESSAGE.ITEM_PRICE.NOT_INTEGER);
  });

  test('가격이 100보다 작다면 에러를 throw 한다.', () => {
    const name = '콜라';
    const price = ITEM.PRICE.MIN - 1;
    const quantity = ITEM.QUANTITY.MAX;

    expect(() => {
      validateAddItemInput({ name, price, quantity });
    }).toThrowError(ERROR_MESSAGE.ITEM_PRICE.UNDER_MIN);
  });

  test('가격이 10,000보다 크다면 에러를 throw 한다.', () => {
    const name = '콜라';
    const price = ITEM.PRICE.MAX + 1;
    const quantity = ITEM.QUANTITY.MAX;

    expect(() => {
      validateAddItemInput({ name, price, quantity });
    }).toThrowError(ERROR_MESSAGE.ITEM_PRICE.OVER_MAX);
  });

  test('가격이 10단위가 아니라면 에러를 throw 한다.', () => {
    const name = '콜라';
    const price = ITEM.PRICE.MIN + ITEM.PRICE.UNIT + 1;
    const quantity = ITEM.QUANTITY.MAX;

    expect(() => {
      validateAddItemInput({ name, price, quantity });
    }).toThrowError(ERROR_MESSAGE.ITEM_PRICE.INVALID_UNIT);
  });

  test('수랑이 정수가 아니라면 에러를 throw 한다.', () => {
    const name = '콜라';
    const price = ITEM.PRICE.MAX;
    const quantity = 0.1;

    expect(() => {
      validateAddItemInput({ name, price, quantity });
    }).toThrowError(ERROR_MESSAGE.ITEM_QUANTITY.NOT_INTEGER);
  });

  test('수랑이 0이하면 에러를 throw 한다.', () => {
    const name = '콜라';
    const price = ITEM.PRICE.MAX;
    const quantity = ITEM.QUANTITY.MIN - 1;

    expect(() => {
      validateAddItemInput({ name, price, quantity });
    }).toThrowError(ERROR_MESSAGE.ITEM_QUANTITY.UNDER_MIN);
  });

  test('수랑이 20보다 크다면 에러를 throw 한다.', () => {
    const name = '콜라';
    const price = ITEM.PRICE.MAX;
    const quantity = ITEM.QUANTITY.MAX + 1;

    expect(() => {
      validateAddItemInput({ name, price, quantity });
    }).toThrowError(ERROR_MESSAGE.ITEM_QUANTITY.OVER_MAX);
  });
});

describe('아이템이 주어질 때', () => {
  test('저장된 item 리스트에 같은 이름의 상품이 있다면 에러를 throw한다.', () => {
    const itemManager = new ItemManager();

    itemManager.addItem({ name: '펩시', price: 900, quantity: 3, id: 0 });

    const newItem = new Item({ name: '펩시', price: 1000, quantity: 2, id: 1 });

    expect(() => {
      checkDuplicatedItem(itemManager.items, newItem, null);
    }).toThrow(ERROR_MESSAGE.ITEM_NAME.DUPLICATE_ITEM);
  });
});
