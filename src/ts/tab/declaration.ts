import { Product } from "../resource/declaration";

export interface ProductManage {
  isValidProductInfo(productInfo: Product): boolean;
  addProduct(productInfo: Product): void;
  modifyProduct(productInfo: Product): void;
  deleteProduct(productInfo: Product): void;
  drawProductList(): void;
  getProductIndex(productInfo: Product): number;
}

export interface ChargeMoney {
  chargeMoney(coinList: Array<number>): void;
  isValidMoney(inputMoney: number): boolean;
  generateRandomCoins(inputMoney: number): Array<number>;
  handleChargeMoney(e: Event): void;
  drawCoins(): void;
}