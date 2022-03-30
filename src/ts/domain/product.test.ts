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

  it('상품명이 10글자 초과하면 에러를 발생시킨다(11글자).', () => {
    const product = { name: '코카콜라열글자넘는이름', price: 1000, quantity: 10 };

    expect(() => {
      new Product(product);
    }).toThrowError(ERROR_MESSAGE.NAME_LENGTH);
  });

  it('상품명이 10글자 이하이면 에러를 발생시키지 않는다(10글자).', () => {
    const product = { name: '코카콜라열글자인이름', price: 1000, quantity: 10 };

    expect(() => {
      new Product(product);
    }).not.toThrowError(ERROR_MESSAGE.NAME_LENGTH);
  });

  it('상품명이 10글자 이하이면 에러를 발생시키지 않는다(9글자).', () => {
    const product = { name: '코카콜라아홉글자임', price: 1000, quantity: 10 };

    expect(() => {
      new Product(product);
    }).not.toThrowError(ERROR_MESSAGE.NAME_LENGTH);
  });

  it('상품 가격이 100원 미만이면 에러를 발생시킨다(99원).', () => {
    const product = { name: '코카콜라', price: 99, quantity: 10 };

    expect(() => {
      new Product(product);
    }).toThrowError(ERROR_MESSAGE.PRICE_RANGE);
  });

  it('상품 가격이 100원 이상이면 에러를 발생시키지 않는다(100원).', () => {
    const product = { name: '코카콜라', price: 100, quantity: 10 };

    expect(() => {
      new Product(product);
    }).not.toThrowError(ERROR_MESSAGE.PRICE_RANGE);
  });

  it('상품 가격이 100원 이상이면 에러를 발생시키지 않는다(101원).', () => {
    const product = { name: '코카콜라', price: 101, quantity: 10 };

    expect(() => {
      new Product(product);
    }).not.toThrowError(ERROR_MESSAGE.PRICE_RANGE);
  });

  it('상품 가격이 10,000원을 초과하면 에러를 발생시킨다(10,001원).', () => {
    const product = { name: '코카콜라', price: 10001, quantity: 10 };

    expect(() => {
      new Product(product);
    }).toThrowError(ERROR_MESSAGE.PRICE_RANGE);
  });

  it('상품 가격이 10,000원 이하이면 에러를 발생시키지 않는다(10,000원).', () => {
    const product = { name: '코카콜라', price: 10000, quantity: 10 };

    expect(() => {
      new Product(product);
    }).not.toThrowError(ERROR_MESSAGE.PRICE_RANGE);
  });

  it('상품 가격이 10,000원 이하이면 에러를 발생시키지 않는다(9,999원).', () => {
    const product = { name: '코카콜라', price: 9999, quantity: 10 };

    expect(() => {
      new Product(product);
    }).not.toThrowError(ERROR_MESSAGE.PRICE_RANGE);
  });

  it('상품 가격이 10의 배수가 아니면 에러를 발생시킨다.', () => {
    const product = { name: '코카콜라', price: 1513, quantity: 10 };

    expect(() => {
      new Product(product);
    }).toThrowError(ERROR_MESSAGE.PRICE_UNIT);
  });

  it('상품 가격이 10의 배수이면 에러를 발생시키지 않는다.', () => {
    const product = { name: '코카콜라', price: 1510, quantity: 10 };

    expect(() => {
      new Product(product);
    }).not.toThrowError(ERROR_MESSAGE.PRICE_UNIT);
  });

  it('상품 수량이 20개를 초과하면 에러를 발생시킨다(21개).', () => {
    const product = { name: '코카콜라', price: 1000, quantity: 21 };

    expect(() => {
      new Product(product);
    }).toThrowError(ERROR_MESSAGE.EXCEED_QUANTITY);
  });

  it('상품 수량이 20개 이하이면 에러를 발생시키지 않는다(20개).', () => {
    const product = { name: '코카콜라', price: 1000, quantity: 20 };

    expect(() => {
      new Product(product);
    }).not.toThrowError(ERROR_MESSAGE.EXCEED_QUANTITY);
  });

  it('상품 수량이 20개 이하이면 에러를 발생시키지 않는다(19개).', () => {
    const product = { name: '코카콜라', price: 1000, quantity: 19 };

    expect(() => {
      new Product(product);
    }).not.toThrowError(ERROR_MESSAGE.EXCEED_QUANTITY);
  });

  it('상품 수량에 소수점이 입력되면 에러를 발생시킨다', () => {
    const decimalNumber = { name: '코카콜라', price: 1000, quantity: 10.3 };

    expect(() => {
      new Product(decimalNumber);
    }).toThrowError(ERROR_MESSAGE.NOT_INTEGER);
  });
});
