import ProductManager from '../js/models/ProductManger.ts';
import { ERROR_MESSAGE } from '../js/constants/constants.js';

describe('상품 관리 탭 테스트', () => {
  it('조건에 맞는 상품명, 가격, 상품 수량을 입력할 수 있다.', () => {
    const productManager = new ProductManager();
    const product = {
      name: '콜라',
      price: 1000,
      quantity: 10,
    };
    productManager.addProduct(product);
    expect(productManager.getProducts()).toContain(product);
  });

  it('상품명은 빈값을 입력할 수 없다.', () => {
    const productManager = new ProductManager();
    const product = {
      name: '',
      price: 1000,
      quantity: 10,
    };
    expect(() => productManager.addProduct(product)).toThrowError(ERROR_MESSAGE.EMPTY_NAME);
  });

  it('상품명은 10글자 초과로 입력할 수 없다.', () => {
    const productManager = new ProductManager();
    const product = {
      name: '가나다라마바사아자차카',
      price: 1000,
      quantity: 10,
    };
    expect(() => productManager.addProduct(product)).toThrowError(ERROR_MESSAGE.OVER_MAX_LENGTH);
  });

  it('상품 가격은 10원 단위가 아니면 입력할 수 없다.', () => {
    const productManager = new ProductManager();
    const product = {
      name: '콜라',
      price: 1001,
      quantity: 10,
    };
    expect(() => productManager.addProduct(product)).toThrowError(ERROR_MESSAGE.NOT_DIVIDE_NUMBER);
  });

  it('상품 가격은 100원 미만으로 입력할 수 없다.', () => {
    const productManager = new ProductManager();
    const product = {
      name: '콜라',
      price: 90,
      quantity: 10,
    };
    expect(() => productManager.addProduct(product)).toThrowError(ERROR_MESSAGE.OUT_OF_PRICE_RANGE);
  });

  it('상품 가격은 10000원을 초과할 수 없다.', () => {
    const productManager = new ProductManager();
    const product = {
      name: '콜라',
      price: 10010,
      quantity: 10,
    };
    expect(() => productManager.addProduct(product)).toThrowError(ERROR_MESSAGE.OUT_OF_PRICE_RANGE);
  });

  it('상품 수량은 1개 미만으로 입력할 수 없다.', () => {
    const productManager = new ProductManager();
    const product = {
      name: '콜라',
      price: 1000,
      quantity: 0,
    };
    expect(() => productManager.addProduct(product)).toThrowError(
      ERROR_MESSAGE.OUT_OF_QUANTITY_RANGE
    );
  });

  it('상품 수량은 20개 초과로 입력할 수 없다.', () => {
    const productManager = new ProductManager();
    const product = {
      name: '콜라',
      price: 1000,
      quantity: 21,
    };
    expect(() => productManager.addProduct(product)).toThrowError(
      ERROR_MESSAGE.OUT_OF_QUANTITY_RANGE
    );
  });
});

describe('상품 정보 수정 테스트', () => {
  it('조건에 맞는 상품명, 가격, 상품 수량으로 정보를 수정할 수 있다.', () => {
    const productManager = new ProductManager();
    const oldProductIndex = 0;
    const oldProduct = {
      name: '콜라',
      price: 1000,
      quantity: 10,
    };
    const newProduct = {
      name: '사이다',
      price: 2000,
      quantity: 15,
    };
    productManager.addProduct(oldProduct);
    productManager.modifyProduct(oldProductIndex, newProduct);
    const productList = productManager.getProducts();
    expect(productList).not.toContain(oldProduct);
    expect(productList).toContain(newProduct);
  });

  it('상품 정보를 삭제할 수 있다.', () => {
    const productManager = new ProductManager();
    const oldProductIndex = 0;
    const oldProduct = {
      name: '콜라',
      price: 1000,
      quantity: 10,
    };
    productManager.addProduct(oldProduct);
    productManager.deleteProduct(oldProductIndex);
    expect(productManager.getProducts()).not.toContain(oldProduct);
  });
});
