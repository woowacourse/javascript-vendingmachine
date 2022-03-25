export interface Product {
  name: string;
  price: number;
  quantity: number;
}

export interface Action {
  type: string;
  detail?: Product | number;
}

export interface ActionType {
  ADD: string;
  DELETE: string;
}
