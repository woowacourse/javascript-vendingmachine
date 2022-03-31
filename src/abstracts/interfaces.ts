export interface CustomElement<T> extends HTMLElement {
  render(): void;
  template(): string;
  setEvent(): void;
  show(): void;
  hide(): void;
  rerender(data: T): void;
}

export interface Product {
  name: string;
  price: number;
  quantity: number;
}

export interface ModifyDetail {
  oldProductName: string;
  newProductInfo: Product;
}

export interface CoinsCount {
  500: number;
  100: number;
  50: number;
  10: number;
}

export interface Action {
  type: string;
  detail?: Product | ModifyDetail | string | number;
}

export interface ProductActionType {
  ADD: string;
  MODIFY: string;
  DELETE: string;
}

export interface CoinActionType {
  MONEY_CHARGE: string;
  COIN_ADD: string;
}
