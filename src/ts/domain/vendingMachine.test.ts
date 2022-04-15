import VendingMachine from './VendingMachine';
import { ERROR_MESSAGE } from '../constants';
import Money from './Money';
import LocalStorageMock from './localStorageMock';

global.localStorage = new LocalStorageMock();

describe('상품 관리 테스트', () => {
  const vendingMachine = new VendingMachine();
  const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };

  afterEach(() => {
    vendingMachine.products = [];
  });

  it('상품을 자판기에 추가할 수 있다.', () => {
    const addedProduct = vendingMachine.addProduct(validProduct);

    expect(vendingMachine.products).toContainEqual(addedProduct);
  });

  it('상품을 자판기에서 삭제할 수 있다.', () => {
    const productNameToDelete = '코카콜라';
    const addedProduct = vendingMachine.addProduct(validProduct);

    vendingMachine.deleteProduct(productNameToDelete);

    expect(vendingMachine.products).not.toContainEqual(addedProduct);
  });

  it('중복된 상품명으로 상품을 추가하면 에러를 발생시킨다.', () => {
    const duplicatedProduct = { name: '코카콜라', price: 900, quantity: 5 };

    vendingMachine.addProduct(validProduct);

    expect(() => {
      vendingMachine.addProduct(duplicatedProduct);
    }).toThrowError(ERROR_MESSAGE.DUPLICATED_PRODUCT);
  });

  it('상품 정보를 수정하면 수정된 상품 정보가 저장돼야 한다.', () => {
    vendingMachine.addProduct(validProduct);

    const editContents = { name: '사이다', price: 1500, quantity: 15 };

    const editedProduct = vendingMachine.editProduct(validProduct.name, editContents);

    expect(vendingMachine.products).toContainEqual(editedProduct);
    expect(vendingMachine.getProduct(validProduct.name)).toBeFalsy();
  });

  it('상품 정보를 수정할 시, 수정한 상품명이 기존 상품명과 중복되면 에러를 발생시킨다.', () => {
    const productToEdit = { name: '사이다', price: 1500, quantity: 15 };
    vendingMachine.addProduct(productToEdit);
    vendingMachine.addProduct(validProduct);

    const newProduct = { name: '코카콜라', price: 1500, quantity: 15 };
    expect(() => {
      vendingMachine.editProduct('사이다', newProduct);
    }).toThrowError(ERROR_MESSAGE.DUPLICATED_PRODUCT);
  });

  it('상품 정보를 수정할 시, 상품명이 공백으로만 이루어져있거나 빈 값이면 에러를 발생시킨다.', () => {
    const productToEditEmpty = { name: '', price: 1500, quantity: 15 };
    const productToEditBlank = { name: '  ', price: 1500, quantity: 15 };

    vendingMachine.addProduct(validProduct);

    expect(() => {
      vendingMachine.editProduct(validProduct.name, productToEditEmpty);
    }).toThrowError(ERROR_MESSAGE.NAME_EMPTY);

    expect(() => {
      vendingMachine.editProduct(validProduct.name, productToEditBlank);
    }).toThrowError(ERROR_MESSAGE.NAME_EMPTY);
  });

  it('상품 정보를 수정할 시, 상품명이 10글자 초과하면 에러를 발생시킨다.', () => {
    const overMaxNameLength = { name: '코카콜라열글자넘는이름', price: 1000, quantity: 10 };

    vendingMachine.addProduct(validProduct);

    expect(() => {
      vendingMachine.editProduct(validProduct.name, overMaxNameLength);
    }).toThrowError(ERROR_MESSAGE.NAME_LENGTH);
  });

  it('상품 정보를 수정할 시, 상품 가격이 100원 미만이면 에러를 발생시킨다.', () => {
    const underMinPrice = { name: '코카콜라', price: 99, quantity: 10 };

    vendingMachine.addProduct(validProduct);

    expect(() => {
      vendingMachine.editProduct(validProduct.name, underMinPrice);
    }).toThrowError(ERROR_MESSAGE.PRICE_RANGE);
  });

  it('상품 정보를 수정할 시, 상품 가격이 10,000원을 초과하면 에러를 발생시킨다.', () => {
    const overMaxPrice = { name: '코카콜라', price: 10001, quantity: 10 };

    vendingMachine.addProduct(validProduct);

    expect(() => {
      vendingMachine.editProduct(validProduct.name, overMaxPrice);
    }).toThrowError(ERROR_MESSAGE.PRICE_RANGE);
  });

  it('상품 정보를 수정할 시, 상품 가격이 10의 배수가 아니면 에러를 발생시킨다.', () => {
    const invalidUnitPrice = { name: '코카콜라', price: 1513, quantity: 10 };

    vendingMachine.addProduct(validProduct);

    expect(() => {
      vendingMachine.editProduct(validProduct.name, invalidUnitPrice);
    }).toThrowError(ERROR_MESSAGE.PRICE_UNIT);
  });

  it('상품 정보를 수정할 시, 상품 수량이 20개를 초과하면 에러를 발생시킨다.', () => {
    const overMaxQuantity = { name: '코카콜라', price: 1000, quantity: 21 };

    vendingMachine.addProduct(validProduct);

    expect(() => {
      vendingMachine.editProduct(validProduct.name, overMaxQuantity);
    }).toThrowError(ERROR_MESSAGE.EXCEED_QUANTITY);
  });
});

