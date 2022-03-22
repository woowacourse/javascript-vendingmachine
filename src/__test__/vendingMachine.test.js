import VendingMachine from '../vendingMachine/vendingMachine.ts';

describe('자판기 테스트', () => {
  test('상품명, 가격, 수량을 입력해 상품을 추가할 수 있다.', () => {
    const vendingMachine = new VendingMachine();

    const name = '환타';
    const price = 1200;
    const quantity = 15;

    vendingMachine.addItem({ name, price, quantity });

    expect(vendingMachine.getItems()).toEqual([{ name, price, quantity }]);
  });

  test('상품명, 가격, 수량을 입력해 상품의 정보를 수정할 수 있다.', () => {
    const vendingMachine = new VendingMachine();
    const name = '환타';
    const price = 1200;
    const quantity = 15;

    vendingMachine.addItem({ name, price, quantity });

    const changedName = '닥터페퍼';
    const changedPrice = 1500;
    const changedQuantity = 20;
    const index = 0;

    vendingMachine.changeItem(index, {
      name: changedName,
      price: changedPrice,
      quantity: changedQuantity,
    });

    expect(vendingMachine.getItems()).toEqual([
      { name: changedName, price: changedPrice, quantity: changedQuantity },
    ]);
  });
});
