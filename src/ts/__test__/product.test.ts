import ProductManagementDomain from '../domain/ProductManagement';

describe('상품 도메인 테스트', () => {
  const productManagementDomain = new ProductManagementDomain();
  const clearProducts = () => {
    productManagementDomain.products.forEach(product =>
      productManagementDomain.deleteProduct(product.name),
    );
  };
  const product = { name: '콜라', price: 1000, quantity: 10 };

  beforeEach(() => {
    clearProducts();
  });

  it('상품 정보를 추가할 수 있다.', () => {
    productManagementDomain.addProduct(product);
    expect(productManagementDomain.products[0].getProduct()).toMatchObject(
      product,
    );
  });

  it('상품 정보를 수정할 수 있다.', () => {
    productManagementDomain.addProduct(product);
    const newProduct = { name: '사이다', price: 800, quantity: 15 };
    const prevProductName = product.name;

    productManagementDomain.editProduct(prevProductName, newProduct);

    expect(productManagementDomain.products[0].getProduct()).toMatchObject(
      newProduct,
    );
  });

  it('상품 정보를 삭제할 수 있다.', () => {
    productManagementDomain.addProduct(product);

    productManagementDomain.deleteProduct(product.name);
    expect(productManagementDomain.products).toHaveLength(0);
  });
});
