import Product from './Product';
import VendingMachine from './VendingMachine';

describe('자판기 테스트', () => {
  const vendingMachine = new VendingMachine();

  it('상품을 자판기에 추가할 수 있다.', () => {
    const validProduct = new Product({ name: '코카콜라', price: 1000, quantity: 10 });
    vendingMachine.addProduct(validProduct);

    expect(vendingMachine.products).toContainEqual(validProduct);
  });
});
