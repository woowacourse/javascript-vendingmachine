import { Product } from '../ts/types/vendingMachineProductManager';

import VendingMachineProductManager from '../ts/domains/VendingMachineProductManager';

describe('상품 관리 도메인 테스트', () => {
  const newProduct: Product = {
    name: '콜라',
    price: 1500,
    quantity: 20,
  };
  const targetProductName = '콜라';

  test('최초 상품 목록은 비워진 상태이다.', () => {
    const vendingMachineProductManager = new VendingMachineProductManager();

    expect(vendingMachineProductManager.getProducts().length).toBe(0);
  });

  test('상품을 추가 할 수 있다.', () => {
    const vendingMachineProductManager = new VendingMachineProductManager();

    vendingMachineProductManager.addProduct(newProduct);
    expect(vendingMachineProductManager.getProducts()[0]).toBe(newProduct);
  });

  test('추가한 상품을 삭제 할 수 있다.', () => {
    const vendingMachineProductManager = new VendingMachineProductManager();
    const newProducts: Product[] = [
      {
        name: '콜라',
        price: 1500,
        quantity: 20,
      },
      {
        name: '사이다',
        price: 1000,
        quantity: 10,
      },
      { name: '물', price: 500, quantity: 20 },
    ];

    newProducts.forEach((product) =>
      vendingMachineProductManager.addProduct(product)
    );
    vendingMachineProductManager.deleteProduct(targetProductName);

    expect(
      vendingMachineProductManager
        .getProducts()
        .some((product) => product.name === targetProductName)
    ).toBe(false);
  });

  test('추가한 상품을 수정 할 수 있다.', () => {
    const vendingMachineProductManager = new VendingMachineProductManager();
    const targetProduct: Product = {
      name: '사이다',
      price: 1000,
      quantity: 10,
    };

    vendingMachineProductManager.addProduct(newProduct);
    vendingMachineProductManager.editProduct(targetProduct);

    const { name, price, quantity } =
      vendingMachineProductManager.getProducts()[0];

    expect(name === '사이다' && price === 1000 && quantity === 10).toBe(true);
  });
});
