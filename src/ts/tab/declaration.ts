import { Product } from '../resource/declaration';

export interface ProductManage {
  isValidProductInfo(productInfo: Product, index: number): boolean;
  addProduct(productInfo: Product): void;
  modifyProduct(productInfo: Product, index: number): void;
  deleteProduct(name: string): boolean;
  drawProductList(): void;
  getProductIndex(name: string): number;
}

export interface ChargeMoney {
  chargeMoney(coinList: Array<number>): void;
  isValidMoney(inputMoney: number): boolean;
  generateRandomCoins(inputMoney: number): Array<number>;
  handleChargeMoney(e: Event): void;
  drawCoins(): void;
}
