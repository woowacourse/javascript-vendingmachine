import VendingMachine from '../ts/VendingMachine';

describe('상품 추가, 삭제, 수정 테스트', () => {
  const vendingMachine = new VendingMachine();
  beforeEach(() => {
    vendingMachine.addItem({ itemName: '콜라', itemPrice: 900, itemQuantity: 10 });
  });

  test('상품을 추가할 수 있다.', () => {
    vendingMachine.addItem({ itemName: '사이다', itemPrice: 1000, itemQuantity: 10 });

    expect(vendingMachine.itemList.length).toBe(2);
  });

  test('상품을 삭제할 수 있다.', () => {
    const itemName = '콜라';
    vendingMachine.deleteItem(itemName);

    expect(vendingMachine.itemList.length).toBe(1);
  });

  test('상품을 수정할 수 있다.', () => {
    const itemIndex = 0;
    const itemInfo = {
      itemName: '콜라',
      itemPrice: 900,
      itemQuantity: 10,
    };
    vendingMachine.editItem(itemInfo, itemIndex);

    expect(vendingMachine.itemList[itemIndex]).toEqual({
      itemName: '콜라',
      itemPrice: 900,
      itemQuantity: 10,
    });
  });
});
