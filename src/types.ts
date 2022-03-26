import Component from './abstract/component';

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type Action = {
  type: string;
  payload: any;
};

export type AppState = {
  productList: Array<ProductItem>;
};

export interface ComponentConstructor {
  new (): Component;
  _tagName?: string;
}

export type ProductItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type RawProductItem = Override<
  Omit<ProductItem, 'id'>,
  {
    price: string;
    quantity: string;
  }
>;
