import { ERROR_MESSAGE } from '../constants';
import vendingMachine from '../model/VendingMachine'

describe('자판기 기본 기능 테스트', () => {

  describe('자판기 상품 추가 기능 테스트', () => {
    it('자판기에 상품을 추가할 수 있어야 한다.', () => {
      const product = {
        name: "코카콜라",
        price: 1000,
        amount: 5,
      }

      vendingMachine.addProduct(product);
      expect(vendingMachine.products.includes(product));
    });

    it('자판기에 같은 이름의 상품은 추가할 수 없어야 한다.', () => {
      const product1 = { name: "사이다", price: 1000, amount: 8 }
      const product2 = { name: "사이다", price: 2000, amount: 8 }

      vendingMachine.addProduct(product1);
      expect(() => vendingMachine.addProduct(product2)).toThrowError(ERROR_MESSAGE.PRODUCT_NAME_IS_DUPLICATED);
    });

    it('자판기에 추가 될 상품의 이름은 10글자를 초과할 수 없어야 한다.', () => {
      const product = {
        name: "코카콜라보다제로펩시가맛있다",
        price: 1000,
        amount: 5,
      }

      expect(() => vendingMachine.addProduct(product)).toThrowError(ERROR_MESSAGE.PRODUCT_NAME_LENGTH);
    });

    it('자판기에 추가 될 상품의 가격이 100원 미만은 에러를 발생시킨다.', () => {
      const product = {
        name: "펩시",
        price: 99,
        amount: 5,
      }

      expect(() => vendingMachine.addProduct(product)).toThrowError(ERROR_MESSAGE.PRODUCT_PRICE);
    });

    it('자판기에 추가 될 상품의 가격은 100원 이상이여야 한다.', () => {
      const product = {
        name: "펩시",
        price: 100,
        amount: 5,
      }

      expect(() => vendingMachine.addProduct(product)).not.toThrowError(ERROR_MESSAGE.PRODUCT_PRICE);
    });

    it('자판기에 추가 될 상품의 가격이 10,000원을 초과하면 에러를 발생시킨다.', () => {
      const product = {
        name: "제로펩시",
        price: 10001,
        amount: 5,
      }

      expect(() => vendingMachine.addProduct(product)).toThrowError(ERROR_MESSAGE.PRODUCT_PRICE);
    });

    it('자판기에 추가 될 상품의 가격은 10,000원 이하여야 한다.', () => {
      const product = {
        name: "제로펩시",
        price: 10000,
        amount: 5,
      }

      expect(() => vendingMachine.addProduct(product)).not.toThrowError(ERROR_MESSAGE.PRODUCT_PRICE);
    });

    it('자판기에 추가 될 상품의 수량이 20개를 초과하면 에러를 발생시킨다.', () => {
      const product = {
        name: "제로코카콜라",
        price: 1000,
        amount: 21,
      }

      expect(() => vendingMachine.addProduct(product)).toThrowError(ERROR_MESSAGE.PRODUCT_AMOUNT);
    });

    it('자판기에 추가 될 상품의 수량은 20개 이하여야 한다.', () => {
      const product = {
        name: "제로코카콜라",
        price: 1000,
        amount: 20,
      }

      expect(() => vendingMachine.addProduct(product)).not.toThrowError(ERROR_MESSAGE.PRODUCT_AMOUNT);
    });
  })
  
  describe('잔돈 충전 기능 테스트', () => {
    it('자판기가 가진 금액이 100,000원를 에러를 발생시킨다.', () => {
      const money = 100010;
      
      expect(() => vendingMachine.addChange(money)).toThrowError(ERROR_MESSAGE.TOO_MUCH_VENDING_MACHINE_CHANGE);
    });

    it('자판기가 가진 금액은 100,000원 이하여야 한다.', () => {
      const money = 100000;
      
      expect(() => vendingMachine.addChange(money)).not.toThrowError(ERROR_MESSAGE.TOO_MUCH_VENDING_MACHINE_CHANGE);
    });

    it('자판기에 충전할 금액이 양수가 아니면 에러를 발생시킨다.', () => {
      const money = -1000;
      expect(() => vendingMachine.addChange(money)).toThrowError(ERROR_MESSAGE.IS_NOT_POSITIVE_INTEGER);
    });

    it('자판기에 충전할 금액은 양수여야 한다.', () => {
      const money = 1000;
      expect(() => vendingMachine.addChange(money)).not.toThrowError(ERROR_MESSAGE.IS_NOT_POSITIVE_INTEGER);
    });

    it('자판기에 충전할 수 있는 금액이 10원으로 나누어 떨어지지 않으면 에럴르 발생시킨다.', () => {
      const money = 9;
      expect(() => vendingMachine.addChange(money)).toThrowError(ERROR_MESSAGE.IS_NOT_UNIT_OF_TEN);
    });

    it('자판기에 충전할 수 있는 금액은 10원으로 나누어 떨어지는 금액이어야 한다.', () => {
      const money = 10;
      expect(() => vendingMachine.addChange(money)).not.toThrowError(ERROR_MESSAGE.IS_NOT_UNIT_OF_TEN);
    });
  });
})
