import VendingMachine from '../ts/VendingMachine';

describe('상품 추가, 삭제, 수정 테스트', () => {
  const vendingMachine = new VendingMachine();
  beforeEach(() => {
    vendingMachine.addItem('콜라', 900, 10);
  });

  test('상품을 추가할 수 있다.', () => {
    vendingMachine.addItem('사이다', 1000, 10);

    expect(vendingMachine.itemList.length).toBe(2);
  });

  test('상품을 삭제할 수 있다.', () => {
    const itemName = '콜라';
    vendingMachine.deleteItem(itemName);

    expect(vendingMachine.itemList.length).toBe(1);
  });

  test('상품을 수정할 수 있다.', () => {
    const itemIndex = 0;
    vendingMachine.editItem('콜라', 900, 10, itemIndex);

    expect(vendingMachine.itemList[itemIndex]).toEqual({
      itemName: '콜라',
      itemPrice: 900,
      itemQuantity: 10,
    });
  });
});
