import Component from './abstract/component';

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type Action = {
  type: string;
  payload: any;
};

export type AppState = {
  currentPath: string;
  chargedMoney: number;
  chargedCoins: CoinRecord;
  productList: Array<ProductItem>;
  insertedMoney: number;
  changes: CoinRecord;
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

export enum WhiteList {
  Home = '/',
  VendingMachinePage = '/vending-machine',
  ProductManage = '/vending-machine/product-manage',
  ChargeMoney = '/vending-machine/charge-money',
  PurchaseProduct = '/vending-machine/purchase-product',
  LoginPage = '/login',
  MyAccountPage = '/my-account',
}

export type UserInfo = {
  name: string;
  email: string;
  password: string;
};

export type Feedback = {
  inputValue: string;
  hasError: boolean;
  errorMessage: string;
};

export type FieldSet = {
  label: string;
  name: string;
  placeholder: string;
  feedback: Feedback;
  type: 'text' | 'password';
  disabled: boolean;
};
