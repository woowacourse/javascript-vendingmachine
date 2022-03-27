export interface Product {
  name: string;
  price: number;
  quantity: number;
}

export interface Coin {
  amount: number;
  count: number;
}

export interface View {
  render(): void;
  bindEvent(): void;
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

export interface ProductManageView extends View {
  readonly $addProductForm: HTMLElement;
  readonly $productContainer: HTMLElement;
  readonly $additionalProductName: HTMLElement;
  readonly $additionalProductPrice: HTMLElement;
  readonly $additionalProductQuantity: HTMLElement;
  readonly vendingMachine: VendingMachine;

  handleSubmitForm(e: Event): void;
  handleClickButtons(e: Event): void;
  setModifyForm(productRow: HTMLElement): void;
  deleteProduct(productRow: HTMLElement): void;
  modifyProduct(productRow: HTMLElement): void;
}

export interface TabView {
  readonly $app: HTMLElement;
  readonly $tabs: HTMLElement;
  readonly productManage: ProductManageView;

  bindEvent(): void;
  handleClickTabs(e: Event): void;
  handlePopstate(): void;
  switchTab(tabName: string): void;
}
