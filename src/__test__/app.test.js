import { ProductCatalog } from '../domain/ProductCatalog.ts';

test('상품명, 가격, 수량을 입력하여 물품을 등록할 수 있다.', () => {
  const productCatalog = new ProductCatalog();
  expect(productCatalog.productList).toHaveLength(0);

  productCatalog.addProduct('코카콜라', 1000, 20);

  expect(productCatalog.productList[0].getAllProperties()).toStrictEqual({
    name: '코카콜라',
    price: 1000,
    quantity: 20,
  });
});
