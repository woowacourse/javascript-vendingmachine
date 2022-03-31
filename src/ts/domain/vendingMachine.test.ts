import VendingMachine from './VendingMachine';
import { ERROR_MESSAGE } from '../constants';
import Money from './Money';
import LocalStorageMock from './localStorageMock';

global.localStorage = new LocalStorageMock();

describe('상품 관리 테스트', () => {
  const vendingMachine = new VendingMachine();

  afterEach(() => {
    vendingMachine.products = [];
  });

  it('상품을 자판기에 추가할 수 있다.', () => {
    const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };
    const privateValidProduct = { _name: '코카콜라', _price: 1000, _quantity: 10 };
    vendingMachine.addProduct(validProduct);

    expect(vendingMachine.products).toContainEqual(privateValidProduct);
  });

  it('상품을 자판기에 삭제할 수 있다.', () => {
    const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };
    const privateValidProduct = { _name: '코카콜라', _price: 1000, _quantity: 10 };
    vendingMachine.addProduct(validProduct);

    const productNameToDelete = '코카콜라';
    vendingMachine.deleteProduct(productNameToDelete);

    expect(vendingMachine.products).not.toContainEqual(privateValidProduct);
  });

  it('중복된 상품명으로 상품을 추가하면 에러를 발생시킨다.', () => {
    const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };
    vendingMachine.addProduct(validProduct);

    const duplicatedProduct = { name: '코카콜라', price: 900, quantity: 5 };

    expect(() => {
      vendingMachine.addProduct(duplicatedProduct);
    }).toThrowError(ERROR_MESSAGE.DUPLICATED_PRODUCT);
  });

  it('상품 정보를 수정하면 수정된 상품 정보가 저장돼야 한다.', () => {
    const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };
    const privateValidProduct = { _name: '코카콜라', _price: 1000, _quantity: 10 };
    vendingMachine.addProduct(validProduct);

    const targetName = '코카콜라';
    const editedProduct = { name: '사이다', price: 1500, quantity: 15 };
    const privateEditedProduct = { _name: '사이다', _price: 1500, _quantity: 15 };

    vendingMachine.editProduct(targetName, editedProduct);

    expect(vendingMachine.products).not.toContainEqual(privateValidProduct);
    expect(vendingMachine.products).toContainEqual(privateEditedProduct);
  });

  it('상품 정보를 수정할 시, 수정한 상품명이 기존 상품명과 중복되면 에러를 발생시킨다.', () => {
    const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };
    vendingMachine.addProduct(validProduct);

    const productToEdit = { name: '사이다', price: 1500, quantity: 15 };
    vendingMachine.addProduct(productToEdit);

    const editedProduct = { name: '코카콜라', price: 1500, quantity: 15 };
    expect(() => {
      vendingMachine.editProduct('사이다', editedProduct);
    }).toThrowError(ERROR_MESSAGE.DUPLICATED_PRODUCT);
  });

  it('상품 정보를 수정할 시, 상품명이 공백으로만 이루어져있거나 빈 값이면 에러를 발생시킨다.', () => {
    const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };
    vendingMachine.addProduct(validProduct);

    const productToEditEmpty = { name: '', price: 1500, quantity: 15 };
    const productToEditBlank = { name: '  ', price: 1500, quantity: 15 };

    expect(() => {
      vendingMachine.editProduct('코카콜라', productToEditEmpty);
    }).toThrowError(ERROR_MESSAGE.NAME_EMPTY);

    expect(() => {
      vendingMachine.editProduct('코카콜라', productToEditBlank);
    }).toThrowError(ERROR_MESSAGE.NAME_EMPTY);
  });

  it('상품 정보를 수정할 시, 상품명이 10글자 초과하면 에러를 발생시킨다(11글자).', () => {
    const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };
    vendingMachine.addProduct(validProduct);

    const editedProduct = { name: '코카콜라열글자넘는이름', price: 1000, quantity: 10 };

    expect(() => {
      vendingMachine.editProduct('코카콜라', editedProduct);
    }).toThrowError(ERROR_MESSAGE.NAME_LENGTH);
  });

  it('상품 정보를 수정할 시, 상품명이 10글자 이하이면 정상 작동한다(10글자).', () => {
    const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };
    vendingMachine.addProduct(validProduct);

    const editedProduct = { name: '코카콜라열글자입니다', price: 1000, quantity: 10 };

    expect(() => {
      vendingMachine.editProduct('코카콜라', editedProduct);
    }).not.toThrowError(ERROR_MESSAGE.NAME_LENGTH);
  });

  it('상품 정보를 수정할 시, 상품명이 10글자 이하이면 정상 작동한다(9글자).', () => {
    const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };
    vendingMachine.addProduct(validProduct);

    const editedProduct = { name: '코카콜라아홉글자임', price: 1000, quantity: 10 };

    expect(() => {
      vendingMachine.editProduct('코카콜라', editedProduct);
    }).not.toThrowError(ERROR_MESSAGE.NAME_LENGTH);
  });

  it('상품 정보를 수정할 시, 상품 가격이 100원 미만이면 에러를 발생시킨다(99원).', () => {
    const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };
    vendingMachine.addProduct(validProduct);

    const editedProduct = { name: '코카콜라', price: 99, quantity: 10 };

    expect(() => {
      vendingMachine.editProduct('코카콜라', editedProduct);
    }).toThrowError(ERROR_MESSAGE.PRICE_RANGE);
  });

  it('상품 정보를 수정할 시, 상품 가격이 100원 이상이면 정상 작동한다(100원).', () => {
    const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };
    vendingMachine.addProduct(validProduct);

    const editedProduct = { name: '코카콜라', price: 100, quantity: 10 };

    expect(() => {
      vendingMachine.editProduct('코카콜라', editedProduct);
    }).not.toThrowError(ERROR_MESSAGE.PRICE_RANGE);
  });

  it('상품 정보를 수정할 시, 상품 가격이 100원 이상이면 정상 작동한다(101원).', () => {
    const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };
    vendingMachine.addProduct(validProduct);

    const editedProduct = { name: '코카콜라', price: 101, quantity: 10 };

    expect(() => {
      vendingMachine.editProduct('코카콜라', editedProduct);
    }).not.toThrowError(ERROR_MESSAGE.PRICE_RANGE);
  });

  it('상품 정보를 수정할 시, 상품 가격이 10,000원을 초과하면 에러를 발생시킨다(10,001원).', () => {
    const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };
    vendingMachine.addProduct(validProduct);

    const editedProduct = { name: '코카콜라', price: 10001, quantity: 10 };

    expect(() => {
      vendingMachine.editProduct('코카콜라', editedProduct);
    }).toThrowError(ERROR_MESSAGE.PRICE_RANGE);
  });

  it('상품 정보를 수정할 시, 상품 가격이 10,000원 이하라면 정상 작동한다(10,000원).', () => {
    const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };
    vendingMachine.addProduct(validProduct);

    const editedProduct = { name: '코카콜라', price: 10000, quantity: 10 };

    expect(() => {
      vendingMachine.editProduct('코카콜라', editedProduct);
    }).not.toThrowError(ERROR_MESSAGE.PRICE_RANGE);
  });

  it('상품 정보를 수정할 시, 상품 가격이 10,000원 이하라면 정상 작동한다(9,999원).', () => {
    const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };
    vendingMachine.addProduct(validProduct);

    const editedProduct = { name: '코카콜라', price: 9999, quantity: 10 };

    expect(() => {
      vendingMachine.editProduct('코카콜라', editedProduct);
    }).not.toThrowError(ERROR_MESSAGE.PRICE_RANGE);
  });

  it('상품 정보를 수정할 시, 상품 가격이 10의 배수가 아니면 에러를 발생시킨다(1,513원).', () => {
    const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };
    vendingMachine.addProduct(validProduct);

    const editedProduct = { name: '코카콜라', price: 1513, quantity: 10 };

    expect(() => {
      vendingMachine.editProduct('코카콜라', editedProduct);
    }).toThrowError(ERROR_MESSAGE.PRICE_UNIT);
  });

  it('상품 정보를 수정할 시, 상품 가격이 10의 배수이면 정상 작동한다(1,510원).', () => {
    const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };
    vendingMachine.addProduct(validProduct);

    const editedProduct = { name: '코카콜라', price: 1510, quantity: 10 };

    expect(() => {
      vendingMachine.editProduct('코카콜라', editedProduct);
    }).not.toThrowError(ERROR_MESSAGE.PRICE_UNIT);
  });

  it('상품 정보를 수정할 시, 상품 수량이 20개를 초과하면 에러를 발생시킨다(21개).', () => {
    const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };
    vendingMachine.addProduct(validProduct);

    const editedProduct = { name: '코카콜라', price: 1000, quantity: 21 };

    expect(() => {
      vendingMachine.editProduct('코카콜라', editedProduct);
    }).toThrowError(ERROR_MESSAGE.EXCEED_QUANTITY);
  });

  it('상품 정보를 수정할 시, 상품 수량이 20개를 초과하면 에러를 발생시킨다(20개).', () => {
    const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };
    vendingMachine.addProduct(validProduct);

    const editedProduct = { name: '코카콜라', price: 1000, quantity: 20 };

    expect(() => {
      vendingMachine.editProduct('코카콜라', editedProduct);
    }).not.toThrowError(ERROR_MESSAGE.EXCEED_QUANTITY);
  });

  it('상품 정보를 수정할 시, 상품 수량이 20개를 초과하면 에러를 발생시킨다(19개).', () => {
    const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };
    vendingMachine.addProduct(validProduct);

    const editedProduct = { name: '코카콜라', price: 1000, quantity: 19 };

    expect(() => {
      vendingMachine.editProduct('코카콜라', editedProduct);
    }).not.toThrowError(ERROR_MESSAGE.EXCEED_QUANTITY);
  });
});

