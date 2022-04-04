export interface Product {
  name: string;
  price: number;
  quantity: number;
}

export interface Coin {
  amount: number;
  count: number;
}

export interface ProductCollection {
  readonly products: Array<Product>;

  add(product: Product): void;
  modify(product: Product, originProductName: string): void;
  delete(name: string): void;
  getIndex(name: string): number;
}

export interface CoinCollection {
  readonly coins: Array<Coin>;

  generateCoins(inputMoney: number): void;
  calculateTotalAmount(): number;
}

export interface VendingMachine {
  readonly productCollection: ProductCollection;
  readonly coinCollection: CoinCollection;

  addProduct(product: Product): void;
  modifyProduct(product: Product, originProductName: string): void;
  deleteProduct(name: string): void;
  chargeMoney(inputMoney: number): void;
}

export interface View {
  bindEvent(): void;
}

export interface DomainView extends View {
  render(): void;
}