export interface productName {
  readonly MAX_LENGTH: number;
  readonly MIN_LENGTH: number;
}

export interface productPrice {
  readonly MAX_PRICE: number;
  readonly MIN_PRICE: number;
  readonly UNIT: number;
}

export interface productQuantity {
  readonly MAX_QUANTITY: number;
  readonly MIN_QUANTITY: number;
}

export interface routes {
  readonly PRODUCTS: string;
  readonly COINS: string;
}

export interface errorMessage {
  readonly WRONG_LENGTH_PRODUCT_NAME: string;
  readonly DUPLICATED_PRODUCT_NAME: string;
  readonly WRONG_RANGE_PRODUCT_PRICE: string;
  readonly WRONG_UNIT_PRODUCT_PRICE: string;
  readonly WRONG_PRODUCT_QUANTITY: string;
  readonly WRONG_UNIT_CHARGE_MONEY: string;
  readonly EMPTY_PRODUCT_NAME: string;
  readonly EMPTY_PRODUCT_PRICE: string;
  readonly EMPTY_PRODUCT_QUANTITY: string;
  readonly EMPTY_CHARGE_MONEY: string;
  OVERFLOW_CHARGE_MONEY(chargeMoney: number): string;
}

export interface chargeMoney {
  readonly UNIT: number;
  readonly MAX_TOTAL_CHARGE_MONEY: number;
}
