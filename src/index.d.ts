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

export interface AdminData {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}

export type AdminEmail = Pick<AdminData, 'email'>;

export type AdminName = Pick<AdminData, 'name'>;

export type AdminPassword = Pick<AdminData, 'password'>;

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
  adminName: string;
  
  addProduct(product: Product): void;
  modifyProduct(product: Product, originProductName: ProductName): void;
  deleteProduct(name: ProductName): void;
  chargeMoney(inputMoney: number): void;

  signup(adminData: AdminData);
  modifyAdmin(adminData: AdminData);
  login(email: AdminEmail, password: AdminPassword);
  isLogin(): boolean;
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

export interface PageView {
  render(): void;
  bindEvent(movePage: Function): void;
}

export type PageName = 'productManage' | 'chargeMoney' | 'buyProduct' | 'signupPage' | 'adminPage' | 'loginPage';
 