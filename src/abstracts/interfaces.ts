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

export interface MoneyStorage {
  money: number;
  coinsCount: {
    500: number;
    100: number;
    50: number;
    10: number;
  };
}

export interface Action {
  type: string;
  detail?: Product | ModifyDetail | string | number;
}

export interface ProductActionType {
  ADD: string;
  MODIFY: string;
  DELETE: string;
  PURCHASE: string;
}

export interface CoinActionType {
  CHARGE: string;
  RETURN: string;
}

export interface MoneyActionType {
  INPUT: string;
}
