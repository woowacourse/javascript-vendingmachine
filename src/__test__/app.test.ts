import Product from '../domain/Product';
import VendingMachine from '../domain/VendingMachine';
import { ERROR_MESSAGE } from '../constants';

describe('상품 관리에 성공한 경우', () => {
  beforeEach(() => {
    localStorage.clear();
    VendingMachine._instance = null;
  });

  test('상품을 추가할 수 있다.', () => {
    const newProduct = {
      name: '잡초',
      price: 1000,
      quantity: 10,
    } as Product;

    VendingMachine.instance.addProduct(newProduct);

    expect(VendingMachine.instance.products.find((product) => product.name === newProduct.name).name).toBe(
      newProduct.name,
    );
  });

  test('특정 상품을 수정할 수 있다.', () => {
    const newProduct = {
      name: '잡초',
      price: 1000,
      quantity: 10,
    } as Product;
    const nameToChange = '민초';

    VendingMachine.instance.addProduct(newProduct);
    VendingMachine.instance.updateProduct({
      targetName: newProduct.name,
      name: nameToChange,
      price: 2000,
      quantity: 20,
    });

    expect(VendingMachine.instance.products.find((product) => product.name === nameToChange).name).toBe(nameToChange);
  });

  test('특정 상품을 삭제할 수 있다.', () => {
    const newProduct = {
      name: '잡초',
      price: 1000,
      quantity: 10,
    } as Product;
    const targetName = '잡초';

    VendingMachine.instance.addProduct(newProduct);
    VendingMachine.instance.deleteProduct(targetName);

    expect(VendingMachine.instance.products.some((product) => product.name === targetName)).toBe(false);
  });
});

describe('상품 관리에 실패한 경우', () => {
  beforeEach(() => {
    localStorage.clear();
    VendingMachine._instance = null;
  });

  test('중복된 이름의 상품은 추가할 수 없다.', () => {
    const newProduct = {
      name: '잡초',
      price: 1000,
      quantity: 10,
    } as Product;

    const duplicatedProduct = {
      name: '잡초',
      price: 2000,
      quantity: 10,
    } as Product;

    VendingMachine.instance.addProduct(newProduct);

    window.alert = jest.fn().mockReturnValue(ERROR_MESSAGE.DUPLICATED_PRODUCT);
    const spyFn = jest.spyOn(window, 'alert');

    VendingMachine.instance.addProduct(duplicatedProduct);

    expect(spyFn).toBeCalledTimes(1);
    expect(spyFn).toBeCalledWith(ERROR_MESSAGE.DUPLICATED_PRODUCT);
  });

  test('상품의 가격이 10원 단위가 아닌 경우 추가할 수 없다.', () => {
    const newProduct = {
      name: '잡초',
      price: 1234,
      quantity: 10,
    } as Product;

    window.alert = jest.fn().mockReturnValue(ERROR_MESSAGE.INCORRECT_UNIT_PRODUCT_PRICE);
    const spyFn = jest.spyOn(window, 'alert');

    VendingMachine.instance.addProduct(newProduct);

    expect(spyFn).toBeCalledTimes(1);
    expect(spyFn).toBeCalledWith(ERROR_MESSAGE.INCORRECT_UNIT_PRODUCT_PRICE);
  });

  test('중복된 이름으로 특정 상품을 수정할 수 없다.', () => {
    const product1 = {
      name: '잡초',
      price: 1000,
      quantity: 10,
    } as Product;

    const product2 = {
      name: '민초',
      price: 1000,
      quantity: 10,
    } as Product;

    VendingMachine.instance.addProduct(product1);
    VendingMachine.instance.addProduct(product2);

    window.alert = jest.fn().mockReturnValue(ERROR_MESSAGE.DUPLICATED_PRODUCT);
    const spyFn = jest.spyOn(window, 'alert');

    VendingMachine.instance.updateProduct({
      targetName: product2.name,
      name: product1.name,
      price: 2000,
      quantity: 20,
    });

    expect(spyFn).toBeCalledTimes(1);
    expect(spyFn).toBeCalledWith(ERROR_MESSAGE.DUPLICATED_PRODUCT);
  });

  test('상품을 10원 단위가 아닌 가격으로 수정할 수 없다. ', () => {
    const targetProduct = {
      name: '잡초',
      price: 1000,
      quantity: 10,
    } as Product;

    window.alert = jest.fn().mockReturnValue(ERROR_MESSAGE.INCORRECT_UNIT_PRODUCT_PRICE);
    const spyFn = jest.spyOn(window, 'alert');

    VendingMachine.instance.updateProduct({
      targetName: targetProduct.name,
      name: targetProduct.name,
      price: 2345,
      quantity: 20,
    });

    expect(spyFn).toBeCalledTimes(1);
    expect(spyFn).toBeCalledWith(ERROR_MESSAGE.INCORRECT_UNIT_PRODUCT_PRICE);
  });
});

describe('잔돈 충전에 성공한 경우', () => {
  beforeEach(() => {
    localStorage.clear();
    VendingMachine._instance = null;
  });

  test('잔돈을 충전할 수 있다.', () => {
    VendingMachine.instance.charge(1000);

    expect(VendingMachine.instance.amount.getAmount()).toBe(1000);
  });
});

describe('잔돈 충전에 실패한 경우', () => {
  beforeEach(() => {
    localStorage.clear();
    VendingMachine._instance = null;
  });

  test('투입된 금액이 10원 단위가 아닌 경우 충전할 수 없다.', () => {
    window.alert = jest.fn().mockReturnValue(ERROR_MESSAGE.INCORRECT_UNIT_CHARGE_MONEY);
    const spyFn = jest.spyOn(window, 'alert');

    VendingMachine.instance.charge(1234);

    expect(spyFn).toBeCalledTimes(1);
    expect(spyFn).toBeCalledWith(ERROR_MESSAGE.INCORRECT_UNIT_CHARGE_MONEY);
  });

  test('잔돈이 100,000원을 초과하도록 충전할 수 없다.', () => {
    window.alert = jest.fn().mockReturnValue(ERROR_MESSAGE.OVER_AMOUNT);
    const spyFn = jest.spyOn(window, 'alert');

    VendingMachine.instance.charge(200000);

    expect(spyFn).toBeCalledTimes(1);
    expect(spyFn).toBeCalledWith(ERROR_MESSAGE.OVER_AMOUNT);
  });
});
