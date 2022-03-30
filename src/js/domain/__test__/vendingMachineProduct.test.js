/* eslint-disable no-use-before-define */
/* eslint-disable max-lines-per-function */
import { ERROR_MESSAGE, PRODUCT_RULES } from '../../constants';
import VendingMachineProduct from '../VendingMachineProduct';

function generateProduct(inputData = {}) {
  const data = {
    name: inputData.name,
    price: inputData.price,
    stock: inputData.stock,
  };

  return new VendingMachineProduct(data);
}
function modifyProduct(inputData = {}) {
  const newProduct = generateProduct(inputData);
  const data = {
    name: inputData.name,
    price: inputData.price,
    stock: inputData.stock,
  };

  newProduct.modify(data);

  return newProduct;
}

describe('상품 클래스 테스트', () => {
  const name = '콜라';
  const price = 1500;
  const stock = 10;
  test('상품명, 가격, 수량을 입력하면 입력 값이 정상적으로 저장된다.', () => {
    const newProduct = generateProduct({ name, price, stock });

    const productData = {
      name: newProduct.name,
      price: newProduct.price,
      stock: newProduct.stock,
    };

    expect(productData).toEqual({ name, price, stock });
  });

  test('상품의 데이터를 수정할 수 있다.', () => {
    const newName = '사이다';
    const newPrice = 1200;
    const newStock = 5;

    const newData = { name: newName, price: newPrice, stock: newStock };
    const newProduct = modifyProduct(newData);

    const productData = {
      name: newProduct.name,
      price: newProduct.price,
      stock: newProduct.stock,
    };

    expect(productData).toEqual(newData);
  });

  validationTests('생성 시', generateProduct);
  validationTests('수정 시', modifyProduct);
});

function validationTests(testType, testFunction) {
  const name = '콜라';
  const price = 1500;
  const stock = 10;
  describe(`${testType} 유효성 검사`, () => {
    test(`${testType} 상품명이 입력되지 않으면 오류가 발생한다.`, () => {
      expect(() => testFunction({ price, stock })).toThrow(
        ERROR_MESSAGE.CONTAIN_EMPTY_FIELD_IN_FORM
      );
    });

    test(`${testType} 가격이 입력되지 않으면 오류가 발생한다.`, () => {
      expect(() => testFunction({ name, stock })).toThrow(
        ERROR_MESSAGE.CONTAIN_EMPTY_FIELD_IN_FORM
      );
    });

    test(`${testType} 수량이 입력되지 않으면 오류가 발생한다.`, () => {
      expect(() => testFunction({ name, price })).toThrow(
        ERROR_MESSAGE.CONTAIN_EMPTY_FIELD_IN_FORM
      );
    });

    test(`${testType} 상품명이 ${PRODUCT_RULES.MAX_NAME_LENGTH}글자를 초과하면 오류가 발생한다.`, () => {
      const invalidName = '콜라콜라맛있다맛있으면';

      expect(() => testFunction({ name: invalidName, price, stock })).toThrow(
        ERROR_MESSAGE.EXCEED_MAX_PRODUCT_NAME_LENGTH
      );
    });

    test(`${testType} 상품 가격이 ${PRODUCT_RULES.MIN_PRICE}원 미만인 경우 오류가 발생한다.`, () => {
      const lowPrice = 90;

      expect(() => testFunction({ name, price: lowPrice, stock })).toThrow(
        ERROR_MESSAGE.OUT_OF_PRODUCT_PRICE_RANGE
      );
    });

    test(`${testType} 상품 가격이 ${PRODUCT_RULES.MAX_PRICE}원을 초과한 경우 오류가 발생한다.`, () => {
      const highPrice = 10010;

      expect(() => testFunction({ name, price: highPrice, stock })).toThrow(
        ERROR_MESSAGE.OUT_OF_PRODUCT_PRICE_RANGE
      );
    });

    test(`${testType} 상품 가격은 ${PRODUCT_RULES.PRICE_UNIT}원 단위가 아닐 경우 오류가 발생한다.`, () => {
      const invalidUnitPrice = 111;

      expect(() => testFunction({ name, price: invalidUnitPrice, stock })).toThrow(
        ERROR_MESSAGE.INVALID_UNIT_PRODUCT_PRICE
      );
    });

    test(`${testType} 상품 수량은 ${PRODUCT_RULES.MAX_STOCK}개 초과할 경우 오류가 발생한다.`, () => {
      const invalidStock = 21;

      expect(() => testFunction({ name, price, stock: invalidStock })).toThrow(
        ERROR_MESSAGE.OUT_OF_PRODUCT_STOCK_RANGE
      );
    });

    test(`${testType} 상품 수량은 ${PRODUCT_RULES.MIN_STOCK}개 미만일 경우 오류가 발생한다.`, () => {
      const invalidStock = -1;

      expect(() => testFunction({ name, price, stock: invalidStock })).toThrow(
        ERROR_MESSAGE.OUT_OF_PRODUCT_STOCK_RANGE
      );
    });

    test(`${testType} 상품 수량이 자연수가 아닐 경우 오류가 발생한다.`, () => {
      const invalidStock = 1.1;

      expect(() => testFunction({ name, price, stock: invalidStock })).toThrow(
        ERROR_MESSAGE.INVALID_PRODUCT_STOCK
      );
    });
  });
}
