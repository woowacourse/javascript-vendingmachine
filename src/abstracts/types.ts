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
};

export type CoinActionType = {
  COIN_CHARGE: string;
};

export type CoinsCount = {
  500: number;
  100: number;
  50: number;
  10: number;
  sum: number;
};

export interface CustomElement extends HTMLElement {
  render(): void;
  template(): string;
  setEvent(): void;
  show(): void;
  hide(): void;
  rerender(data: Action | number | CoinsCount): void;
}
