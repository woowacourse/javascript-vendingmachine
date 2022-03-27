export interface Product {
  name: string;
  price: number;
  quantity: number;
}

export type CoinsCount = {
  500: number;
  100: number;
  50: number;
  10: number;
};

export type ModifyDetail = {
  oldProductName: string;
  newProductInfo: Product;
};

export interface Action {
  type: string;
  detail?: Product | ModifyDetail | number;
}

export type ProductActionType = {
  ADD: string;
  MODIFY: string;
  DELETE: string;
};

export type CoinActionType = {
  MONEY_CHARGE: string;
  COIN_ADD: string;
};
