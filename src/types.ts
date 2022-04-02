import Component from './abstract/component';

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type Action = {
  type: string;
  payload: any;
};

export type AppState = {
  activeTab: Tab;
  chargedMoney: number;
  chargedCoins: CoinRecord;
  productList: Array<ProductItem>;
  insertedMoney: number;
};

export interface ComponentConstructor {
  new (): Component;
  _tagName?: string;
}

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

export type EventOnElement = Override<Event, { target: HTMLElement }>;

export enum Tab {
  ProductManageTab = 'product-manage-tab',
  ChargeMoneyTab = 'charge-money-tab',
  PurchaseProductTab = 'purchase-product-tab',
}
