export interface ProductName {
  readonly MAX_LENGTH: number;
  readonly MIN_LENGTH: number;
}

export interface ProductPrice {
  readonly MAX_PRICE: number;
  readonly MIN_PRICE: number;
  readonly UNIT: number;
}

export interface ProductQuantity {
  readonly MAX_QUANTITY: number;
  readonly MIN_QUANTITY: number;
}

export interface ErrorMessage {
  readonly WRONG_LENGTH_PRODUCT_NAME: string;
  readonly DUPLICATED_PRODUCT_NAME: string;
  readonly WRONG_RANGE_PRODUCT_PRICE: string;
  readonly WRONG_UNIT_PRODUCT_PRICE: string;
  readonly WRONG_PRODUCT_QUANTITY: string;
  readonly WRONG_UNIT_CHARGE_MONEY: string;
  readonly EMPTY_PRODUCT_NAME: string;
  readonly NOT_CONFIRMED_PASSWORD: string;
  readonly SOLD_OUT_PRODUCT: string;
  readonly NOT_ENOUGH_MONEY: string;
  readonly WRONG_PASSWORD_LOGIN: string;
  readonly NOT_EXIST_USER: string;
  OVERFLOW_CHARGE_MONEY(chargeMoney: number): string;
}

export interface ChargeMoney {
  readonly UNIT: number;
  readonly MAX_TOTAL_CHARGE_MONEY: number;
}