describe('잔돈 충전 테스트', () => {
  const vendingMachine = new VendingMachine();

  afterEach(() => {
    vendingMachine.moneys = [
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

  it('충전할 금액이 10의 배수가 아니면 에러를 발생시킨다(1,153원).', () => {
    const insertedMoney = 1513;

    expect(() => {
      vendingMachine.rechargeMoney(insertedMoney);
    }).toThrowError(ERROR_MESSAGE.RECHARGE_MONEY_UNIT);
  });

  it('충전할 금액이 10의 배수가 아니면 에러를 발생시킨다(0원).', () => {
    const insertedMoney = 0;

    expect(() => {
      vendingMachine.rechargeMoney(insertedMoney);
    }).toThrowError(ERROR_MESSAGE.UNDER_MIN_RECHARGING_MONEY);
  });

  it('충전할 금액이 10의 배수이면 정상 작동한다(1,510원).', () => {
    const insertedMoney = 1510;

    expect(() => {
      vendingMachine.rechargeMoney(insertedMoney);
    }).not.toThrowError(ERROR_MESSAGE.RECHARGE_MONEY_UNIT);
  });

  it('보유한 금액이 100,000원을 초과하면 에러를 발생시킨다(100,010원).', () => {
    vendingMachine.rechargeMoney(50000);
    vendingMachine.rechargeMoney(30000);
    vendingMachine.rechargeMoney(20000);

    expect(() => {
      vendingMachine.rechargeMoney(10);
    }).toThrowError(ERROR_MESSAGE.EXCEED_HOLDING_MONEY);
  });

  it('보유한 금액이 100,000원 이하이면 정상 작동한다(100,000원).', () => {
    vendingMachine.rechargeMoney(50000);
    vendingMachine.rechargeMoney(30000);

    expect(() => {
      vendingMachine.rechargeMoney(20000);
    }).not.toThrowError(ERROR_MESSAGE.EXCEED_HOLDING_MONEY);
  });

  it('보유한 금액이 100,000원 이하이면 정상 작동한다(999,990원).', () => {
    vendingMachine.rechargeMoney(50000);
    vendingMachine.rechargeMoney(30000);

    expect(() => {
      vendingMachine.rechargeMoney(19990);
    }).not.toThrowError(ERROR_MESSAGE.EXCEED_HOLDING_MONEY);
  });
});
