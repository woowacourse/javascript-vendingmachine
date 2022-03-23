import Product from '../domains/product';

describe('Product 작동 테스트', () => {
  test('상품의 아이디 값이 부여 되는지 확인한다', () => {
    const productName = '콜라';
    const productPrice = 1500;
    const productQunatity = 20;

    const product = new Product(productName, productPrice, productQunatity);

    const { id } = product.getProductInfo();
    expect(id !== undefined).toBe(true);
  });
  test('상품의 정보를 수정할 수 있는지 확인한다', () => {
    const productName = '콜라';
    const productPrice = 1500;
    const productQuantity = 20;

    const product = new Product(productName, productPrice, productQuantity);

    const edittedName = '사이다';
    product.editProductInfo({ name: edittedName, price: productPrice, quantity: productQuantity });

    const { name } = product.getProductInfo();
    expect(name === edittedName).toBe(true);
  });
  test('상품 구매시 수량이 0일경우 에러를 반환한다', () => {
    const productName = '콜라';
    const productPrice = 1500;
    const productQuantity = 0;

    const product = new Product(productName, productPrice, productQuantity);

    expect(() => product.purchaseProduct()).toThrow();
  });
});
