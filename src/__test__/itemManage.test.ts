import ItemManage from '../ts/vendingMachine/ItemManage';

describe('상품 추가, 삭제, 수정 테스트', () => {
  const vendingMachine = new ItemManage();
  beforeEach(() => {
    vendingMachine.addItem({ itemName: '콜라', itemPrice: 900, itemQuantity: 10 });
  });

  test('상품을 추가하면 자판기 상품 목록(vendingMachine.itemList)에 상품이 추가된다.', () => {
    vendingMachine.addItem({ itemName: '사이다', itemPrice: 1000, itemQuantity: 10 });

    expect(vendingMachine.itemList.length).toBe(2);
  });

  test('상품을 삭제하면 자판기 상품 목록(vendingMachine.itemList)에서 상품이 삭제된다.', () => {
    const itemName = '콜라';
    vendingMachine.deleteItem(itemName);

    expect(vendingMachine.itemList.length).toBe(1);
  });

  test('상품을 수정하면 자판기 상품 목록(vendingMachine.itemList)에서 해당 상품 정보가 변경된다.', () => {
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
