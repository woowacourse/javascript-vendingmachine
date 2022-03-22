/* eslint-disable no-use-before-define */
/* eslint-disable max-lines-per-function */
import VendingMachineProduct from './VendingMachineProduct';

function generateProduct(inputData = {}) {
  const data = {
    name: inputData.name || '콜라',
    price: inputData.price || 1500,
    stock: inputData.stock || 20,
  };

  return new VendingMachineProduct(data);
}

function modifyProduct(inputData = {}) {
  const newProduct = generateProduct();
  const data = {
    name: inputData.name || '사이다',
    price: inputData.price || 1200,
    stock: inputData.stock || 5,
  };

  newProduct.modify(data);

  return newProduct;
}

describe('상품 클래스 테스트', () => {
  test('상품명, 가격, 수량을 입력하면 입력 값이 정상적으로 저장된다.', () => {
    const name = '콜라';
    const price = 1500;
    const stock = 10;

    const newProduct = generateProduct({ name, price, stock });

    const productData = {
      name: newProduct.name,
      price: newProduct.price,
      stock: newProduct.stock,
    };

    expect(productData).toEqual({ name, price, stock });
  });

  test('상품의 데이터를 수정할 수 있다.', () => {
    const newProduct = modifyProduct();

    const name = '사이다';
    const price = 1200;
    const stock = 5;
    const newData = { name, price, stock };

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
  describe(`${testType} 유효성 검사`, () => {
    test(`${testType} 상품명이 10글자 초과되면 에러를 발생한다.`, () => {
      const invalidName = '콜라콜라맛있다맛있으면';

      expect(() => testFunction({ name: invalidName })).toThrow(
        '상품명은 10글자를 초과해서는 안됩니다.'
      );
    });

    test(`${testType} 상품 가격이 100원 미만인 경우 오류가 발생한다.`, () => {
      const lowPrice = 90;

      expect(() => testFunction({ price: lowPrice })).toThrow(
        '상품 가격은 100원 미만이거나 10000원 초과일 수 없습니다.'
      );
    });

    test(`${testType} 상품 가격이 10000원을 초과한 경우 오류가 발생한다.`, () => {
      const highPrice = 10010;

      expect(() => testFunction({ price: highPrice })).toThrow(
        '상품 가격은 100원 미만이거나 10000원 초과일 수 없습니다.'
      );
    });

    test(`${testType} 상품 가격은 10원 단위가 아닐 경우 오류가 발생한다.`, () => {
      const invalidUnitPrice = 111;

      expect(() => testFunction({ price: invalidUnitPrice })).toThrow(
        '상품 가격은 10원 단위여야 합니다.'
      );
    });

    test(`${testType} 상품 수량은 20개 초과할 경우 오류가 발생한다.`, () => {
      const invalidStock = 21;

      expect(() => testFunction({ stock: invalidStock })).toThrow(
        '상품 수량은 20개 초과해서는 안됩니다.'
      );
    });
  });
}
