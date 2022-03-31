import ProductStore from '../../domains/stores/ProductStore';
import { createAction, PRODUCT_ACTION } from '../../domains/actions';
import { checkDuplicateProductWhenModify, checkProductValidation } from '../../validators';
import { ERROR_MESSAGE, PRODUCT } from '../../constants';

import { findProduct } from './product.test';
import { addProduct } from './productAdd.validation.test';

describe('상품 수정에 대한 유효성을 검사한다.', () => {
  const oldProduct = { name: '호랑', price: 5080, quantity: 10 };

  beforeEach(() => {
    ProductStore._instance = null;

    addProduct(oldProduct);
  });

  test('수정한 상품명이 공백인 것을 허용하지 않는다.', () => {
    const newProductInfo = { name: '', price: 5080, quantity: 10 };

    expectProductModifyFailure({ oldProduct, newProductInfo }, ERROR_MESSAGE.IS_BLANK_PRODUCT_NAME);
  });

  test('수정한 상품명이 10글자를 초과하는 것을 허용하지 않는다.', () => {
    const newProductInfo = { name: '호랑호랑호랑호랑호랑호', price: 5080, quantity: 10 };

    expectProductModifyFailure({ oldProduct, newProductInfo }, ERROR_MESSAGE.IS_OVER_MAX_PRODUCT_NAME_LENGTH);
  });

  test('상품명을 이미 존재하는 상품명으로 수정하는 것을 허용하지 않는다.', () => {
    const existProduct = { name: '데자와', price: 7210, quantity: 10 };
    const newProductInfo = { name: '데자와', price: 5080, quantity: 10 };

    addProduct(existProduct);

    expectProductModifyFailure({ oldProduct, newProductInfo }, ERROR_MESSAGE.IS_ALREADY_EXIST_PRODUCT_WHEN_MODIFY);
  });

  test('수정한 가격이 정수가 아닌 것을 허용하지 않는다.', () => {
    let newProductInfo = { name: '호랑', price: '', quantity: 10 };
    expectProductModifyFailure({ oldProduct, newProductInfo }, ERROR_MESSAGE.IS_NOT_INTEGER_PRICE);

    newProductInfo = { name: '호랑', price: '7210', quantity: 10 };
    expectProductModifyFailure({ oldProduct, newProductInfo }, ERROR_MESSAGE.IS_NOT_INTEGER_PRICE);

    newProductInfo = { name: '호랑', price: 7210.5, quantity: 10 };
    expectProductModifyFailure({ oldProduct, newProductInfo }, ERROR_MESSAGE.IS_NOT_INTEGER_PRICE);
  });

  test(`수정한 가격이 ${PRODUCT.PRICE.MIN}원 미만인 것을 허용하지 않는다.`, () => {
    const newProductInfo = { name: '호랑', price: PRODUCT.PRICE.MIN - 1, quantity: 10 };

    expectProductModifyFailure({ oldProduct, newProductInfo }, ERROR_MESSAGE.IS_UNDER_MIN_PRICE);
  });

  test(`수정한 가격이 ${PRODUCT.PRICE.MAX}원을 초과하는 것을 허용하지 않는다.`, () => {
    const newProductInfo = { name: '호랑', price: PRODUCT.PRICE.MAX + 1, quantity: 10 };

    expectProductModifyFailure({ oldProduct, newProductInfo }, ERROR_MESSAGE.IS_OVER_MAX_PRICE);
  });

  test(`수정한 가격이 10원 단위로 나누어 떨어지지 않는 것을 허용하지 않는다.`, () => {
    let newProductInfo = { name: '호랑', price: 7211, quantity: 10 };
    expectProductModifyFailure({ oldProduct, newProductInfo }, ERROR_MESSAGE.PRICE_CANNOT_DIVIDED_BY_TEN);

    newProductInfo = { name: '호랑', price: 7212, quantity: 10 };
    expectProductModifyFailure({ oldProduct, newProductInfo }, ERROR_MESSAGE.PRICE_CANNOT_DIVIDED_BY_TEN);

    newProductInfo = { name: '호랑', price: 7215, quantity: 10 };
    expectProductModifyFailure({ oldProduct, newProductInfo }, ERROR_MESSAGE.PRICE_CANNOT_DIVIDED_BY_TEN);
  });

  test('수정한 수량이 정수가 아닌 것을 허용하지 않는다.', () => {
    let newProductInfo = { name: '호랑', price: 7210, quantity: '' };
    expectProductModifyFailure({ oldProduct, newProductInfo }, ERROR_MESSAGE.IS_NOT_INTEGER_QUANTITY);

    newProductInfo = { name: '호랑', price: 7210, quantity: '5' };
    expectProductModifyFailure({ oldProduct, newProductInfo }, ERROR_MESSAGE.IS_NOT_INTEGER_QUANTITY);

    newProductInfo = { name: '호랑', price: 7210, quantity: 5.5 };
    expectProductModifyFailure({ oldProduct, newProductInfo }, ERROR_MESSAGE.IS_NOT_INTEGER_QUANTITY);
  });

  test(`수정한 수량이 ${PRODUCT.QUANTITY.MIN}개 미만인 것을 허용하지 않는다.`, () => {
    const newProductInfo = { name: '호랑', price: 7210, quantity: PRODUCT.QUANTITY.MIN - 1 };

    expectProductModifyFailure({ oldProduct, newProductInfo }, ERROR_MESSAGE.IS_UNDER_MIN_QUANTITY);
  });

  test(`수정한 수량이 ${PRODUCT.QUANTITY.MAX}개을 초과하는 것을 허용하지 않는다.`, () => {
    const newProductInfo = { name: '호랑', price: 7210, quantity: PRODUCT.QUANTITY.MAX + 1 };

    expectProductModifyFailure({ oldProduct, newProductInfo }, ERROR_MESSAGE.IS_OVER_MAX_QUANTITY);
  });
});

const expectProductModifyFailure = ({ oldProduct, newProductInfo }, errorMessage) => {
  expect(() => modifyProduct(oldProduct.name, newProductInfo)).toThrowError(new Error(errorMessage));
  expect(findProduct(oldProduct)).toBe(oldProduct);
  expect(findProduct(newProductInfo)).toBeUndefined();
};

const modifyProduct = (oldProductName, newProductInfo) => {
  if (oldProductName !== newProductInfo.name) {
    checkDuplicateProductWhenModify(newProductInfo);
  }

  checkProductValidation(newProductInfo);

  ProductStore.instance.dispatch(createAction(PRODUCT_ACTION.MODIFY, { oldProductName, newProductInfo }));
};
