export interface ProductManage {
  addEvent(): void;
  isValidProductInfo(name: string, price: number, quantity: number): boolean;
  addProduct(name: string, price: number, quantity: number): void;
  modifyProduct(name: string, price: number, quantity: number): void;
  deleteProduct(name: string): void;
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