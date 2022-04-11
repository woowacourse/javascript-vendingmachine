export type TProduct = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export interface IProduct {
  purchaseProduct: (money: number) => void;
  getProductInfo: () => TProduct;
  editProductInfo: (args: { name: string; price: number; quantity: number }) => void;
}

export type TCoinWalletKey = keyof TCoinWallet;

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
  returnChangeCoinInfo: (change: number) => TCoinWallet;
  pickRandomCoinKey: () => TCoinWalletKey;
  findMaxCoinKey: (change: number) => TCoinWalletKey;
  getCoinWalletInfo: () => TCoinWallet;
  setCoinWalletInfo: (coinWalletInfo: TCoinWallet) => void;
}
