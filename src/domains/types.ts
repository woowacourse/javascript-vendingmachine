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

export type TAction = string;

export type TState = 'PRODUCT_LIST' | 'COIN_WALLET' | 'INPUT_CHARGE';

export type TSubsrcribedComponents = {
  PRODUCT_LIST: Array<any>;
  COIN_WALLET: Array<any>;
  INPUT_CHARGE: Array<any>;
};

export interface IVendingMachineStore {
  subscribedComponents: TSubsrcribedComponents;
  productList: Array<IProduct>;
  coinWallet: TCoinWallet;
  inputCharge: number;

  mutateProductList: (actionType: TAction, payload: any) => void;
  mutateCoinWallet: (actionType: TAction, payload: any) => void;
  mutateInputCharge: (actionType: TAction, payload: any) => void;
  subscribe: (stateType: TState, component: any) => void;
  getState: (stateType: TState, component: any) => Array<IProduct> | TCoinWallet | number;
}
