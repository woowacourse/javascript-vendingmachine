import {
  MAX_NAME_LENGTH,
  MAX_QUANTITY,
  MESSAGE,
  PRICE_RULE,
} from '../constants';
import ProductImpl from '../domain/Product';
import { validateProductInfo } from '../component/ProductManagementComponent/validator';

describe('validate 테스트', () => {
  const defaultProduct = {
    name: '콜라',
    price: PRICE_RULE.MIN,
    quantity: MAX_QUANTITY,
  };
  const products = [new ProductImpl(defaultProduct)];

  it('상품 추가/수정 시, 빈 값이 있으면 에러를 발생시킨다.', () => {
    const newProduct1 = {
      ...defaultProduct,
      name: '',
    };
    expect(() => validateProductInfo(products, newProduct1)).toThrowError(
      MESSAGE.ERROR_EMPTY_VALUE,
    );

    const newProduct2 = {
      ...defaultProduct,
      name: `${defaultProduct.name}사이다`,
      price: NaN,
    };
    expect(() => validateProductInfo(products, newProduct2)).toThrowError(
      MESSAGE.ERROR_EMPTY_VALUE,
    );

    const newProduct3 = {
      ...defaultProduct,
      name: `${defaultProduct.name}환타`,
      quantity: NaN,
    };
    expect(() => validateProductInfo(products, newProduct3)).toThrowError(
      MESSAGE.ERROR_EMPTY_VALUE,
    );
  });

  it('상품 추가 시, 동일한 이름의 상품이 존재하면 에러를 발생시킨다.', () => {
    const newProduct = {
      ...defaultProduct,
      price: PRICE_RULE.MIN + PRICE_RULE.UNIT,
      quantity: MAX_QUANTITY - 1,
    };
    expect(() => validateProductInfo(products, newProduct)).toThrowError(
      MESSAGE.ERROR_SAME_PRODUCT,
    );
  });

  it('상품 수정 시, 동일한 이름의 상품이 존재하면 에러를 발생시킨다.', () => {
    const prevProductName = `${defaultProduct.name}사이다`;
    const newProduct = {
      ...defaultProduct,
      price: PRICE_RULE.MIN + PRICE_RULE.UNIT,
      quantity: MAX_QUANTITY - 1,
    };
    expect(() =>
      validateProductInfo(products, newProduct, prevProductName),
    ).toThrowError(MESSAGE.ERROR_SAME_PRODUCT);
  });

  it(`상품 추가/수정 시, 상품명의 길이는 ${MAX_NAME_LENGTH}을 초과하면 에러를 발생시킨다.`, () => {
    const newProduct = {
      ...defaultProduct,
      name: '콜'.repeat(MAX_NAME_LENGTH + 1),
    };
    expect(() => validateProductInfo(products, newProduct)).toThrowError(
      MESSAGE.ERROR_OVER_MAX_LENGTH,
    );
  });

  it(`상품 추가/수정 시, 가격은 ${PRICE_RULE.MIN}원 미만이면 에러를 발생시킨다.`, () => {
    const newProduct = {
      ...defaultProduct,
      name: `${defaultProduct.name}사이다`,
      price: PRICE_RULE.MIN - PRICE_RULE.UNIT,
    };
    expect(() => validateProductInfo(products, newProduct)).toThrowError(
      MESSAGE.ERROR_INVALID_PRICE,
    );
  });

  it(`상품 추가/수정 시, 가격은 ${PRICE_RULE.MAX}원 초과하면 에러를 발생시킨다.`, () => {
    const newProduct = {
      ...defaultProduct,
      name: `${defaultProduct.name}사이다`,
      price: PRICE_RULE.MAX + PRICE_RULE.UNIT,
    };
    expect(() => validateProductInfo(products, newProduct)).toThrowError(
      MESSAGE.ERROR_INVALID_PRICE,
    );
  });

  it(`상품 추가/수정 시, 가격은 ${PRICE_RULE.UNIT}으로 나누어 떨어지지 않으면 에러를 발생시킨다.`, () => {
    const newProduct = {
      ...defaultProduct,
      name: `${defaultProduct.name}사이다`,
      price: PRICE_RULE.MIN + PRICE_RULE.UNIT / 2,
    };
    expect(() => validateProductInfo(products, newProduct)).toThrowError(
      MESSAGE.ERROR_INVALID_PRICE,
    );
  });

  it(`상품 추가/수정 시, 수량이 ${MAX_QUANTITY}개를 초과하면 에러를 발생시킨다.`, () => {
    const newProduct = {
      ...defaultProduct,
      name: `${defaultProduct.name}사이다`,
      quantity: MAX_QUANTITY + 1,
    };
    expect(() => validateProductInfo(products, newProduct)).toThrowError(
      MESSAGE.ERROR_OVER_MAX_QUANTITY,
    );
  });

  it(`상품 추가/수정 시, 상품명이 ${MAX_NAME_LENGTH}자이고, 가격이 ${PRICE_RULE.MAX}이며, 수량이 ${MAX_QUANTITY}개이면 정상 동작한다.`, () => {
    const newProduct = {
      name: '콜'.repeat(MAX_NAME_LENGTH),
      price: PRICE_RULE.MAX,
      quantity: MAX_QUANTITY,
    };
    expect(validateProductInfo(products, newProduct)).toBeTruthy();
  });

  it(`상품 추가/수정 시, 상품명이 1자이고, 가격이 ${PRICE_RULE.MIN}이며, 수량이 1개이면 정상 동작한다.`, () => {
    const newProduct = {
      name: '콜',
      price: PRICE_RULE.MIN,
      quantity: 1,
    };
    expect(validateProductInfo(products, newProduct)).toBeTruthy();
  });
});
