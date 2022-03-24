import Product from './Product';
import { ERROR_MESSAGE } from '../constants';

describe('상품 테스트', () => {
  it('상품명이 공백으로만 이루어져있거나 빈 값이면 에러를 발생시킨다.', () => {
    const blankName = { name: '  ', price: 1000, quantity: 10 };
    const emptyName = { name: '', price: 1000, quantity: 10 };

    expect(() => {
      new Product(blankName);
    }).toThrowError(ERROR_MESSAGE.NAME_EMPTY);

    expect(() => {
      new Product(emptyName);
    }).toThrowError(ERROR_MESSAGE.NAME_EMPTY);
  });

  it('상품명이 10글자 초과하면 에러를 발생시킨다.', () => {
    const overMaxNameLength = { name: '코카콜라열글자넘는이름', price: 1000, quantity: 10 };

    expect(() => {
      new Product(overMaxNameLength);
    }).toThrowError(ERROR_MESSAGE.NAME_LENGTH);
  });

  it('상품 가격이 100원 미만이면 에러를 발생시킨다.', () => {
    const underMinPrice = { name: '코카콜라', price: 99, quantity: 10 };

    expect(() => {
      new Product(underMinPrice);
    }).toThrowError(ERROR_MESSAGE.PRICE_RANGE);
  });

  it('상품 가격이 10,000원을 초과하면 에러를 발생시킨다.', () => {
    const overMaxPrice = { name: '코카콜라', price: 10001, quantity: 10 };

    expect(() => {
      new Product(overMaxPrice);
    }).toThrowError(ERROR_MESSAGE.PRICE_RANGE);
  });

  it('상품 가격이 10의 배수가 아니면 에러를 발생시킨다.', () => {
    const invalidUnitPrice = { name: '코카콜라', price: 1513, quantity: 10 };

    expect(() => {
      new Product(invalidUnitPrice);
    }).toThrowError(ERROR_MESSAGE.PRICE_UNIT);
  });

  it('상품 수량이 20개를 초과하면 에러를 발생시킨다.', () => {
    const overMaxQuantity = { name: '코카콜라', price: 1000, quantity: 21 };

    expect(() => {
      new Product(overMaxQuantity);
    }).toThrowError(ERROR_MESSAGE.EXCEED_QUANTITY);
  });
});
