import { Product, VendingMachine } from '../../index.d';
import { PRODUCT_RULES, ERROR_MESSAGE } from '../constant';
import VendingMachineImpl from '../interactor/VendingMachineImpl';

let vendingMachine: VendingMachine;

describe('상품 추가', () => {
  beforeEach(() => {
    vendingMachine = new VendingMachineImpl();
  });

  it('상품명이 없을 때, 상품이 추가되면 안된다.', () => {
    const product: Product = { name: '', price: 1000, quantity: 10 };
    const test = () => vendingMachine.addProduct(product);

    expect(test).toThrow(ERROR_MESSAGE.EMPTY_PRODUCT_NAME);
  });

  it(`상품명이 ${PRODUCT_RULES.MAX_NAME_LENGTH + 1}글자일 때, 상품이 추가되면 안된다.`, () => {
    const product: Product = { name: '아'.repeat(PRODUCT_RULES.MAX_NAME_LENGTH + 1), price: 1000, quantity: 10 };
    const test = () => vendingMachine.addProduct(product);

    expect(test).toThrow(ERROR_MESSAGE.OUT_OF_RANGE_PRODUCT_NAME);
  });

  it(`상품명이 ${PRODUCT_RULES.MIN_NAME_LENGTH}글자일 때, 상품이 추가된다.`, () => {
    const product: Product = { name: '얍', price: 1000, quantity: 10 };

    vendingMachine.addProduct(product);

    expect(vendingMachine.productCollection.products[0]).toEqual(product);
  });

  it(`상품명이 ${PRODUCT_RULES.MAX_NAME_LENGTH}글자일 때, 상품이 추가된다.`, () => {
    const product: Product = { name: '얍'.repeat(PRODUCT_RULES.MAX_NAME_LENGTH), price: 1000, quantity: 10 };

    vendingMachine.addProduct(product);

    expect(vendingMachine.productCollection.products[0]).toEqual(product);
  });

  it('상품명이 중복된 경우, 상품이 추가되면 안된다.', () => {
    const product: Product = { name: '아메리카노', price: 1000, quantity: 10 };
    const test = () => vendingMachine.addProduct(product);

    vendingMachine.addProduct(product);

    expect(test).toThrow(ERROR_MESSAGE.OVERLAP_PRODUCT);
  });

  it(`상품 가격이 ${PRODUCT_RULES.MIN_PRICE - PRODUCT_RULES.PRICE_MOD_UNIT}원일 때, 상품이 추가되면 안된다.`, () => {
    const product: Product = { name: '아메리카노', price: PRODUCT_RULES.MIN_PRICE - PRODUCT_RULES.PRICE_MOD_UNIT, quantity: 10 };
    const test = () => vendingMachine.addProduct(product);

    expect(test).toThrow(ERROR_MESSAGE.OUT_OF_RANGE_PRODUCT_PRICE);
  });

  it(`상품 가격이 ${PRODUCT_RULES.MAX_PRICE + PRODUCT_RULES.PRICE_MOD_UNIT}원일 때, 상품이 추가되면 안된다.`, () => {
    const product: Product = { name: '아메리카노', price: PRODUCT_RULES.MAX_PRICE + PRODUCT_RULES.PRICE_MOD_UNIT, quantity: 10 };
    const test = () => vendingMachine.addProduct(product);

    expect(test).toThrow(ERROR_MESSAGE.OUT_OF_RANGE_PRODUCT_PRICE);
  });

  it(`상품 가격이 ${PRODUCT_RULES.MIN_PRICE}원일 때, 상품이 추가된다.`, () => {
    const product: Product = { name: '아메리카노', price: PRODUCT_RULES.MIN_PRICE, quantity: 10 };

    vendingMachine.addProduct(product);

    expect(vendingMachine.productCollection.products[0]).toEqual(product);
  });

  it(`상품 가격이 ${PRODUCT_RULES.MAX_PRICE}원일 때, 상품이 추가된다.`, () => {
    const product: Product = { name: '아메리카노', price: PRODUCT_RULES.MAX_PRICE, quantity: 10 };

    vendingMachine.addProduct(product);

    expect(vendingMachine.productCollection.products[0]).toEqual(product);
  });

  it(`상품 가격이 ${PRODUCT_RULES.PRICE_MOD_UNIT}으로 나누어 떨어지지 않을 때, 상품이 추가되면 안된다.`, () => {
    const product: Product = { name: '아메리카노', price: PRODUCT_RULES.MIN_PRICE + PRODUCT_RULES.PRICE_MOD_UNIT - 1, quantity: 10 };
    const test = () => vendingMachine.addProduct(product);

    expect(test).toThrow(ERROR_MESSAGE.INDIVISIBLE_PRICE_MOD_UNIT);
  });

  it(`상품 수량이 ${PRODUCT_RULES.MIN_QUANTITY - 1}개일 때, 상품이 추가되면 안된다.`, () => {
    const product = { name: '아메리카노', price: 4300, quantity: PRODUCT_RULES.MIN_QUANTITY - 1 };
    const test = () => vendingMachine.addProduct(product);

    expect(test).toThrow(ERROR_MESSAGE.OUT_OF_RANGE_PRODUCT_QUANTITY);
  });

  it(`상품 수량이 ${PRODUCT_RULES.MAX_QUANTITY + 1}개일 때, 상품이 추가되면 안된다.`, () => {
    const product = { name: '아메리카노', price: 4300, quantity: PRODUCT_RULES.MAX_QUANTITY + 1 };
    const test = () => vendingMachine.addProduct(product);

    expect(test).toThrow(ERROR_MESSAGE.OUT_OF_RANGE_PRODUCT_QUANTITY);
  });

  it(`상품 수량이 ${PRODUCT_RULES.MIN_QUANTITY}개일 때, 상품이 추가된다.`, () => {
    const product: Product = { name: '아메리카노', price: 2000, quantity: PRODUCT_RULES.MIN_QUANTITY };

    vendingMachine.addProduct(product);

    expect(vendingMachine.productCollection.products[0]).toEqual(product);
  });

  it(`상품 수량이 ${PRODUCT_RULES.MAX_QUANTITY}개일 때, 상품이 추가된다.`, () => {
    const product: Product = { name: '아메리카노', price: 2000, quantity: PRODUCT_RULES.MAX_QUANTITY };

    vendingMachine.addProduct(product);

    expect(vendingMachine.productCollection.products[0]).toEqual(product);
  });
});

