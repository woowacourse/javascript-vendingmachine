import { ERROR_MESSAGE } from '../constants';
import VendingMachine from '../model/VendingMachine'



describe('자판기 기본 기능 테스트', () => {
  describe('자판기 상품 추가 기능 테스트', () => {
    const vendingMachine = new VendingMachine();

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
      const product = {
        name: "코카콜라",
        price: 1000,
        amount: 5,
      }

      expect(() => vendingMachine.addProduct(product)).toThrowError(ERROR_MESSAGE.PRODUCT_NAME_IS_DUPLICATED);
    });

    it('자판기에 추가 될 상품의 이름은 10글자를 초과할 수 없어야 한다.', () => {
      const product = {
        name: "코카콜라보다제로펩시가맛있다",
        price: 1000,
        amount: 5,
      }

      expect(() => vendingMachine.addProduct(product)).toThrowError(ERROR_MESSAGE.PRODUCT_NAME_LENGTH);
    });

    it('자판기에 추가 될 상품의 가격은 100원 이상이어야 한다.', () => {
      const product = {
        name: "펩시",
        price: 99,
        amount: 5,
      }

      expect(() => vendingMachine.addProduct(product)).toThrowError(ERROR_MESSAGE.PRODUCT_PRICE);
    });

    it('자판기에 추가 될 상품의 가격은 10,000원 이하여야 한다.', () => {
      const product = {
        name: "제로펩시",
        price: 10001,
        amount: 5,
      }

      expect(() => vendingMachine.addProduct(product)).toThrowError(ERROR_MESSAGE.PRODUCT_PRICE);
    });

    it('자판기에 추가 될 상품의 수량은 20개 이하여야 한다.', () => {
      const product = {
        name: "제로코카콜라",
        price: 1000,
        amount: 21,
      }

      expect(() => vendingMachine.addProduct(product)).toThrowError(ERROR_MESSAGE.PRODUCT_AMOUNT);
    });
  })
})




