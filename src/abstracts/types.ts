export interface Product {
  name: string;
  price: number;
  quantity: number;
}

export type ModifyDetail = {
  oldProductName: string;
  newProductInfo: Product;
};

export interface Action {
  type: string;
  detail?: Product | ModifyDetail | string | number;
}

export type ProductActionType = {
  ADD: string;
  MODIFY: string;
  DELETE: string;
  PURCHASE: string;
};

export type CoinActionType = {
  COIN_CHARGE: string;
  PURCHASE_MONEY_INPUT: string;
  UPDATE_MONEY_INPUT: string;
  RETURN_CHANGE: string;
};

export type AuthActionType = {
  LOGIN: string;
  LOGOUT: string;
};

export type CoinsCount = {
  500: number;
  100: number;
  50: number;
  10: number;
  sum: number;
  money_input: number;
};

export interface CustomElement extends HTMLElement {
  render(): void;
  template(): string;
  setEvent(): void;
  show(): void;
  hide(): void;
  rerender(data: Action | number | CoinsCount, action?: Action): void;
}
