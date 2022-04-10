import { ProductCatalog } from '../domain/ProductCatalog.ts';
import { PurchaseMoney } from '../domain/PurchaseMoney';

import { ERROR_MESSAGE } from '../utils/constants.ts';

describe('상품CRUD unit 테스트', () => {
  let productCatalog;

  const initProductList = () => {
    productCatalog.setProductList([]);
  };

  beforeEach(() => {
    productCatalog = new ProductCatalog();
    initProductList();
  });

  test('상품명, 가격, 수량을 입력하여 물품을 등록할 수 있다.', () => {
    expect(productCatalog.getProductList()).toHaveLength(0);

    productCatalog.addProduct({ name: '코카콜라', price: 1000, quantity: 20 });

    expect(productCatalog.findProduct('코카콜라').getAllProperties()).toStrictEqual({
      name: '코카콜라',
      price: 1000,
      quantity: 20,
    });
  });

  test('상품을 수정할 수 있다.', () => {
    productCatalog.addProduct({
      name: '코카콜라',
      price: 1000,
      quantity: 10,
    });
    productCatalog.editProduct('코카콜라', { name: '펩시', price: 500, quantity: 10 });

    expect(productCatalog.findProduct('펩시').getAllProperties()).toStrictEqual({
      name: '펩시',
      price: 500,
      quantity: 10,
    });
  });

  test('상품을 삭제할 수 있다', () => {
    productCatalog.addProduct({
      name: '코카콜라',
      price: 1000,
      quantity: 20,
    });
    expect(productCatalog.findProduct('코카콜라').getAllProperties()).toStrictEqual({
      name: '코카콜라',
      price: 1000,
      quantity: 20,
    });

    productCatalog.deleteProduct('코카콜라');
    expect(productCatalog.findProduct('코카콜라')).toBeNull;
  });

  test('상품을 구매할 수 있다', () => {
    const purchaseMoney = new PurchaseMoney();
    purchaseMoney.setMoney(1000);

    productCatalog.addProduct({ name: '코카콜라', price: 1000, quantity: 20 });

    const remainder = productCatalog.buyProduct('코카콜라', purchaseMoney.getMoney());
    purchaseMoney.setMoney(remainder);

    expect(purchaseMoney.getMoney()).toBe(0);

    expect(productCatalog.findProduct('코카콜라').getAllProperties()).toStrictEqual({
      name: '코카콜라',
      price: 1000,
      quantity: 19,
    });
  });
});

describe('상품 CRUD 예외사항 테스트', () => {
  let productCatalog;

  const initProductList = () => {
    productCatalog.setProductList([]);
  };

  beforeEach(() => {
    productCatalog = new ProductCatalog();
    initProductList();
  });

  test('이미 존재하는 상품을 추가할 수 없다', () => {
    productCatalog.addProduct({
      name: '코카콜라',
      price: 1000,
      quantity: 20,
    });

    expect(() =>
      productCatalog.addProduct({
        name: '코카콜라',
        price: 1000,
        quantity: 20,
      })
    ).toThrowError(new Error(ERROR_MESSAGE.DUPLICATE_PRODUCT_NAME_EXIST));
  });

  test('상품명은 최대 10글자까지 가능하다.', () => {
    expect(() =>
      productCatalog.addProduct({
        name: '코카콜라맛있다맛있으면또먹지딩동댕동',
        price: 1000,
        quantity: 20,
      })
    ).toThrowError(new Error(ERROR_MESSAGE.OVER_PRODUCT_NAME_LENGTH_LIMIT));
  });

  test('상품가격은 100원이상 이어야 한다.', () => {
    expect(() =>
      productCatalog.addProduct({
        name: '코카콜라',
        price: 10,
        quantity: 20,
      })
    ).toThrowError(new Error(ERROR_MESSAGE.NOT_WITHIN_PRODUCT_PRICE_RANGE));
  });

  test('상품가격은 10,000원 이하 이어야 한다.', () => {
    expect(() =>
      productCatalog.addProduct({
        name: '코카콜라',
        price: 10010,
        quantity: 20,
      })
    ).toThrowError(new Error(ERROR_MESSAGE.NOT_WITHIN_PRODUCT_PRICE_RANGE));
  });

  test('상품가격은 10원 단위여야 한다', () => {
    expect(() =>
      productCatalog.addProduct({
        name: '코카콜라',
        price: 105,
        quantity: 20,
      })
    ).toThrowError(new Error(ERROR_MESSAGE.NOT_DIVIDED_BY_PRODUCT_PRICE_UNIT));
  });

  test('상품수량은 최대 20개까지 가능하다', () => {
    expect(() =>
      productCatalog.addProduct({
        name: '코카콜라',
        price: 1000,
        quantity: 21,
      })
    ).toThrowError(new Error(ERROR_MESSAGE.OVER_PRODUCT_QUANTITY_LIMIT));
  });
});
