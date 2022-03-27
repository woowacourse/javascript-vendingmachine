import { Product, VendingMachine } from '../../index.d';
import VendingMachineImpl from '../interactor/VendingMachineImpl';

describe('상품 추가', () => {
  let vendingMachine: VendingMachine;

  beforeEach(() => {
    vendingMachine = new VendingMachineImpl();
  });

  it('상품명이 없을 때, 상품이 추가되면 안된다.', () => {
    const product: Product = { name: '', price: 1000, quantity: 10 };
    const test = () => vendingMachine.addProduct(product);

    expect(test).toThrow('상품명을 입력해주세요!');
  });

  it('상품명이 11글자일 때, 상품이 추가되면 안된다.', () => {
    const product: Product = { name: '아메리카노좋아좋아좋아', price: 1000, quantity: 10 };
    const test = () => vendingMachine.addProduct(product);

    expect(test).toThrow('상품명은 1이상 10이하로 입력해주세요!');
  });

  it('상품명이 1글자일 때, 상품이 추가된다.', () => {
    const product: Product = { name: '얍', price: 1000, quantity: 10 };

    vendingMachine.addProduct(product);

    expect(vendingMachine.productCollection.products[0]).toEqual(product);
  });

  it('상품명이 10글자일 때, 상품이 추가된다.', () => {
    const product: Product = { name: '얍'.repeat(10), price: 1000, quantity: 10 };

    vendingMachine.addProduct(product);

    expect(vendingMachine.productCollection.products[0]).toEqual(product);
  });

  it('상품명이 중복된 경우, 상품이 추가되면 안된다.', () => {
    const product: Product = { name: '아메리카노', price: 1000, quantity: 10 };
    const test = () => vendingMachine.addProduct(product);

    vendingMachine.addProduct(product);

    expect(test).toThrow('이미 존재하는 상품입니다!');
  });

  it('상품 가격이 90원일 때, 상품이 추가되면 안된다.', () => {
    const product: Product = { name: '아메리카노', price: 90, quantity: 10 };
    const test = () => vendingMachine.addProduct(product);

    expect(test).toThrow('상품 가격은 100이상 10000이하로 입력해주세요!');
  });

  it('상품 가격이 10010원일 때, 상품이 추가되면 안된다.', () => {
    const product: Product = { name: '아메리카노', price: 10010, quantity: 10 };
    const test = () => vendingMachine.addProduct(product);

    expect(test).toThrow('상품 가격은 100이상 10000이하로 입력해주세요!');
  });

  it('상품 가격이 100원일 때, 상품이 추가된다.', () => {
    const product: Product = { name: '아메리카노', price: 100, quantity: 10 };

    vendingMachine.addProduct(product)

    expect(vendingMachine.productCollection.products[0]).toEqual(product);
  });

  it('상품 가격이 10000원일 때, 상품이 추가된다.', () => {
    const product: Product = { name: '아메리카노', price: 10000, quantity: 10 };

    vendingMachine.addProduct(product)

    expect(vendingMachine.productCollection.products[0]).toEqual(product);
  });

  it('상품 가격이 10으로 나누어 떨어지지 않을 때, 상품이 추가되면 안된다.', () => {
    const product: Product = { name: '아메리카노', price: 1009, quantity: 10 };
    const test = () => vendingMachine.addProduct(product);

    expect(test).toThrow('상품 가격은 10의 배수로 입력해주세요!');
  });

  it('상품 수량이 0개일 때, 상품이 추가되면 안된다.', () => {
    const product = { name: '아메리카노', price: 4300, quantity: 0 };
    const test = () => vendingMachine.addProduct(product);

    expect(test).toThrow('상품 수량은 1이상 20이하로 입력해주세요!');
  });

  it('상품 수량이 21개일 때, 상품이 추가되면 안된다.', () => {
    const product = { name: '아메리카노', price: 4300, quantity: 21 };
    const test = () => vendingMachine.addProduct(product);

    expect(test).toThrow('상품 수량은 1이상 20이하로 입력해주세요!');
  });

  it('상품 수량이 1개일 때, 상품이 추가된다.', () => {
    const product: Product = { name: '아메리카노', price: 2000, quantity: 1 };

    vendingMachine.addProduct(product)

    expect(vendingMachine.productCollection.products[0]).toEqual(product);
  });

  it('상품 수량이 20개일 때, 상품이 추가된다.', () => {
    const product: Product = { name: '아메리카노', price: 2000, quantity: 20 };

    vendingMachine.addProduct(product)

    expect(vendingMachine.productCollection.products[0]).toEqual(product);
  });
});
