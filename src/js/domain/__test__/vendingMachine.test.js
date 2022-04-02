import VendingMachineProduct from '../VendingMachineProduct';
import VendingMachine from '../VendingMachine';
import { ERROR_MESSAGE, VENDING_MACHINE_RULES } from '../../constants';

describe('자판기 클래스 테스트', () => {
  let vendingMachine;
  let initialProduct;
  let productId;

  beforeEach(() => {
    vendingMachine = new VendingMachine();
    initialProduct = { name: '콜라', price: 2500, stock: 20 };
    productId = vendingMachine.addProduct(initialProduct);
  });

  describe('상품 추가 기능 테스트', () => {
    test('상품의 이름, 가격, 수량을 입력하면 새로운 상품을 상품목록에 추가한다.', () => {
      const mockVendingMachineProduct = new VendingMachineProduct(initialProduct);

      expect(vendingMachine.productList[productId]).toEqual(mockVendingMachineProduct);
    });

    test('동일한 이름의 상품을 추가하는 경우 오류가 발생한다.', () => {
      const invalidProduct = { name: '콜라', price: 2000, stock: 10 };

      expect(() => vendingMachine.addProduct(invalidProduct)).toThrow(
        ERROR_MESSAGE.PRODUCT_NAME.DUPLICATE_VALUE
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
        ERROR_MESSAGE.PRODUCT_ID_NOT_FOUND
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
        ERROR_MESSAGE.PRODUCT_ID_NOT_FOUND
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
        ERROR_MESSAGE.CHANGE.BELOW_MIN
      );
    });

    test(`충전 금액이 ${VENDING_MACHINE_RULES.CHANGE_UNIT}원 단위가 아니면 오류가 발생한다.`, () => {
      const inputMoney = 1025;

      expect(() => vendingMachine.addChange(inputMoney)).toThrow(
        ERROR_MESSAGE.CHANGE.INVALID_UNIT
      );
    });

    test(`충전 금액이  ${VENDING_MACHINE_RULES.MAX_TOTAL_CHANGE}원을 초과하면 오류가 발생한다.`, () => {
      const inputMoney = 100010;

      expect(() => vendingMachine.addChange(inputMoney)).toThrow(
        ERROR_MESSAGE.CHANGE.EXCEED_MAX_TOTAL
      );
    });

    test(`충전 금액과 보유 금액의 합이 ${VENDING_MACHINE_RULES.MAX_TOTAL_CHANGE}원을 초과하면 오류가 발생한다.`, () => {
      const firstInputMoney = 50000;
      vendingMachine.addChange(firstInputMoney);

      const secondInputMoney = 50010;
      expect(() => vendingMachine.addChange(secondInputMoney)).toThrow(
        ERROR_MESSAGE.CHANGE.EXCEED_MAX_TOTAL
      );
    });
  });

  describe('상품 구매 관련 기능 테스트', () => {
    describe('금액 투입 테스트', () => {
      test('금액을 투입하면 투입한 금액을 확인할 수 있다.', () => {
        const moneyInsertInput = 1000;
        vendingMachine.addMoneyInsert(moneyInsertInput);
        expect(vendingMachine.moneyInsert).toEqual(moneyInsertInput);
      });

      test('금액을 여러 번 투입하면 누적된 투입 금액을 확인할 수 있다.', () => {
        const firstMoneyInsertInput = 1000;
        vendingMachine.addMoneyInsert(firstMoneyInsertInput);

        const secondMoneyInsertInput = 2000;
        vendingMachine.addMoneyInsert(secondMoneyInsertInput);

        expect(vendingMachine.moneyInsert).toEqual(
          firstMoneyInsertInput + secondMoneyInsertInput
        );
      });

      test('투입 금액이 0원 이하면 오류가 발생한다.', () => {
        const moneyInsertInput = 0;

        expect(() => vendingMachine.addMoneyInsert(moneyInsertInput)).toThrow(
          ERROR_MESSAGE.MONEY_INSERT.BELOW_MIN
        );
      });

      test(`투입 금액이 ${VENDING_MACHINE_RULES.MONEY_INSERT_UNIT}원 단위가 아니면 오류가 발생한다.`, () => {
        const moneyInsertInput = 1025;

        expect(() => vendingMachine.addMoneyInsert(moneyInsertInput)).toThrow(
          ERROR_MESSAGE.MONEY_INSERT.INVALID_UNIT
        );
      });

      test(`충전 금액이  ${VENDING_MACHINE_RULES.MAX_TOTAL_MONEY_INSERT}원을 초과하면 오류가 발생한다.`, () => {
        const moneyInsertInput = 10010;

        expect(() => vendingMachine.addMoneyInsert(moneyInsertInput)).toThrow(
          ERROR_MESSAGE.MONEY_INSERT.EXCEED_MAX_TOTAL
        );
      });

      test(`충전 금액과 보유 금액의 합이 ${VENDING_MACHINE_RULES.MAX_TOTAL_CHANGE}원을 초과하면 오류가 발생한다.`, () => {
        const firstMoneyInsertInput = 5000;
        vendingMachine.addMoneyInsert(firstMoneyInsertInput);

        const secondMoneyInsertInput = 5010;
        expect(() => vendingMachine.addMoneyInsert(secondMoneyInsertInput)).toThrow(
          ERROR_MESSAGE.MONEY_INSERT.EXCEED_MAX_TOTAL
        );
      });
    });

    describe('상품 구매 테스트', () => {
      test('상품을 구매하면 해당 상품의 재고가 1만큼 감소한다.', () => {
        const moneyInsertInput = 2500;
        vendingMachine.addMoneyInsert(moneyInsertInput);

        const initialStock = vendingMachine.productList[productId].stock;

        vendingMachine.purchaseProduct(productId);

        expect(vendingMachine.productList[productId].stock).toEqual(initialStock - 1);
      });

      test('상품을 구매하면 투입된 금액이 해당 상품의 가격만큼 감소한다.', () => {
        const moneyInsertInput = 2500;
        vendingMachine.addMoneyInsert(moneyInsertInput);

        vendingMachine.purchaseProduct(productId);
        expect(vendingMachine.moneyInsert).toEqual(
          moneyInsertInput - vendingMachine.productList[productId].price
        );
      });

      test('재고가 1개인 상품을 구매하면 목록해서 상품이 삭제된다', () => {
        const product = { name: '아메리카노', price: 2500, stock: 1 };
        const id = vendingMachine.addProduct(product);
        const moneyInsertInput = 2500;
        vendingMachine.addMoneyInsert(moneyInsertInput);

        vendingMachine.purchaseProduct(id);

        expect(vendingMachine.productList[id]).toBeUndefined();
      });

      test('남은 투입 금액이 구매하려는 상품 가격보다 적은 경우 오류를 반환한다.', () => {
        const insufficientMoneyInsertInput = 2000;
        vendingMachine.addMoneyInsert(insufficientMoneyInsertInput);

        expect(() => vendingMachine.purchaseProduct(productId)).toThrow(
          ERROR_MESSAGE.PURCHASE.INSUFFICIENT_MONEY
        );
      });

      test('존재하지 않는 상품을 구매하면 오류를 반환한다.', () => {
        const moneyInsertInput = 2500;
        vendingMachine.addMoneyInsert(moneyInsertInput);
        const invalidId = 'invalid';

        expect(() => vendingMachine.purchaseProduct(invalidId)).toThrow(
          ERROR_MESSAGE.PRODUCT_ID_NOT_FOUND
        );
      });
    });

    describe('잔돈 반환 테스트', () => {
      test('잔돈을 반환하면 남은 투입 금액과 동일한 금액의 동전을 반환한다.', () => {
        const moneyInsertInput = 1000;
        vendingMachine.addMoneyInsert(moneyInsertInput);
        const { moneyInsert } = vendingMachine;

        const inputMoney = 5000;
        vendingMachine.addChange(inputMoney);

        const change = vendingMachine.returnChange();
        const totalChangeAmount = change.reduce(
          (totalReturn, { value, count }) => totalReturn + value * count,
          0
        );

        expect(totalChangeAmount).toEqual(moneyInsert);
      });

      test('잔돈을 모두 반환하면 투입 금액이 0이 된다.', () => {
        const inputMoney = 5000;
        vendingMachine.addChange(inputMoney);

        const moneyInsertInput = 1000;
        vendingMachine.addMoneyInsert(moneyInsertInput);

        vendingMachine.returnChange();

        expect(vendingMachine.moneyInsert).toEqual(0);
      });

      test('충전된 잔돈이 남은 투입 금액보다 적으면 남은 잔돈을 전부 반환한다.', () => {
        const moneyInsertInput = 3000;
        vendingMachine.addMoneyInsert(moneyInsertInput);

        const inputMoney = 1000;
        vendingMachine.addChange(inputMoney);

        const change = vendingMachine.returnChange();
        const totalChangeAmount = change.reduce(
          (totalReturn, { value, count }) => totalReturn + value * count,
          0
        );

        expect(totalChangeAmount).toEqual(inputMoney);
      });

      test('충전된 잔돈이 남은 투입 금액보다 적으면 반환 후 투입 금액이 반환 금액만큼 감소한다.', () => {
        const inputMoney = 2000;
        vendingMachine.addChange(inputMoney);

        const moneyInsertInput = 3000;
        vendingMachine.addMoneyInsert(moneyInsertInput);

        vendingMachine.returnChange();

        expect(vendingMachine.moneyInsert).toEqual(moneyInsertInput - inputMoney);
      });

      test('반환할 투입 금액이 없으면 오류를 반환한다.', () => {
        expect(() => vendingMachine.returnChange()).toThrow(
          ERROR_MESSAGE.RETURN_CHANGE.NO_MONEY_INSERT
        );
      });
    });
  });
});
