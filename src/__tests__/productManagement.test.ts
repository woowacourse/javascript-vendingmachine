import VendingMachineProductManagement, {
  product,
} from '../VendingMachineProductManagement';

test('최초 상품 목록은 비워진 상태이다.', () => {
  const vendingMachineProductManagement = new VendingMachineProductManagement();

  expect(vendingMachineProductManagement.getProducts().length).toBe(0);
});

test('관리자는 추가한 상품을 추가 할 수 있다.', () => {
  const vendingMachineProductManagement = new VendingMachineProductManagement();
  const newProduct: product = {
    name: '콜라',
    price: 1500,
    quantity: 20,
  };

  vendingMachineProductManagement.addProduct(newProduct);
  expect(vendingMachineProductManagement.getProducts()[0]).toBe(newProduct);
});

test('관리자는 추가한 상품을 삭제 할 수 있다.', () => {
  const vendingMachineProductManagement = new VendingMachineProductManagement();
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
    vendingMachineProductManagement.addProduct(product)
  );
  vendingMachineProductManagement.deleteProduct(deleteProductName);

  expect(
    vendingMachineProductManagement
      .getProducts()
      .some((product) => product.name === deleteProductName)
  ).toBe(false);
});

test('관리자는 추가한 상품을 수정 할 수 있다.', () => {
  const vendingMachineProductManagement = new VendingMachineProductManagement();
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

  vendingMachineProductManagement.addProduct(newProduct);
  vendingMachineProductManagement.editProduct(targetProductName, targetProduct);
  const { name, price, quantity } =
    vendingMachineProductManagement.getProducts()[0];
  expect(name === '사이다' && price === 1000 && quantity === 10).toBe(true);
});
