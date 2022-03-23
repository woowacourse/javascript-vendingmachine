interface Product {
  name?: string,
  price?: number,
  quantity?: number,
}
interface Coin {
  amount?: number,
  count?: number,
}
interface VendingMachineResource {
  products?: Array<Product>,
  coins?: Array<Coin>,
}
interface ProductManage {
  isValidProductInfo(name: string, price: number, quantity: number): boolean;
  addProduct(name: string, price: number, quantity: number): void;
  modifyProduct(name: string, price: number, quantity: number): void;
  deleteProduct(name: string): void;
}
