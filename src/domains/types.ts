export type TProduct = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export interface IProduct {
  purchaseProduct: () => void;
  getProductInfo: () => TProduct;
  editProductInfo: (args: { name: string; price: number; quantity: number }) => void;
  generateProductId: (name: string) => string;
}

export type TCoinWalletKey = 'coin500' | 'coin100' | 'coin50' | 'coin10';

export type TCoinWallet = {
  coin500: number;
  coin100: number;
  coin50: number;
  coin10: number;
};

export interface ICoinWallet {
  rechargeCoinWallet: (charge: number) => void;
  computeCoinTotalAmount: () => number;
  generateRandomCoinInfo: (charge: number) => TCoinWallet;
  getCoinWalletInfo: () => TCoinWallet;
  returnChangeCoinInfo: (change: number) => TCoinWallet;
  pickRandomCoinKey: (charge: number) => TCoinWalletKey;
  findMaxCoinKey: (change: number) => TCoinWalletKey;
}
