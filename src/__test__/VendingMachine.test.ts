import { Product, IProduct } from '../domain/Product';
import VendingMachine from '../domain/VendingMachine';
import { CONFIGURATION, ERROR_MESSAGE } from '../constants';

const addProduct = ({ name, price, quantity }: IProduct) => {
  const newProduct = {
    name,
    price,
    quantity,
  } as Product;

  VendingMachine.instance.addProduct(newProduct);
};

const findProduct = (name: string): Product =>
  VendingMachine.instance.products.find((product) => product.name === name);

const updateProduct = ({ currentName, changedName, changedPrice, changedQuantity }) => {
  VendingMachine.instance.updateProduct({
    targetName: currentName,
    name: changedName,
    price: changedPrice,
    quantity: changedQuantity,
  });
};

const checkAlert = (errorMessage: string, callback: Function) => {
  window.alert = jest.fn().mockReturnValue(errorMessage);
  const spyFn = jest.spyOn(window, 'alert');

  callback();

  expect(spyFn).toBeCalledTimes(1);
  expect(spyFn).toBeCalledWith(errorMessage);
};

describe('상품 관리에 성공한 경우', () => {
  beforeEach(() => {
    localStorage.clear();
    VendingMachine._instance = null;
  });

  const weed = {
    name: '잡초',
    price: 1000,
    quantity: 10,
  };

  test('상품을 추가할 수 있다.', () => {
    addProduct(weed);

    expect(findProduct(weed.name).name).toBe(weed.name);
  });

  test('특정 상품을 수정할 수 있다.', () => {
    addProduct(weed);
    updateProduct({
      currentName: '잡초',
      changedName: '민초',
      changedPrice: 2000,
      changedQuantity: 20,
    });

    expect(findProduct('민초').name).toBe('민초');
  });

  test('특정 상품을 삭제할 수 있다.', () => {
    addProduct(weed);
    VendingMachine.instance.deleteProduct(weed.name);

    expect(findProduct(weed.name)).toBe(undefined);
  });
});

describe('상품 관리에 실패한 경우', () => {
  beforeEach(() => {
    localStorage.clear();
    VendingMachine._instance = null;
  });

  const weed = {
    name: '잡초',
    price: 1000,
    quantity: 10,
  };

  const mincho = {
    name: '민초',
    price: 1000,
    quantity: 10,
  };

  const weedPriceIncorrect = {
    name: '잡초',
    price: 1234,
    quantity: 10,
  };

  test('중복된 이름의 상품은 추가할 수 없다.', () => {
    addProduct(weed);

    checkAlert(ERROR_MESSAGE.DUPLICATED_PRODUCT, () => addProduct(weed));
  });

  test('상품의 가격이 10원 단위가 아닌 경우 추가할 수 없다.', () => {
    checkAlert(ERROR_MESSAGE.INCORRECT_UNIT_PRODUCT_PRICE, () => addProduct(weedPriceIncorrect));
  });

  test('중복된 이름으로 특정 상품을 수정할 수 없다.', () => {
    addProduct(weed);
    addProduct(mincho);

    checkAlert(ERROR_MESSAGE.DUPLICATED_PRODUCT, () =>
      updateProduct({
        currentName: '민초',
        changedName: '잡초',
        changedPrice: 2000,
        changedQuantity: 20,
      }),
    );
  });

  test('상품을 10원 단위가 아닌 가격으로 수정할 수 없다. ', () => {
    addProduct(weed);

    checkAlert(ERROR_MESSAGE.INCORRECT_UNIT_PRODUCT_PRICE, () =>
      updateProduct({
        currentName: '잡초',
        changedName: '잡초',
        changedPrice: 2345,
        changedQuantity: 20,
      }),
    );
  });
});

describe('잔돈 충전에 성공한 경우', () => {
  beforeEach(() => {
    localStorage.clear();
    VendingMachine._instance = null;
  });

  test('잔돈을 충전할 수 있다.', () => {
    VendingMachine.instance.charge(CONFIGURATION.AMOUNT.MAX);

    expect(VendingMachine.instance.amount.getAmount()).toBe(CONFIGURATION.AMOUNT.MAX);
  });
});

describe('잔돈 충전에 실패한 경우', () => {
  beforeEach(() => {
    localStorage.clear();
    VendingMachine._instance = null;
  });

  test('투입된 금액이 10원 단위가 아닌 경우 충전할 수 없다.', () => {
    checkAlert(ERROR_MESSAGE.INCORRECT_UNIT_CHARGE_MONEY, () => {
      VendingMachine.instance.charge(1234);
    });
  });

  test('잔돈이 100,000원을 초과하도록 충전할 수 없다.', () => {
    checkAlert(ERROR_MESSAGE.OVER_AMOUNT, () => {
      VendingMachine.instance.charge(CONFIGURATION.AMOUNT.MAX + 1);
    });
  });
});
