import VendingMachine from './VendingMachine';
import { ERROR_MESSAGE } from '../constants';

describe('자판기 테스트', () => {
  const vendingMachine = new VendingMachine();
  const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };

  beforeEach(() => {
    vendingMachine.addProduct(validProduct);
  });

  afterEach(() => {
    vendingMachine.products = [];
  });

  it('상품을 자판기에 추가할 수 있다.', () => {
    expect(vendingMachine.products).toContainEqual(validProduct);
  });

  it('상품을 자판기에 삭제할 수 있다.', () => {
    const productNameToDelete = '코카콜라';
    vendingMachine.deleteProduct(productNameToDelete);

    expect(vendingMachine.products).not.toContainEqual(validProduct);
  });

  it('중복된 상품명으로 상품을 추가하면 에러를 발생시킨다.', () => {
    const duplicatedProduct = { name: '코카콜라', price: 900, quantity: 5 };

    expect(() => {
      vendingMachine.addProduct(duplicatedProduct);
    }).toThrowError(ERROR_MESSAGE.DUPLICATED_PRODUCT);
  });

  it('상품 정보를 수정하면 수정된 상품 정보가 저장돼야 한다.', () => {
    const targetName = '코카콜라';
    const editedProduct = { name: '사이다', price: 1500, quantity: 15 };
    vendingMachine.editProduct(targetName, editedProduct);

    expect(vendingMachine.products).not.toContainEqual(validProduct);
    expect(vendingMachine.products).toContainEqual(editedProduct);
  });

  it('상품 정보를 수정할 시, 수정한 상품명이 기존 상품명과 중복되면 에러를 발생시킨다.', () => {
    const productToEdit = { name: '사이다', price: 1500, quantity: 15 };
    vendingMachine.addProduct(productToEdit);

    const newProduct = { name: '코카콜라', price: 1500, quantity: 15 };
    expect(() => {
      vendingMachine.editProduct('사이다', newProduct);
    }).toThrowError(ERROR_MESSAGE.DUPLICATED_PRODUCT);
  });

  it('상품 정보를 수정할 시, 상품명이 공백으로만 이루어져있거나 빈 값이면 에러를 발생시킨다.', () => {
    const productToEditEmpty = { name: '', price: 1500, quantity: 15 };
    const productToEditBlank = { name: '  ', price: 1500, quantity: 15 };

    expect(() => {
      vendingMachine.editProduct('코카콜라', productToEditEmpty);
    }).toThrowError(ERROR_MESSAGE.NAME_EMPTY);

    expect(() => {
      vendingMachine.editProduct('코카콜라', productToEditBlank);
    }).toThrowError(ERROR_MESSAGE.NAME_EMPTY);
  });

  it('상품 정보를 수정할 시, 상품명이 10글자 초과하면 에러를 발생시킨다.', () => {
    const overMaxNameLength = { name: '코카콜라열글자넘는이름', price: 1000, quantity: 10 };

    expect(() => {
      vendingMachine.editProduct('코카콜라', overMaxNameLength);
    }).toThrowError(ERROR_MESSAGE.NAME_LENGTH);
  });

  it('상품 정보를 수정할 시, 상품 가격이 100원 미만이면 에러를 발생시킨다.', () => {
    const underMinPrice = { name: '코카콜라', price: 99, quantity: 10 };

    expect(() => {
      vendingMachine.editProduct('코카콜라', underMinPrice);
    }).toThrowError(ERROR_MESSAGE.PRICE_RANGE);
  });

  it('상품 정보를 수정할 시, 상품 가격이 10,000원을 초과하면 에러를 발생시킨다.', () => {
    const overMaxPrice = { name: '코카콜라', price: 10001, quantity: 10 };

    expect(() => {
      vendingMachine.editProduct('코카콜라', overMaxPrice);
    }).toThrowError(ERROR_MESSAGE.PRICE_RANGE);
  });

  it('상품 정보를 수정할 시, 상품 가격이 10의 배수가 아니면 에러를 발생시킨다.', () => {
    const invalidUnitPrice = { name: '코카콜라', price: 1513, quantity: 10 };

    expect(() => {
      vendingMachine.editProduct('코카콜라', invalidUnitPrice);
    }).toThrowError(ERROR_MESSAGE.PRICE_UNIT);
  });

  it('상품 정보를 수정할 시, 상품 수량이 20개를 초과하면 에러를 발생시킨다.', () => {
    const overMaxQuantity = { name: '코카콜라', price: 1000, quantity: 21 };

    expect(() => {
      vendingMachine.editProduct('코카콜라', overMaxQuantity);
    }).toThrowError(ERROR_MESSAGE.EXCEED_QUANTITY);
  });
});
