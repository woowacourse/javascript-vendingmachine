import ProductManager from '../js/models/ProductManger.ts';
import { PRODUCT, ERROR_MESSAGE } from '../js/constants/constants.js';

describe('상품 정보 유효성 테스트', () => {
  let productManager;
  beforeEach(() => {
    productManager = new ProductManager();
  });

  it('정상적인 상품명, 가격, 상품 수량을 입력할 수 있다.', () => {
    const product = {
      name: '콜라',
      price: 1000,
      quantity: 10,
    };
    productManager.addProduct(product);
    expect(productManager.getProducts()).toContain(product);
  });

  it('상품명은 빈값을 입력할 수 없다.', () => {
    const emptyNameProduct = {
      name: '',
      price: 1000,
      quantity: 10,
    };
    expect(() => productManager.addProduct(emptyNameProduct)).toThrowError(
      ERROR_MESSAGE.EMPTY_NAME
    );
  });

  it(`상품명은 ${PRODUCT.MAX_LENGTH}글자 초과로 입력할 수 없다.`, () => {
    const longNameProduct = {
      name: '가나다라마바사아자차카',
      price: 1000,
      quantity: 10,
    };
    expect(() => productManager.addProduct(longNameProduct)).toThrowError(
      ERROR_MESSAGE.OVER_MAX_LENGTH
    );
  });

  it(`상품 가격은 ${PRODUCT.PRICE_UNIT}원 단위가 아니면 입력할 수 없다.`, () => {
    const indivisibleProduct = {
      name: '콜라1',
      price: 1001,
      quantity: 10,
    };
    expect(() => productManager.addProduct(indivisibleProduct)).toThrowError(
      ERROR_MESSAGE.NOT_DIVIDE_NUMBER
    );
  });

  it(`상품 가격은 ${PRODUCT.PRICE_RANGE.MIN}원 미만으로 입력할 수 없다.`, () => {
    const cheapProduct = {
      name: '콜라2',
      price: 90,
      quantity: 10,
    };
    expect(() => productManager.addProduct(cheapProduct)).toThrowError(
      ERROR_MESSAGE.OUT_OF_PRICE_RANGE
    );
  });

  it(`상품 가격은 ${PRODUCT.PRICE_RANGE.MAX}원을 초과할 수 없다.`, () => {
    const expensiveProduct = {
      name: '콜라3',
      price: 10010,
      quantity: 10,
    };
    expect(() => productManager.addProduct(expensiveProduct)).toThrowError(
      ERROR_MESSAGE.OUT_OF_PRICE_RANGE
    );
  });

  it(`상품 수량은 ${PRODUCT.QUANTITY_RANGE.MIN}개 미만으로 입력할 수 없다.`, () => {
    const lowInQuantityProduct = {
      name: '콜라4',
      price: 1000,
      quantity: 0,
    };
    expect(() => productManager.addProduct(lowInQuantityProduct)).toThrowError(
      ERROR_MESSAGE.OUT_OF_QUANTITY_RANGE
    );
  });

  it(`상품 수량은  ${PRODUCT.QUANTITY_RANGE.MAX}개 초과로 입력할 수 없다.`, () => {
    const lotOfQuantityProduct = {
      name: '콜라5',
      price: 1000,
      quantity: 21,
    };
    expect(() => productManager.addProduct(lotOfQuantityProduct)).toThrowError(
      ERROR_MESSAGE.OUT_OF_QUANTITY_RANGE
    );
  });
});

describe('상품 정보 수정, 삭제 테스트', () => {
  const productManager = new ProductManager();
  let newProduct;
  beforeEach(() => {
    newProduct = {
      name: '사이다',
      price: 2000,
      quantity: 15,
    };
  });

  it('조건에 맞는 상품명, 가격, 상품 수량으로 정보를 수정할 수 있다.', () => {
    const oldProductIndex = 0;
    const oldProduct = {
      name: '콜라',
      price: 1000,
      quantity: 10,
    };
    productManager.addProduct(oldProduct);
    productManager.modifyProduct(oldProductIndex, newProduct);
    const productList = productManager.getProducts();
    expect(productList).not.toContain(oldProduct);
    expect(productList).toContain(newProduct);
  });

  it('상품 정보를 삭제할 수 있다.', () => {
    const oldProductIndex = 0;
    productManager.deleteProduct(oldProductIndex);
    expect(productManager.getProducts()).not.toContain(newProduct);
  });
});
