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

export interface ProductCollection {
  readonly products: Array<Product>;

  add(product: Product): void;
  modify(product: Product, originProductName: ProductName): void;
  delete(name: ProductName): void;
  getIndex(name: ProductName): number;
}

export interface CoinCollection {
  readonly coins: Array<Coin>;

  generateCoins(inputMoney: number): void;
  calculateTotalAmount(): number;
}

export interface VendingMachine {
  readonly productCollection: ProductCollection;
  readonly coinCollection: CoinCollection;
  totalUserInputMoney: number;

  addProduct(product: Product): void;
  modifyProduct(product: Product, originProductName: ProductName): void;
  deleteProduct(name: ProductName): void;
  chargeMoney(inputMoney: number): void;
  chargeUserMoney(userInputMoney: number): void;
}

export interface View {
  bindEvent(): void;
}

export interface DomainView extends View {
  render(): void;
}

export type TabName = 'productManage' | 'chargeMoney' | 'buyProduct';
