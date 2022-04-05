import VendingMachineProduct from '../VendingMachineProduct';
import VendingMachine from '../VendingMachine';
import { ERROR_MESSAGE, VENDING_MACHINE_RULES } from '../../constants';

describe('자판기 클래스 테스트', () => {
  let vendingMachine;
  let productId;
  const initialProduct = { name: '콜라', price: 2500, stock: 20 };

  beforeEach(() => {
    vendingMachine = new VendingMachine();
    productId = vendingMachine.addProduct(initialProduct);
  });

  describe('상품 추가 기능 테스트', () => {
    test('상품의 이름, 가격, 수량을 입력하면 새로운 상품을 상품목록에 추가한다.', () => {
      const vendingMachineProduct = new VendingMachineProduct(initialProduct);

      expect(vendingMachine.productList[productId]).toEqual(vendingMachineProduct);
    });

    test('동일한 이름의 상품을 추가하는 경우 오류가 발생한다.', () => {
      const invalidProduct = { name: '콜라', price: 2000, stock: 10 };

      expect(() => vendingMachine.addProduct(invalidProduct)).toThrow(
        ERROR_MESSAGE.DUPLICATE_PRODUCT_NAME
      );
    });
  });

  describe('상품 수정 기능 테스트', () => {
    test('상품의 이름을 수정할 수 있다.', () => {
      const newProductData = { name: '코카콜라', price: 2500, stock: 20 };
      vendingMachine.updateProduct(productId, newProductData);

      expect(vendingMachine.productList[productId].name).toBe('코카콜라');
    });

    test('상품의 가격을 수정할 수 있다.', () => {
      const newProductData = { name: '콜라', price: 1800, stock: 20 };
      vendingMachine.updateProduct(productId, newProductData);

      expect(vendingMachine.productList[productId].price).toBe(1800);
    });

    test('상품의 재고를 수정할 수 있다.', () => {
      const newProductData = { name: '콜라', price: 2500, stock: 10 };
      vendingMachine.updateProduct(productId, newProductData);

      expect(vendingMachine.productList[productId].stock).toBe(10);
    });

    test('상품의 복수 정보를 수정할 수 있다.', () => {
      const newProductData = { name: '사이다', price: 2500, stock: 10 };
      vendingMachine.updateProduct(productId, newProductData);

      expect(vendingMachine.productList[productId]).toEqual(
        new VendingMachineProduct(newProductData)
      );
    });

    test('상품목록에 없는 상품을 수정할 경우 오류가 발생한다.', () => {
      const newProductData = { name: '사이다', price: 2500, stock: 10 };
      const invalidId = 'invalidId';

      expect(() => vendingMachine.updateProduct(invalidId, newProductData)).toThrow(
        ERROR_MESSAGE.NOT_FOUND_PRODUCT_ID
      );
    });
  });

  describe('상품 삭제 기능 테스트', () => {
    test('특정 상품을 삭제할 수 있다.', () => {
      vendingMachine.removeProduct(productId);

      expect(vendingMachine.productList[productId]).toBeUndefined();
    });

    test('상품목록에 없는 상품을 삭제할 경우 오류가 발생한다.', () => {
      const invalidId = 'invalidId';

      expect(() => vendingMachine.removeProduct(invalidId)).toThrow(
        ERROR_MESSAGE.NOT_FOUND_PRODUCT_ID
      );
    });
  });

  describe('잔돈 충전 테스트', () => {
    test('잔돈을 충전할 수 있다.', () => {
      const inputMoney = 5000;

      vendingMachine.addChange(inputMoney);

      expect(vendingMachine.totalChange).toBe(inputMoney);
    });

    test('충전 금액이 0원 이하면 오류가 발생한다.', () => {
      const inputMoney = 0;

      expect(() => vendingMachine.addChange(inputMoney)).toThrow(
        ERROR_MESSAGE.BELOW_MIN_CHANGE
      );
    });

    test(`충전 금액이 ${VENDING_MACHINE_RULES.CHANGE_UNIT}원 단위가 아니면 오류가 발생한다.`, () => {
      const inputMoney = 1025;

      expect(() => vendingMachine.addChange(inputMoney)).toThrow(
        ERROR_MESSAGE.INVALID_UNIT_CHANGE
      );
    });

    test(`충전 금액이  ${VENDING_MACHINE_RULES.MAX_TOTAL_CHANGE}원을 초과하면 오류가 발생한다.`, () => {
      const inputMoney = 100010;

      expect(() => vendingMachine.addChange(inputMoney)).toThrow(
        ERROR_MESSAGE.EXCEED_MAX_TOTAL_CHANGE
      );
    });

    test(`충전 금액과 보유 금액의 합이 ${VENDING_MACHINE_RULES.MAX_TOTAL_CHANGE}원을 초과하면 오류가 발생한다.`, () => {
      const firstInputMoney = 50000;
      vendingMachine.addChange(firstInputMoney);

      const secondInputMoney = 50010;
      expect(() => vendingMachine.addChange(secondInputMoney)).toThrow(
        ERROR_MESSAGE.EXCEED_MAX_TOTAL_CHANGE
      );
    });
  });
});

