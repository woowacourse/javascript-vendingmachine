import { ProductCatalog } from '../domain/ProductCatalog.ts';
import { Product } from '../domain/Product.ts';

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

test('상품을 수정할 수 있다.', () => {
  const product = new Product('코카콜라', 1000, 20);

  product.setName('펩시');
  product.setPrice(500);
  product.setQuantity(10);

  expect(product.getAllProperties()).toStrictEqual({
    name: '펩시',
    price: 500,
    quantity: 10,
  });
});

test('상품을 삭제할 수 있다', () => {
  const productCatalog = new ProductCatalog();
  expect(productCatalog.productList).toHaveLength(0);

  productCatalog.addProduct('코카콜라', 1000, 20);
  productCatalog.deleteProductByName('코카콜라');

  expect(productCatalog.productList).toHaveLength(0);
});