describe('상품 수정', () => {
  const originProductName = '얍';
  const addedProduct: Product = { name: originProductName, price: 1000, quantity: 10 };

  beforeEach(() => {
    vendingMachine = new VendingMachineImpl();
    vendingMachine.addProduct(addedProduct);
  });

  it('상품명이 없을 때, 상품이 수정되면 안된다.', () => {
    const product: Product = { name: '', price: 1000, quantity: 10 };
    const test = () => vendingMachine.modifyProduct(product, originProductName);

    expect(test).toThrow(ERROR_MESSAGE.EMPTY_PRODUCT_NAME);
  });

  it(`상품명이 ${PRODUCT_RULES.MAX_NAME_LENGTH + 1}글자일 때, 상품이 수정되면 안된다.`, () => {
    const product: Product = { name: '아'.repeat(PRODUCT_RULES.MAX_NAME_LENGTH + 1), price: 1000, quantity: 10 };
    const test = () => vendingMachine.modifyProduct(product, originProductName);

    expect(test).toThrow(ERROR_MESSAGE.OUT_OF_RANGE_PRODUCT_NAME);
  });

  it(`상품명이 ${PRODUCT_RULES.MIN_NAME_LENGTH}글자일 때, 상품이 수정된다.`, () => {
    const product: Product = { name: '욥', price: 1000, quantity: 10 };

    vendingMachine.modifyProduct(product, originProductName);

    expect(vendingMachine.productCollection.products[0]).toEqual(product);
  });

  it(`상품명이 ${PRODUCT_RULES.MAX_NAME_LENGTH}글자일 때, 상품이 수정된다.`, () => {
    const product: Product = { name: '얍'.repeat(PRODUCT_RULES.MAX_NAME_LENGTH), price: 1000, quantity: 10 };

    vendingMachine.modifyProduct(product, originProductName);

    expect(vendingMachine.productCollection.products[0]).toEqual(product);
  });

  it('상품명이 중복된 경우, 상품이 수정되면 안된다.', () => {
    const modifiedProductName = '얍얍';
    const additionalProduct: Product = { name: modifiedProductName, price: 1000, quantity: 10 };
    const modifiedProduct: Product = { ...addedProduct };
    const test = () => vendingMachine.modifyProduct(modifiedProduct, modifiedProductName);

    vendingMachine.addProduct(additionalProduct);

    expect(test).toThrow(ERROR_MESSAGE.OVERLAP_PRODUCT);
  });

  it(`상품 가격이 ${PRODUCT_RULES.MIN_PRICE - PRODUCT_RULES.PRICE_MOD_UNIT}원일 때, 상품이 수정되면 안된다.`, () => {
    const product: Product = { name: '아메리카노', price: PRODUCT_RULES.MIN_PRICE - PRODUCT_RULES.PRICE_MOD_UNIT, quantity: 10 };
    const test = () => vendingMachine.modifyProduct(product, originProductName);

    expect(test).toThrow(ERROR_MESSAGE.OUT_OF_RANGE_PRODUCT_PRICE);
  });

  it(`상품 가격이 ${PRODUCT_RULES.MAX_PRICE + PRODUCT_RULES.PRICE_MOD_UNIT}원일 때, 상품이 수정되면 안된다.`, () => {
    const product: Product = { name: '아메리카노', price: PRODUCT_RULES.MAX_PRICE + PRODUCT_RULES.PRICE_MOD_UNIT, quantity: 10 };
    const test = () => vendingMachine.modifyProduct(product, originProductName);

    expect(test).toThrow(ERROR_MESSAGE.OUT_OF_RANGE_PRODUCT_PRICE);
  });

  it(`상품 가격이 ${PRODUCT_RULES.MIN_PRICE}원일 때, 상품이 수정된다.`, () => {
    const product: Product = { name: '아메리카노', price: PRODUCT_RULES.MIN_PRICE, quantity: 10 };

    vendingMachine.modifyProduct(product, originProductName);

    expect(vendingMachine.productCollection.products[0]).toEqual(product);
  });

  it(`상품 가격이 ${PRODUCT_RULES.MAX_PRICE}원일 때, 상품이 수정된다.`, () => {
    const product: Product = { name: '아메리카노', price: PRODUCT_RULES.MAX_PRICE, quantity: 10 };

    vendingMachine.modifyProduct(product, originProductName);

    expect(vendingMachine.productCollection.products[0]).toEqual(product);
  });

  it(`상품 가격이 ${PRODUCT_RULES.PRICE_MOD_UNIT}으로 나누어 떨어지지 않을 때, 상품이 수정되면 안된다.`, () => {
    const product: Product = { name: '아메리카노', price: PRODUCT_RULES.MIN_PRICE + PRODUCT_RULES.PRICE_MOD_UNIT - 1, quantity: 10 };
    const test = () => vendingMachine.modifyProduct(product, originProductName);

    expect(test).toThrow(ERROR_MESSAGE.INDIVISIBLE_PRICE_MOD_UNIT);
  });

  it(`상품 수량이 ${PRODUCT_RULES.MIN_QUANTITY - 1}개일 때, 상품이 수정되면 안된다.`, () => {
    const product = { name: '아메리카노', price: 4300, quantity: PRODUCT_RULES.MIN_QUANTITY - 1 };
    const test = () => vendingMachine.modifyProduct(product, originProductName);

    expect(test).toThrow(ERROR_MESSAGE.OUT_OF_RANGE_PRODUCT_QUANTITY);
  });

  it(`상품 수량이 ${PRODUCT_RULES.MAX_QUANTITY + 1}개일 때, 상품이 수정되면 안된다.`, () => {
    const product = { name: '아메리카노', price: 4300, quantity: PRODUCT_RULES.MAX_QUANTITY + 1 };
    const test = () => vendingMachine.modifyProduct(product, originProductName);

    expect(test).toThrow(ERROR_MESSAGE.OUT_OF_RANGE_PRODUCT_QUANTITY);
  });

  it(`상품 수량이 ${PRODUCT_RULES.MIN_QUANTITY}개일 때, 상품이 수정된다.`, () => {
    const product: Product = { name: '아메리카노', price: 2000, quantity: PRODUCT_RULES.MIN_QUANTITY };

    vendingMachine.modifyProduct(product, originProductName);

    expect(vendingMachine.productCollection.products[0]).toEqual(product);
  });

  it(`상품 수량이 ${PRODUCT_RULES.MAX_QUANTITY}개일 때, 상품이 수정된다.`, () => {
    const product: Product = { name: '아메리카노', price: 2000, quantity: PRODUCT_RULES.MAX_QUANTITY };

    vendingMachine.modifyProduct(product, originProductName);

    expect(vendingMachine.productCollection.products[0]).toEqual(product);
  });
});

describe('상품 삭제', () => {
  const originProductName = '얍';
  const addedProduct: Product = { name: originProductName, price: 1000, quantity: 10 };

  beforeEach(() => {
    vendingMachine = new VendingMachineImpl();
    vendingMachine.addProduct(addedProduct);
  });

  it('상품 목록에 존재하지 않는 상품명이 입력됐을 때, 삭제할 수 없다.', () => {
    const deleteProductName = '야압';
    const test = () => vendingMachine.deleteProduct(deleteProductName);

    expect(test).toThrow('존재하지 않는 상품입니다!');
  });

  it('상품 목록에 존재하는 상품명이 입력됐을 때, 삭제할 수 있다.', () => {
    const deleteProductName = originProductName;

    vendingMachine.deleteProduct(deleteProductName);

    expect(vendingMachine.productCollection.getIndex(deleteProductName)).toBe(-1);
  });
});