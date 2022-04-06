import ProductManageTab from '../core/ProductManageTab';
import VerifyValueValidation from '../validations/verifyValueValidation';
import { getProductIndex } from '../utils/productUtil';

describe('productManage', () => {
  const product = [];
  const verifyValue = new VerifyValueValidation(product);
  const productManage = new ProductManageTab(product);
  // 상품 추가
  test('상품이름이 1글자 미만일 때, 상품이 추가되지 않는지 확인', () => {
    const productInfo = { name: '', price: 1000, quantity: 10 };
    expect(verifyValue.isValidProductNameRange(productInfo.name)).toBe(false);
  });

  test('상품이름이 10글자 초과일 때, 상품이 추가되지 않는지 확인', () => {
    const productInfo = {
      name: '아상품명길게해야되는데뭘로하지모르겠네',
      price: 1000,
      quantity: 10,
    };
    expect(verifyValue.isValidProductNameRange(productInfo.name)).toBe(false);
  });

  test('상품이름에 중복된 이름일 때, 상품이 추가되지 않는지 확인', () => {
    const productInfo = { name: '아메리카노', price: 1000, quantity: 10 };
    productManage.addProduct({ name: '아메리카노', price: 1100, quantity: 11 });
    expect(verifyValue.isOverlapProductName(productInfo.name, 1)).toBe(true);
  });

  test('상품가격이 10000원 초과일 때, 상품이 추가되지 않는지 확인', () => {
    const productInfo = { name: '아메리카노', price: 100000, quantity: 10 };
    expect(verifyValue.isValidProductPrice(productInfo.price)).toBe(false);
  });

  test('상품가격이 100원 미만일 때, 상품이 추가되지 않는지 확인', () => {
    const productInfo = { name: '아메리카노', price: 10, quantity: 10 };
    expect(verifyValue.isValidProductPrice(productInfo.price)).toBe(false);
  });

  test('상품가격이 10으로 나누어 떨어지지 않을 때, 상품이 추가되지 않는지 확인', () => {
    const productInfo = { name: '아메리카노', price: 1004, quantity: 10 };
    expect(verifyValue.isValidProductPrice(productInfo.price)).toBe(false);
  });

  test('상품수량이 1개 미만일 때, 상품이 추가되지 않는지 확인', () => {
    const productInfo = { name: '아메리카노', price: 4300, quantity: 0 };
    expect(verifyValue.isValidProductQuantity(productInfo.quantity)).toBe(false);
  });

  test('상품수량이 20개 초과일 때, 상품이 추가되지 않는지 확인', () => {
    const productInfo = { name: '아메리카노', price: 4300, quantity: 30 };
    expect(verifyValue.isValidProductQuantity(productInfo.quantity)).toBe(false);
  });

  test('상품정보가 올바르게 입력되었을 때, 상품이 추가되는지 확인', () => {
    const productInfo = { name: '카페라떼', price: 4800, quantity: 10 };
    expect(verifyValue.verifyProductInfo(productInfo, 1)).toBe(true);
  });

  // 상품 수정
  test('상품이름이 1글자 미만일 때, 상품이 수정되지 않는지 확인', () => {
    const productInfo = { name: '', price: 4800, quantity: 10 };
    expect(verifyValue.isValidProductNameRange(productInfo.name)).toBe(false);
  });

  test('상품이름이 10글자 초과일 때, 상품이 수정되지 않는지 확인', () => {
    const productInfo = {
      name: '자바칩 프라푸치노에 샷 추가에 휘핑크림 많이',
      price: 4800,
      quantity: 10,
    };
    expect(verifyValue.isValidProductNameRange(productInfo.name)).toBe(false);
  });

  test('상품이름이 중복된 이름일 때, 상품이 수정되지 않는지 확인', () => {
    const productInfo = { name: '카페라떼', price: 4800, quantity: 10 };
    productManage.addProduct({ name: '카페라떼', price: 1100, quantity: 11 });
    expect(verifyValue.isOverlapProductName(productInfo.name)).toBe(true);
  });

  test('상품가격이 100원이 미만일 때, 상품이 수정되지 않는지 확인', () => {
    const productInfo = { name: '바닐라더블샷', price: 80, quantity: 10 };
    expect(verifyValue.isValidProductPrice(productInfo.price)).toBe(false);
  });

  test('상품가격이 10000원 초과일 때, 상품이 수정되지 않는지 확인', () => {
    const productInfo = { name: '바닐라더블샷', price: 14800, quantity: 10 };
    expect(verifyValue.isValidProductPrice(productInfo.price)).toBe(false);
  });

  test('상품가격이 10으로 나누어 떨어지지 않을 때, 상품이 수정되지 않는지 확인', () => {
    const productInfo = { name: '바닐라더블샷', price: 1804, quantity: 10 };
    expect(verifyValue.isValidProductPrice(productInfo.price)).toBe(false);
  });

  test('상품수량이 1개가 미만일 때, 상품이 수정되지 않는지 확인', () => {
    const productInfo = { name: '바닐라더블샷', price: 14800, quantity: 0 };
    expect(verifyValue.isValidProductQuantity(productInfo.quantity)).toBe(false);
  });

  test('상품수량이 20개 초과일 때, 상품이 수정되지 않는지 확인', () => {
    const productInfo = { name: '바닐라더블샷', price: 14800, quantity: 21 };
    expect(verifyValue.isValidProductQuantity(productInfo.quantity)).toBe(false);
  });

  test('상품정보가 올바르게 입력되었을 때, 상품이 수정되는지 확인', () => {
    const productInfo = { name: '바닐라더블샷', price: 4800, quantity: 15 };
    expect(verifyValue.verifyProductInfo(productInfo, 0)).toBe(true);
  });

  test('상품이 올바르게 삭제되는지 확인', () => {
    productManage.deleteProduct('아메리카노');
    expect(getProductIndex.call(productManage, '아메리카노')).toBe(-1);
  });
});
