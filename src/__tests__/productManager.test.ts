import VendingMachineProductManager, {
  product,
} from '../ts/VendingMachineProductManager';

test('최초 상품 목록은 비워진 상태이다.', () => {
  const vendingMachineProductManager = new VendingMachineProductManager();

  expect(vendingMachineProductManager.getProducts().length).toBe(0);
});

test('관리자는 상품을 추가 할 수 있다.', () => {
  const vendingMachineProductManager = new VendingMachineProductManager();
  const newProduct: product = {
    name: '콜라',
    price: 1500,
    quantity: 20,
  };

  vendingMachineProductManager.addProduct(newProduct);
  expect(vendingMachineProductManager.getProducts()[0]).toBe(newProduct);
});

test('관리자는 추가한 상품을 삭제 할 수 있다.', () => {
  const vendingMachineProductManager = new VendingMachineProductManager();
  const newProducts: product[] = [
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

  const deleteProductName = '콜라';

  newProducts.forEach((product) =>
    vendingMachineProductManager.addProduct(product)
  );
  vendingMachineProductManager.deleteProduct(deleteProductName);

  expect(
    vendingMachineProductManager
      .getProducts()
      .some((product) => product.name === deleteProductName)
  ).toBe(false);
});

test('관리자는 추가한 상품을 수정 할 수 있다.', () => {
  const vendingMachineProductManager = new VendingMachineProductManager();
  const newProduct: product = {
    name: '콜라',
    price: 1500,
    quantity: 20,
  };

  const targetProductName: string = '콜라';
  const targetProduct: product = {
    name: '사이다',
    price: 1000,
    quantity: 10,
  };

  vendingMachineProductManager.addProduct(newProduct);
  vendingMachineProductManager.editProduct(targetProductName, targetProduct);
  const { name, price, quantity } =
    vendingMachineProductManager.getProducts()[0];

  expect(name === '사이다' && price === 1000 && quantity === 10).toBe(true);
});
