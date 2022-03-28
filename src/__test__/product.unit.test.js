import { ProductCatalog } from '../domain/ProductCatalog.ts';
import { Product } from '../domain/Product.ts';

import { ERROR_MESSAGE } from '../utils/constants.ts';

test('상품명, 가격, 수량을 입력하여 물품을 등록할 수 있다.', () => {
  const productCatalog = new ProductCatalog();
  expect(productCatalog.getProductList()).toHaveLength(0);

  productCatalog.addProduct('코카콜라', 1000, 20);

  expect(productCatalog.getProductList()[0].getAllProperties()).toStrictEqual({
    name: '코카콜라',
    price: 1000,
    quantity: 20,
  });
});

test('상품명은 최대 10글자까지 가능하다.', () => {
  const productCatalog = new ProductCatalog();
  try {
    productCatalog.addProduct('코카콜라맛있다맛있으면또먹지딩동댕동', 1000, 20);
  } catch (err) {
    expect(err).toStrictEqual(new Error(ERROR_MESSAGE.OVER_PRODUCT_NAME_LENGTH_LIMIT));
  }
});

test('상품가격은 100원이상 이어야 한다.', () => {
  const productCatalog = new ProductCatalog();
  try {
    productCatalog.addProduct('코카콜라', 10, 20);
  } catch (err) {
    expect(err).toStrictEqual(new Error(ERROR_MESSAGE.NOT_WITHIN_PRODUCT_PRICE_RANGE));
  }
});

test('상품가격은 10,000원 이하 이어야 한다.', () => {
  const productCatalog = new ProductCatalog();
  try {
    productCatalog.addProduct('코카콜라', 1000000, 20);
  } catch (err) {
    expect(err).toStrictEqual(new Error(ERROR_MESSAGE.NOT_WITHIN_PRODUCT_PRICE_RANGE));
  }
});

test('상품가격은 10원 단위여야 한다', () => {
  const productCatalog = new ProductCatalog();
  try {
    productCatalog.addProduct('코카콜라', 153, 20);
  } catch (err) {
    expect(err).toStrictEqual(new Error(ERROR_MESSAGE.NOT_DIVIDED_BY_PRODUCT_PRICE_UNIT));
  }
});

test('상품수량은 최대 20개까지 가능하다', () => {
  const productCatalog = new ProductCatalog();
  try {
    productCatalog.addProduct('코카콜라', 1000, 2000);
  } catch (err) {
    expect(err).toStrictEqual(new Error(ERROR_MESSAGE.OVER_PRODUCT_QUANTITY_LIMIT));
  }
});

test('상품을 수정할 수 있다.', () => {
  const product = new Product('코카콜라', 1000, 20);

  product.setName('펩시');
  product.setPrice(500);
  product.setQuantity(10);

  expect(product.getAllProperties()).toStrictEqual({
    name: '펩시',
    price: 500,
    quantity: 10,
  });
});

test('상품을 삭제할 수 있다', () => {
  const productCatalog = new ProductCatalog();

  productCatalog.addProduct('코카콜라', 1000, 20);
  expect(productCatalog.findProduct('코카콜라').getAllProperties()).toStrictEqual({
    name: '코카콜라',
    price: 1000,
    quantity: 20,
  });

  productCatalog.deleteProduct('코카콜라');
  expect(productCatalog.findProduct('코카콜라')).toBeNull;
});

test('이미 존재하는 제품을 추가했을시 수량을 합쳐준다.', () => {
  const productCatalog = new ProductCatalog();

  productCatalog.addProduct('코카콜라', 1000, 10);
  productCatalog.addProduct('코카콜라', 1000, 8);

  expect(productCatalog.getProductList()[0].getAllProperties()).toStrictEqual({
    name: '코카콜라',
    price: 1000,
    quantity: 18,
  });
});

test('이미 존재하는 제품을 추가했을시 합한 수량이 20개가 넘을 수 없다', () => {
  const productCatalog = new ProductCatalog();

  productCatalog.addProduct('코카콜라', 1000, 10);

  try {
    productCatalog.addProduct('코카콜라', 1000, 11);
  } catch (err) {
    expect(err).toStrictEqual(new Error(ERROR_MESSAGE.OVER_PRODUCT_QUANTITY_LIMIT));
  }
});
