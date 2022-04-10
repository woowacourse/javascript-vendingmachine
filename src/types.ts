import Component from './abstract/component';

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type Action = {
  type: string;
  payload: any;
};

export type AppState = {
  login: loginInfo;
  chargedMoney: number;
  insertedMoney: number;
  chargedCoins: CoinRecord;
  returnCoins: CoinRecord;
  productList: Array<ProductItem>;
};

export interface ComponentConstructor {
  new (): Component;
  _tagName?: string;
}

export type loginInfo = {
  isLogin: boolean;
  email: string;
  name: string;
};

export type ProductItem = {
  name: string;
  price: number;
  quantity: number;
  isEditing: boolean;
};

export type RawProductItem = Override<
  Omit<ProductItem, 'isEditing'>,
  {
    price: string;
    quantity: string;
  }
>;

export type Indexable = number | string;

export type CoinRecord = { [key: number]: number };

export type EventOnElement = Override<Event, { target: HTMLElement; key: string }>;

export enum Tab {
  ProductManageTab = 'product-manage-page',
  ChargeMoneyTab = 'charge-money-page',
  PurchaseProductTab = 'purchase-product-page',
}
