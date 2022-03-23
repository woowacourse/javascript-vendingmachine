/* eslint-disable max-lines-per-function */
import VendingMachineProduct from '../VendingMachineProduct';
import VendingMachine from '../VendingMachine';
import { ERROR_MESSAGE } from '../../constants';

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
      const mockVendingMachineProduct = new VendingMachineProduct(
        initialProduct
      );

      expect(vendingMachine.productList[productId]).toEqual(
        mockVendingMachineProduct
      );
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

      expect(() =>
        vendingMachine.updateProduct(invalidId, newProductData)
      ).toThrow(ERROR_MESSAGE.NOT_FOUND_PRODUCT_ID);
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
});
