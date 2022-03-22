import VendingMachine from '../ts/VendingMachine';

describe('상품 추가할 때, 입력값 유효성 확인', () => {
  const vendingMachine = new VendingMachine();

  test('입력값은 공백이 아니어야 한다.', () => {
    const itemName = '';
    const itemPrice = 1000;
    const itemQuantity = 20;

    expect(() => vendingMachine.validateItemInput(itemName, itemPrice, itemQuantity)).toThrow(
      '빈칸 없이 모두 입력해주세요.'
    );
  });

  test('상품명은 최대 10글자까지 가능하다.', () => {
    const itemName = 'asdfasdfasdf';
    const itemPrice = 1000;
    const itemQuantity = 10;

    expect(() => vendingMachine.validateItemInput(itemName, itemPrice, itemQuantity)).toThrow(
      '상품명은 최대 10글자까지 가능합니다.'
    );
  });

  test('상품 가격은 100원 이상이어야 한다.', () => {
    const itemName = 'asdfasdf';
    const itemPrice = 99;
    const itemQuantity = 10;

    expect(() => vendingMachine.validateItemInput(itemName, itemPrice, itemQuantity)).toThrow(
      '상품 가격은 100원 이상, 10,000원 이하여야 합니다.'
    );
  });

  test('상품 가격은 10,000원 이하이어야 한다.', () => {
    const itemName = 'asdfasdf';
    const itemPrice = 10001;
    const itemQuantity = 10;

    expect(() => vendingMachine.validateItemInput(itemName, itemPrice, itemQuantity)).toThrow(
      '상품 가격은 100원 이상, 10,000원 이하여야 합니다.'
    );
  });

  test('상품 가격은 100원 이상, 10,000원 이하여야 한다.', () => {
    const itemName = 'asdfasdf';
    const itemPrice = 10000;
    const itemQuantity = 10;

    expect(() => vendingMachine.validateItemInput(itemName, itemPrice, itemQuantity)).not.toThrow();
  });

  test('10원으로 나누어 떨어져야 한다.', () => {
    const itemName = 'asdfasdf';
    const itemPrice = 1001;
    const itemQuantity = 10;

    expect(() => vendingMachine.validateItemInput(itemName, itemPrice, itemQuantity)).toThrow(
      '상품 가격은 10원으로 나누어 떨어져야 합니다.'
    );
  });

  test('한 제품당 수량은 최대 20개까지 넣을 수 있다.', () => {
    const itemName = 'asdfasdf';
    const itemPrice = 1000;
    const itemQuantity = 21;

    expect(() => vendingMachine.validateItemInput(itemName, itemPrice, itemQuantity)).toThrow(
      '상품 수량은 최대 20개까지 넣을 수 있습니다.'
    );
  });
});
