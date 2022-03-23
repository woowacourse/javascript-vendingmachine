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

export type TCoinWalletKey = 'coin_500' | 'coin_100' | 'coin_50' | 'coin_10';

export type TCoinWallet = {
  coin_500: number;
  coin_100: number;
  coin_50: number;
  coin_10: number;
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
