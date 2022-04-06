import { Product } from './resourceDeclaration';

export interface ProductManage {
  handleAddProduct(e: Event): void;
  handleClickButtons(e: Event): void;
  addProduct(productInfo: Product): void;
  modifyProduct(productInfo: Product, index: number): void;
  deleteProduct(name: string): void;
}

export interface ChargeMoney {
  chargeMoney(coinList: Array<number>): void;
  handleChargeMoney(e: Event): void;
}

export interface ProductBuy {
  updateResources(): void;
  handleChargeMoney(e: Event): void;
  handleBuyProduct(e: Event): void;
  handleReturnMoney(): void;
  saleProduct({ price, quantity }: Product, index: number): void;
}

export interface Login {
  handleLogin(): void;
  handleLink(): void;
}

export interface SignUp {
  handleSignUp(): void;
}

export interface EditProfile {
  handleEditProfile(): void;
}
