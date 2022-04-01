import { ERROR_MESSAGE } from '../constants';
import vendingMachine from '../model/VendingMachine';

describe('자판기 기본 기능 테스트', () => {
  describe('자판기 상품 추가 기능 테스트', () => {
    it('자판기에 상품을 추가할 수 있어야 한다.', () => {
      const product = {
        name: '코카콜라',
        price: 1000,
        amount: 5,
      };

      vendingMachine.addProduct(product);
      expect(vendingMachine.products.includes(product));
    });

    it('자판기에 같은 이름의 상품을 추가하려고 하면, 오류를 발생시킨다.', () => {
      const product = {
        name: '코카콜라',
        price: 2000,
        amount: 8,
      };

      expect(() => vendingMachine.addProduct(product)).toThrowError(ERROR_MESSAGE.PRODUCT_NAME_IS_DUPLICATED);
    });

    it('자판기에 추가 될 상품의 이름이 10글자를 초과하면, 오류를 발생시킨다.', () => {
      const product = {
        name: '코카콜라보다제로펩시가맛있다',
        price: 1000,
        amount: 5,
      };

      expect(() => vendingMachine.addProduct(product)).toThrowError(ERROR_MESSAGE.PRODUCT_NAME_LENGTH);
    });

    it('자판기에 추가 될 상품의 가격이 100원을 넘지 않으면, 오류를 발생시킨다.', () => {
      const product = {
        name: '펩시',
        price: 99,
        amount: 5,
      };

      expect(() => vendingMachine.addProduct(product)).toThrowError(ERROR_MESSAGE.PRODUCT_PRICE);
    });

    it('자판기에 추가 될 상품의 가격이 10,000원이 넘으면, 오류를 발생시킨다.', () => {
      const product = {
        name: '제로펩시',
        price: 10001,
        amount: 5,
      };

      expect(() => vendingMachine.addProduct(product)).toThrowError(ERROR_MESSAGE.PRODUCT_PRICE);
    });

    it('자판기에 추가 될 상품의 수량이 20개가 넘으면, 오류를 발생시킨다.', () => {
      const product = {
        name: '제로코카콜라',
        price: 1000,
        amount: 21,
      };

      expect(() => vendingMachine.addProduct(product)).toThrowError(ERROR_MESSAGE.PRODUCT_AMOUNT);
    });
  });

  describe('잔돈 충전 기능 테스트', () => {
    it('자판기가 가진 총 금액이 100,000원을 넘으면, 오류를 발생시킨다.', () => {
      const money = 100010;
      expect(() => vendingMachine.inputChanges(money)).toThrowError(ERROR_MESSAGE.TOO_MUCH_VENDING_MACHINE_CHANGE);
    });

    it('자판기에 충전하려는 금액이 0원을 넘지 못하면, 오류를 발생시킨다.', () => {
      const money = 0;
      expect(() => vendingMachine.inputChanges(money)).toThrowError(ERROR_MESSAGE.IS_NOT_POSITIVE_INTEGER);
    });

    it('자판기에 충전하려는 금액이 10원으로 나누어 떨어지지 않으면, 오류를 발생시킨다.', () => {
      const money = 9;
      expect(() => vendingMachine.inputChanges(money)).toThrowError(ERROR_MESSAGE.IS_NOT_UNIT_OF_TEN);
    });
  });

  describe('상품 구매 페이지 기능 테스트', () => {
    it('자판기에 투입된 총 금액이 10,000원을 넘으면, 오류를 발생시킨다.', () => {
      const money = 10010;
      expect(() => vendingMachine.inputUserMoney(money)).toThrowError(
        ERROR_MESSAGE.TOO_MUCH_VENDING_MACHINE_INPUT_MONEY,
      );
    });
    it('자판기에 투입하려는 금액이 0원을 넘지 못하면, 오류를 발생시킨다.', () => {
      const money = 0;
      expect(() => vendingMachine.inputUserMoney(money)).toThrowError(ERROR_MESSAGE.IS_NOT_POSITIVE_INTEGER);
    });

    it('자판기에 투입하려는 금액이 10원으로 나누어 떨어지지 않으면, 오류를 발생시킨다.', () => {
      const money = 9;
      expect(() => vendingMachine.inputUserMoney(money)).toThrowError(ERROR_MESSAGE.IS_NOT_UNIT_OF_TEN);
    });
  });
});
