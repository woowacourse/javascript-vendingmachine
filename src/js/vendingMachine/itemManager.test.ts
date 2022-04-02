import Item from './item';
import ItemManager from './itemManager';

describe('상품 이름, 가격, 수량이 주어질 때', () => {
  test('item을 생성하여 items 리스트에 추가할 수 있다.', () => {
    const itemManager = new ItemManager();
    const name = '콜라';
    const price = 1200;
    const quantity = 1;
    const item = new Item(name, price, quantity);

    itemManager.addItem({ name, price, quantity });

    expect(itemManager.items).toEqual([item]);
  });

  test('인덱스가 추가로 주어지면, 해당하는 아이템의 정보를 변경할 수 있다.', () => {
    const itemManager = new ItemManager();
    const name = '콜라';
    const price = 1200;
    const quantity = 1;

    itemManager.addItem({ name, price, quantity });

    const newName = '환타';
    const newPrice = 1000;
    const newQuantity = 6;
    const newItem = { name: newName, price: newPrice, quantity: newQuantity };

    itemManager.changeItem(0, newItem);

    expect({
      name: itemManager.items[0].name,
      price: itemManager.items[0].price,
      quantity: itemManager.items[0].quantity,
    }).toEqual(newItem);
  });

  test('해당하는 아이템을 리스트에서 삭제할 수 있다', () => {
    const itemManager = new ItemManager();
    const name = '콜라';
    const price = 1200;
    const quantity = 1;

    itemManager.addItem({ name, price, quantity });
    itemManager.deleteItem({ name, price, quantity });

    expect(itemManager.items).toEqual([]);
  });
});

describe('구매할 상품의 이름이 주어지면', () => {
  test('해당하는 상품을 반활할 수 있다.', () => {
    const itemManager = new ItemManager();
    const name = '콜라';
    const price = 1200;
    const quantity = 10;

    itemManager.addItem({ name, price, quantity });

    const targetItem = itemManager.getItemWithName(name);

    expect({
      name: targetItem.name,
      price: targetItem.price,
      quantity: targetItem.quantity,
    }).toEqual({ name, price, quantity });
  });

  test('해당하는 상품의 수량을 1만큼 감소시킬 수 있다.', () => {
    const itemManager = new ItemManager();
    const name = '콜라';
    const price = 1200;
    const quantity = 10;

    itemManager.addItem({ name, price, quantity });
    itemManager.purchaseItem(name);

    expect(itemManager.getItemWithName(name).quantity).toBe(quantity - 1);
  });
});
