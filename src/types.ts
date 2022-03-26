import Component from './abstract/component';

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
