import ProductStore from '../../domains/stores/ProductStore';
import { createAction, PRODUCT_ACTION } from '../../domains/actions';
import { checkProductAddValidation } from '../../validators';
import { ERROR_MESSAGE, PRODUCT } from '../../constants';

import { findProduct } from './product.test';

describe('상품 추가에 대한 유효성을 검사한다.', () => {
  beforeEach(() => {
    ProductStore._instance = null;
  });

  test('입력한 상품명이 공백인 것을 허용하지 않는다.', () => {
    const newProduct = { name: '', price: 5080, quantity: 10 };

    expectProductAddFailure(newProduct, ERROR_MESSAGE.IS_BLANK_PRODUCT_NAME);
  });

  test('입력한 상품명이 10글자를 초과하는 것을 허용하지 않는다.', () => {
    const newProduct = { name: '호랑호랑호랑호랑호랑호', price: 5080, quantity: 10 };

    expectProductAddFailure(newProduct, ERROR_MESSAGE.IS_OVER_MAX_PRODUCT_NAME_LENGTH);
  });

  test('이미 존재하는 상품명을 입력하는 것을 허용하지 않는다.', () => {
    // given
    const firstNewProduct = { name: '호랑', price: 5080, quantity: 10 };
    const secondNewProduct = { name: '호랑', price: 1000, quantity: 1 };

    // when
    try {
      addProduct(firstNewProduct);
      addProduct(secondNewProduct);
    } catch (error) {
      // then
      expect(error.message).toBe(ERROR_MESSAGE.IS_ALREADY_EXIST_PRODUCT_WHEN_ADD);
    }

    expect(findProduct(firstNewProduct)).toBe(firstNewProduct);
    expect(findProduct(secondNewProduct)).toBeUndefined();
  });

  test('입력한 가격이 정수가 아닌 것을 허용하지 않는다.', () => {
    let newProduct = { name: '호랑', price: '', quantity: 10 };
    expectProductAddFailure(newProduct, ERROR_MESSAGE.IS_NOT_INTEGER_PRICE);

    newProduct = { name: '호랑', price: '5080', quantity: 10 };
    expectProductAddFailure(newProduct, ERROR_MESSAGE.IS_NOT_INTEGER_PRICE);

    newProduct = { name: '호랑', price: 5080.5, quantity: 10 };
    expectProductAddFailure(newProduct, ERROR_MESSAGE.IS_NOT_INTEGER_PRICE);
  });

  test(`입력한 가격이 ${PRODUCT.PRICE.MIN}원 미만인 것을 허용하지 않는다.`, () => {
    const newProduct = { name: '호랑', price: PRODUCT.PRICE.MIN - 1, quantity: 10 };

    expectProductAddFailure(newProduct, ERROR_MESSAGE.IS_UNDER_MIN_PRICE);
  });

  test(`입력한 가격이 ${PRODUCT.PRICE.MAX}원을 초과하는 것을 허용하지 않는다.`, () => {
    const newProduct = { name: '호랑', price: PRODUCT.PRICE.MAX + 1, quantity: 10 };

    expectProductAddFailure(newProduct, ERROR_MESSAGE.IS_OVER_MAX_PRICE);
  });

  test(`입력한 가격이 10원 단위로 나누어 떨어지지 않는 것을 허용하지 않는다.`, () => {
    let newProduct = { name: '호랑', price: 5081, quantity: 10 };
    expectProductAddFailure(newProduct, ERROR_MESSAGE.PRICE_CANNOT_DIVIDED_BY_TEN);

    newProduct = { name: '호랑', price: 5082, quantity: 10 };
    expectProductAddFailure(newProduct, ERROR_MESSAGE.PRICE_CANNOT_DIVIDED_BY_TEN);

    newProduct = { name: '호랑', price: 5085, quantity: 10 };
    expectProductAddFailure(newProduct, ERROR_MESSAGE.PRICE_CANNOT_DIVIDED_BY_TEN);
  });

  test('입력한 수량이 정수가 아닌 것을 허용하지 않는다.', () => {
    let newProduct = { name: '호랑', price: 5080, quantity: '' };
    expectProductAddFailure(newProduct, ERROR_MESSAGE.IS_NOT_INTEGER_QUANTITY);

    newProduct = { name: '호랑', price: 5080, quantity: '10' };
    expectProductAddFailure(newProduct, ERROR_MESSAGE.IS_NOT_INTEGER_QUANTITY);

    newProduct = { name: '호랑', price: 5080, quantity: 10.5 };
    expectProductAddFailure(newProduct, ERROR_MESSAGE.IS_NOT_INTEGER_QUANTITY);
  });

  test(`입력한 수량이 ${PRODUCT.QUANTITY.MIN}개 미만인 것을 허용하지 않는다.`, () => {
    const newProduct = { name: '호랑', price: 5080, quantity: PRODUCT.QUANTITY.MIN - 1 };

    expectProductAddFailure(newProduct, ERROR_MESSAGE.IS_UNDER_MIN_QUANTITY);
  });

  test(`입력한 수량이 ${PRODUCT.QUANTITY.MAX}개을 초과하는 것을 허용하지 않는다.`, () => {
    const newProduct = { name: '호랑', price: 5080, quantity: PRODUCT.QUANTITY.MAX + 1 };

    expectProductAddFailure(newProduct, ERROR_MESSAGE.IS_OVER_MAX_QUANTITY);
  });
});

const expectProductAddFailure = (newProduct, errorMessage) => {
  expect(() => addProduct(newProduct)).toThrowError(new Error(errorMessage));
  expect(findProduct(newProduct)).toBeUndefined();
};

export const addProduct = (newProduct) => {
  checkProductAddValidation(newProduct);

  ProductStore.instance.dispatch(createAction(PRODUCT_ACTION.ADD, newProduct));
};
