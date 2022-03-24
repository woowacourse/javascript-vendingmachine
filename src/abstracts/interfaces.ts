export interface Product {
  name: string;
  price: number;
  quantity: number;
}

export interface Action {
  type: string;
  detail?: Product;
}

export interface ActionType {
  ADD: string;
}