describe('잔돈 충전 테스트', () => {
  const vendingMachine = new VendingMachine();

  afterEach(() => {
    vendingMachine.money = [
      new Money(500, 0),
      new Money(100, 0),
      new Money(50, 0),
      new Money(10, 0),
    ];
  });

  it('잔돈을 충전하면, 충전된 금액과 생성된 동전들의 금액의 합이 같아야 한다.', () => {
    const moneyToRecharge = 1000;
    vendingMachine.rechargeMoney(moneyToRecharge);

    const holdingMoney = vendingMachine.getHoldingMoney();
    expect(holdingMoney).toEqual(moneyToRecharge);
  });

  it('충전할 금액이 10의 배수가 아니면 에러를 발생시킨다.', () => {
    const invalidUnitMoney = 1513;

    expect(() => {
      vendingMachine.rechargeMoney(invalidUnitMoney);
    }).toThrowError(ERROR_MESSAGE.RECHARGE_MONEY_UNIT);

    const zeroMoney = 0;

    expect(() => {
      vendingMachine.rechargeMoney(zeroMoney);
    }).toThrowError(ERROR_MESSAGE.UNDER_MIN_RECHARGING_MONEY);
  });

  it('보유한 금액이 100,000원을 넘으면 에러를 발생시킨다.', () => {
    vendingMachine.rechargeMoney(50000);
    vendingMachine.rechargeMoney(30000);
    vendingMachine.rechargeMoney(20000);

    expect(() => {
      vendingMachine.rechargeMoney(10);
    }).toThrowError(ERROR_MESSAGE.EXCEED_HOLDING_MONEY);
  });
});

describe('상품 구매 테스트', () => {
  const vendingMachine = new VendingMachine();

  afterEach(() => {
    localStorage.clear();
  });

  it('상품을 구매할 금액은 10의 배수여야 한다.', () => {
    const invalidUnitMoney = 105;

    expect(() => {
      vendingMachine.addPurchaseMoney(invalidUnitMoney);
    }).toThrowError(ERROR_MESSAGE.MONTY_UNIT);
  });

  it('상품을 구매할 금액은 10원 이상 10,000원 이하이어야 한다.', () => {
    const maxMoney = 10000;
    const overMaxMoney = 10010;
    const minMoney = 10;
    const underMinMoney = 9;

    expect(vendingMachine.addPurchaseMoney(maxMoney)).toEqual(vendingMachine.purchaseMoney.money);

    expect(() => {
      vendingMachine.addPurchaseMoney(overMaxMoney);
    }).toThrowError(ERROR_MESSAGE.EXCEED_PURCHASE_MONEY);

    expect(vendingMachine.addPurchaseMoney(minMoney)).toEqual(vendingMachine.purchaseMoney.money);

    expect(() => {
      vendingMachine.addPurchaseMoney(underMinMoney);
    }).toThrowError(ERROR_MESSAGE.UNDER_MIN_PURCHASE_MONEY);
  });

  it('상품 금액은 투입할 때마다 누적돼야 한다.', () => {
    const vendingMachine = new VendingMachine();

    const money100 = 100;
    const money200 = 200;
    const money300 = 300;

    vendingMachine.addPurchaseMoney(money100);
    vendingMachine.addPurchaseMoney(money200);
    vendingMachine.addPurchaseMoney(money300);

    expect(vendingMachine.purchaseMoney.money).toEqual(money100 + money200 + money300);
  });

  it('상품을 성공적으로 구매하면 구매한 상품의 수량이 하나 줄어든다.', () => {
    const vendingMachine = new VendingMachine();

    const purchaseMoney = 1000;
    const productToPurchase = {
      name: '콜라',
      price: 600,
      quantity: 3,
    };

    vendingMachine.addProduct(productToPurchase);
    vendingMachine.addPurchaseMoney(purchaseMoney);
    vendingMachine.purchaseProduct(productToPurchase.name);

    expect(vendingMachine.purchaseMoney.money).toEqual(purchaseMoney - productToPurchase.price);
    expect(vendingMachine.getProduct(productToPurchase.name).quantity).toEqual(
      productToPurchase.quantity - 1,
    );
  });

  it('상품의 가격이 투입한 금액보다 비싸면 에러를 발생시킨다.', () => {
    const vendingMachine = new VendingMachine();

    const purchaseMoney = 1000;
    const expensiveProduct = {
      name: '사이다',
      price: 1200,
      quantity: 3,
    };

    vendingMachine.addProduct(expensiveProduct);
    vendingMachine.addPurchaseMoney(purchaseMoney);

    expect(() => {
      vendingMachine.purchaseProduct(expensiveProduct.name);
    }).toThrowError(ERROR_MESSAGE.NOT_ENOUGH_MONEY);
  });

  it('상품을 구매하고 수량이 0이 되면 자판기에서 제거한다.', () => {
    const vendingMachine = new VendingMachine();

    const purchaseMoney = 1200;
    const oneLeftProduct = {
      name: '사이다',
      price: 1200,
      quantity: 1,
    };

    const addedProduct = vendingMachine.addProduct(oneLeftProduct);
    vendingMachine.addPurchaseMoney(purchaseMoney);
    vendingMachine.purchaseProduct(oneLeftProduct.name);

    expect(vendingMachine.products).not.toContainEqual(addedProduct);
  });
});
