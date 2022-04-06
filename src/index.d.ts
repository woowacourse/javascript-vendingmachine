export interface Product {
  name: string;
  price: number;
  quantity: number;
}

export type ProductName = Pick<Product, 'name'>;

export interface Coin {
  amount: number;
  count: number;
}

export interface VendingMachine {
  products: Array<Product>;
  coins: Array<Coin>;

  addProduct(product: Product): void;
  modifyProduct(product: Product, originProductName: ProductName): void;
  deleteProduct(name: ProductName): void;
  getProductIndex(name: ProductName): number;

  generateCoins(inputMoney: number): void;
  calculateTotalAmount(): number;

  initialize(): void;
}

export interface Admin {
  readonly vendingMachine: VendingMachine;
  
  addProduct(product: Product): void;
  modifyProduct(product: Product, originProductName: ProductName): void;
  deleteProduct(name: ProductName): void;
  chargeMoney(inputMoney: number): void;
}

export interface Buyer {
  readonly vendingMachine: VendingMachine;
  totalInputMoney: number;

  chargeMoney(inputMoney: number): void;
  buyProduct(name: ProductName): void;
  receiveChangeCoins(): Object;
}

export interface View {
  bindEvent(): void;
}

export interface DomainView extends View {
  render(): void;
}

export type TabName = 'productManage' | 'chargeMoney' | 'buyProduct';
