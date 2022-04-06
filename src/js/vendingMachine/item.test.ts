import Item from './item';

test('상품 이름, 가격, 수량으로 item을 생성할 수 있다.', () => {
  const name = '콜라';
  const price = 1200;
  const quantity = 1;
  const id = 0;

  const item = new Item(name, price, quantity, id);

  expect({ name: item.name, price: item.price, quantity: item.quantity }).toEqual({
    name,
    price,
    quantity,
  });
});