describe('금액 투입 기능 테스트', () => {
  let vendingMachine;

  beforeEach(() => {
    vendingMachine = new VendingMachine();
  });

  test('최초 투입 금액은 0원이다.', () => {
    expect(vendingMachine.totalInsertMoney).toBe(0);
  });

  test('금액을 정상적으로 투입할 수 있다.', () => {
    const money = 10000;
    vendingMachine.insertMoney(money);

    expect(vendingMachine.totalInsertMoney).toBe(money);
  });

  test('투입 금액은 누적으로 투입할 수 있다.', () => {
    const firstMoney = 10000;
    vendingMachine.insertMoney(firstMoney);

    const secondMoney = 5000;
    vendingMachine.insertMoney(secondMoney);

    expect(vendingMachine.totalInsertMoney).toBe(firstMoney + secondMoney);
  });

  test('투입 금액이 0원 이하면 오류가 발생한다.', () => {
    const inValidMoney = 0;

    expect(() => vendingMachine.insertMoney(inValidMoney)).toThrow(
      '투입 금액은 0원 이하일 수 없습니다.'
    );
  });

  test('투입 금액이 10원 단위가 아니면 오류가 발생한다.', () => {
    const inValidMoney = 5025;

    expect(() => vendingMachine.insertMoney(inValidMoney)).toThrow(
      '투입 금액은 10원 단위이어야 합니다.'
    );
  });

  test('투입 금액이 10000원을 초과하면 오류가 발생한다.', () => {
    const inValidMoney = 11000;

    expect(() => vendingMachine.insertMoney(inValidMoney)).toThrow(
      '최대 투입 금액은 10000원을 초과할 수 없습니다.'
    );
  });
});

describe('상품 구매 기능 테스트', () => {
  let vendingMachine;
  let productId;
  let initInsertMoney = 3000;
  const initialProduct = { name: '콜라', price: 2500, stock: 20 };

  beforeEach(() => {
    vendingMachine = new VendingMachine();

    productId = vendingMachine.addProduct(initialProduct);
    vendingMachine.insertMoney(initInsertMoney);
  });

  test('상품을 정상 구매시, 투입한 금액은 구매 상품 가격만큼 차감된다.', () => {
    vendingMachine.purchaseProduct(productId);

    const { price } = vendingMachine.productList[productId];
    const insertMoney = initInsertMoney - price;

    expect(vendingMachine.totalInsertMoney).toBe(insertMoney);
  });

  test('상품을 정상 구매시, 구매 상품의 재고는 1만큼 차감된다.', () => {
    const { stock } = vendingMachine.productList[productId];

    vendingMachine.purchaseProduct(productId);

    expect(vendingMachine.productList[productId].stock).toBe(stock - 1);
  });

  test('투입한 금액보다 비싼 상품을 구매하면 에러가 발생한다.', () => {
    const newProduct = { name: '포켓몬빵', price: 5000, stock: 5 };

    const newProductId = vendingMachine.addProduct(newProduct);

    expect(() => vendingMachine.purchaseProduct(newProductId)).toThrow(
      '투입한 금액보다 비싼 상품은 구매할 수 없습니다.'
    );
  });

  test('재고가 0 이하인 상품을 구매하면 에러가 발생한다.', () => {
    const newProduct = { name: '포켓몬빵', price: 1000, stock: 1 };
    const newProductId = vendingMachine.addProduct(newProduct);

    vendingMachine.purchaseProduct(newProductId);

    expect(() => vendingMachine.purchaseProduct(newProductId)).toThrow(
      '해당 상품은 재고가 소진되어 구매할 수 없습니다.'
    );
  });
});

/**
 * TODO
 * [ ] 최초 반환된 각 동전의 개수는 0개이다.
 * [ ] 잔돈을 돌려줄 때는 현재 보유한 최소 개수의 동전으로 잔돈을 돌려준다.
 * [ ] 지폐를 잔돈으로 반환하는 경우는 없다고 가정한다.
 * [ ] 잔돈을 반환할 수 없는 경우 잔돈으로 반환할 수 있는 금액만 반환한다.
 
 */
