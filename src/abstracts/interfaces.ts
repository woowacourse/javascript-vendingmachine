export interface Product {
  name: string;
  price: number;
  quantity: number;
}

export type ModifyDetail = {
  productIndex: number;
  newProductInfo: Product;
};

export interface Action {
  type: string;
  detail?: Product | ModifyDetail | number;
}

export interface ActionType {
  ADD: string;
  MODIFY: string;
  DELETE: string;
}
