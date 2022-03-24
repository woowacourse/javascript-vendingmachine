import VendingMachine from './VendingMachine';

describe('자판기 테스트', () => {
  it('상품을 자판기에 추가할 수 있다.', () => {
    const vendingMachine = new VendingMachine();
    const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };

    vendingMachine.addProduct(validProduct);

    expect(vendingMachine.products).toContainEqual(validProduct);
  });

  it('상품을 자판기에 삭제할 수 있다.', () => {
    const vendingMachine = new VendingMachine();
    const validProduct = { name: '코카콜라', price: 1000, quantity: 10 };
    vendingMachine.addProduct(validProduct);

    const productNameToDelete = '코카콜라';
    vendingMachine.deleteProduct(productNameToDelete);

    expect(vendingMachine.products).not.toContainEqual(validProduct);
  });
});
