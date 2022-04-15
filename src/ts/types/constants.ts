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
  readonly LACK_CHARGE_MONEY: string;
  readonly EMPTY_PRODUCT_NAME: string;
  readonly EMPTY_RETURN_COINS: string;
  readonly WRONG_RANGE_CHARGE_MONEY: string;
  readonly EMAIL_ALREADY_EXIST: string;
  readonly NOT_FOUND_EMAIL: string;
  readonly WRONG_FORMAT_EMAIL: string;
  readonly MISMATCH_PASSWORD: string;
  readonly WRONG_FORMAT_PASSWORD: string;
  readonly WRONG_FORMAT_NAME: string;
  OVERFLOW_CHARGE_MONEY(chargeMoney: number): string;
}

export interface SuccessMessage {
  readonly RETURN_COINS: string;
  readonly EDITED_PRODUCT: string;
  readonly DELETED_PRODUCT: string;
  readonly ADDED_PRODUCT: string;
  readonly DONE_SIGN_UP: string;
  readonly DONE_SIGN_IN: string;
  readonly DONE_EDIT_USER_INFORMATION: string;
  CHARGED_COINS(chargeMoney: number): string;
  CONSUMER_CHARGED_MONEY(chargeMoney: number, totalChargeMoney: number): string;
  PURCHASED_PRODUCT(productName: string): string;
}

export interface ChargeMoney {
  readonly UNIT: number;
  readonly MAX_TOTAL_CHARGE_MONEY: number;
  readonly CONSUMER_MAX_CHARGE_MONEY: number;
  readonly CONSUMER_MIN_CHARGE_MONEY: number;
  readonly INITIAL_TOTAL_CHARGE_MONEY: number;
}
