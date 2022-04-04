import { MAX_NAME_LENGTH, MAX_QUANTITY, PRICE_RULE } from '../constants';
import { MESSAGE } from '../constants/message';
import ProductManagementDomain from '../domain/ProductManagementDomain/ProductManagement';

describe('상품 도메인 추가/수정/삭제 테스트', () => {
  const productManagementDomain = new ProductManagementDomain();
  const clearProducts = () => {
    productManagementDomain.products.forEach(product =>
      productManagementDomain.deleteProduct(product.name),
    );
  };
  const product = { name: '콜라', price: 1000, quantity: 10 };

  beforeEach(() => {
    clearProducts();
  });

  it('상품 정보를 추가할 수 있다.', () => {
    productManagementDomain.addProduct(product);
    expect(productManagementDomain.products[0].product).toMatchObject(product);
  });

  it('상품 정보를 수정할 수 있다.', () => {
    productManagementDomain.addProduct(product);
    const newProduct = { name: '사이다', price: 800, quantity: 15 };
    const prevProductName = product.name;

    productManagementDomain.editProduct(prevProductName, newProduct);

    expect(productManagementDomain.products[0].product).toMatchObject(
      newProduct,
    );
  });

  it('상품 정보를 삭제할 수 있다.', () => {
    productManagementDomain.addProduct(product);

    productManagementDomain.deleteProduct(product.name);
    expect(productManagementDomain.products).toHaveLength(0);
  });
});

describe('상품 도메인 유효성 검증 테스트', () => {
  const productManagementDomain = new ProductManagementDomain();
  const product = {
    name: '콜라',
    price: PRICE_RULE.MIN,
    quantity: MAX_QUANTITY,
  };
  const clearProducts = () => {
    productManagementDomain.products.forEach(productInfo =>
      productManagementDomain.deleteProduct(productInfo.name),
    );
  };

  beforeEach(() => {
    clearProducts();
    productManagementDomain.addProduct(product);
  });

  it('상품 추가/수정 시, 빈 값이 있으면 에러를 발생시킨다.', () => {
    const newProduct = {
      name: `${product.name}사이다`,
      price: PRICE_RULE.MIN,
      quantity: MAX_QUANTITY,
    };

    const nullNameProduct = {
      ...newProduct,
      name: '',
    };
    expect(() =>
      productManagementDomain.validateProductInput(nullNameProduct),
    ).toThrowError(MESSAGE.ERROR_EMPTY_VALUE);

    const nullPriceProduct = {
      ...newProduct,
      price: NaN,
    };
    expect(() =>
      productManagementDomain.validateProductInput(nullPriceProduct),
    ).toThrowError(MESSAGE.ERROR_EMPTY_VALUE);

    const nullQuantityProduct = {
      ...newProduct,
      quantity: NaN,
    };
    expect(() =>
      productManagementDomain.validateProductInput(nullQuantityProduct),
    ).toThrowError(MESSAGE.ERROR_EMPTY_VALUE);
  });

  it('상품 추가 시, 동일한 이름의 상품이 존재하면 에러를 발생시킨다.', () => {
    const newProduct = {
      name: product.name,
      price: PRICE_RULE.MIN + PRICE_RULE.UNIT,
      quantity: MAX_QUANTITY - 1,
    };
    expect(() =>
      productManagementDomain.validateProductInput(newProduct),
    ).toThrowError(MESSAGE.ERROR_SAME_PRODUCT);
  });

  it('상품 수정 시, 동일한 이름의 상품이 존재하면 에러를 발생시킨다.', () => {
    const prevProductName = `${product.name}사이다`;
    const newProduct = {
      name: product.name,
      price: PRICE_RULE.MIN,
      quantity: MAX_QUANTITY,
    };
    expect(() =>
      productManagementDomain.validateProductInput(newProduct, prevProductName),
    ).toThrowError(MESSAGE.ERROR_SAME_PRODUCT);
  });

  it(`상품 추가/수정 시, 상품명의 길이는 ${MAX_NAME_LENGTH}을 초과하면 에러를 발생시킨다.`, () => {
    const newProduct = {
      name: '콜'.repeat(MAX_NAME_LENGTH + 1),
      price: PRICE_RULE.MIN,
      quantity: MAX_QUANTITY,
    };
    expect(() =>
      productManagementDomain.validateProductInput(newProduct),
    ).toThrowError(MESSAGE.ERROR_OVER_MAX_LENGTH);
  });

  it(`상품 추가/수정 시, 가격은 ${PRICE_RULE.MIN}원 미만이면 에러를 발생시킨다.`, () => {
    const newProduct = {
      name: `${product.name}사이다`,
      price: PRICE_RULE.MIN - PRICE_RULE.UNIT,
      quantity: MAX_QUANTITY,
    };
    expect(() =>
      productManagementDomain.validateProductInput(newProduct),
    ).toThrowError(MESSAGE.ERROR_INVALID_PRICE);
  });

  it(`상품 추가/수정 시, 가격은 ${PRICE_RULE.MAX}원 초과하면 에러를 발생시킨다.`, () => {
    const newProduct = {
      name: `${product.name}사이다`,
      price: PRICE_RULE.MAX + PRICE_RULE.UNIT,
      quantity: MAX_QUANTITY,
    };
    expect(() =>
      productManagementDomain.validateProductInput(newProduct),
    ).toThrowError(MESSAGE.ERROR_INVALID_PRICE);
  });

  it(`상품 추가/수정 시, 가격은 ${PRICE_RULE.UNIT}으로 나누어 떨어지지 않으면 에러를 발생시킨다.`, () => {
    const newProduct = {
      name: `${product.name}사이다`,
      price: PRICE_RULE.MIN + PRICE_RULE.UNIT / 2,
      quantity: MAX_QUANTITY,
    };
    expect(() =>
      productManagementDomain.validateProductInput(newProduct),
    ).toThrowError(MESSAGE.ERROR_INVALID_PRICE);
  });

  it(`상품 추가/수정 시, 수량이 ${MAX_QUANTITY}개를 초과하면 에러를 발생시킨다.`, () => {
    const newProduct = {
      name: `${product.name}사이다`,
      price: PRICE_RULE.MIN,
      quantity: MAX_QUANTITY + 1,
    };
    expect(() =>
      productManagementDomain.validateProductInput(newProduct),
    ).toThrowError(MESSAGE.ERROR_OVER_MAX_QUANTITY);
  });

  it(`상품 추가/수정 시, 상품명이 ${MAX_NAME_LENGTH}자이고, 가격이 ${PRICE_RULE.MAX}이며, 수량이 ${MAX_QUANTITY}개이면 정상 동작한다.`, () => {
    const newProduct = {
      name: '콜'.repeat(MAX_NAME_LENGTH),
      price: PRICE_RULE.MAX,
      quantity: MAX_QUANTITY,
    };
    expect(() =>
      productManagementDomain.validateProductInput(newProduct),
    ).not.toThrow();
  });

  it(`상품 추가/수정 시, 상품명이 1자이고, 가격이 ${PRICE_RULE.MIN}이며, 수량이 1개이면 정상 동작한다.`, () => {
    const newProduct = {
      name: '콜',
      price: PRICE_RULE.MIN,
      quantity: 1,
    };
    expect(() =>
      productManagementDomain.validateProductInput(newProduct),
    ).not.toThrow();
  });
});
