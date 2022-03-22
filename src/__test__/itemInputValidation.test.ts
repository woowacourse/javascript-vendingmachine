const validateItemInput = (itemName: string, itemPrice: number, itemQuantity: number) => {
  if(!itemName || !itemPrice || !itemQuantity) {
    throw new Error('빈칸 없이 모두 입력해주세요.');
  }

  if (itemName.length > 10) {
    throw new Error('상품명은 최대 10글자까지 가능합니다.');
  }

  if (itemPrice < 100 || itemPrice > 10000) {
    throw new Error('상품 가격은 100원 이상, 10,000원 이하여야 합니다.');
  }

  if (itemPrice % 10 !== 0) {
    throw new Error('상품 가격은 10원으로 나누어 떨어져야 합니다.');
  }

  if (itemQuantity < 1 || itemQuantity > 20) {
    throw new Error('상품 수량은 최대 20개까지 넣을 수 있습니다.');
  }
}

describe("상품 추가할 때, 입력값 유효성 확인", () => {
  test("입력값은 공백이 아니어야 한다.", () => {
    const itemName = '';
    const itemPrice = 1000;
    const itemQuantity = 20;

    expect(() => validateItemInput(itemName, itemPrice, itemQuantity)).toThrow('빈칸 없이 모두 입력해주세요.');
  })

  test("상품명은 최대 10글자까지 가능하다.", () => {
    const itemName = 'asdfasdfasdf';
    const itemPrice = 1000;
    const itemQuantity = 10;

    expect(() => validateItemInput(itemName, itemPrice, itemQuantity)).toThrow('상품명은 최대 10글자까지 가능합니다.');
  });

  test("상품 가격은 100원 이상이어야 한다.", () => {
    const itemName = 'asdfasdf';
    const itemPrice = 99;
    const itemQuantity = 10;

    expect(() => validateItemInput(itemName, itemPrice, itemQuantity)).toThrow('상품 가격은 100원 이상, 10,000원 이하여야 합니다.');
  })

  test("상품 가격은 10,000원 이하이어야 한다.", () => {
    const itemName = 'asdfasdf';
    const itemPrice = 10001;
    const itemQuantity = 10;

    expect(() => validateItemInput(itemName, itemPrice, itemQuantity)).toThrow('상품 가격은 100원 이상, 10,000원 이하여야 합니다.');
  })

  test("상품 가격은 100원 이상, 10,000원 이하여야 한다.", () => {
    const itemName = 'asdfasdf';
    const itemPrice = 10000;
    const itemQuantity = 10;

    expect(() => validateItemInput(itemName, itemPrice, itemQuantity)).not.toThrow();
  })

  test("10원으로 나누어 떨어져야 한다.", () => {
    const itemName = 'asdfasdf';
    const itemPrice = 1001;
    const itemQuantity = 10;

    expect(() => validateItemInput(itemName, itemPrice, itemQuantity)).toThrow('상품 가격은 10원으로 나누어 떨어져야 합니다.');
  });

  test("한 제품당 수량은 최대 20개까지 넣을 수 있다.", () => {
    const itemName = 'asdfasdf';
    const itemPrice = 1000;
    const itemQuantity = 21;

    expect(() => validateItemInput(itemName, itemPrice, itemQuantity)).toThrow('상품 수량은 최대 20개까지 넣을 수 있습니다.');
  });
})

