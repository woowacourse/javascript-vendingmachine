export interface ItemType {
  id?: number;
  name?: string;
  price?: number;
  quantity?: number;
  subtractQuantity?(): void;
}

export interface CoinsType {
  fiveHundred: number;
  hundred: number;
  fifty: number;
  ten: number;
}

export type RouteChangeDetailType = {
  page: string;
  section: string;
};

export type ChargeMoneyDetailType = {
  inputMoney: number;
};

export type TableItemChangeDetailType = {
  item: ItemType;
  targetRowIndex: number;
  $targetTableRow: HTMLTableRowElement;
};

export type TableItemDeleteDetailType = {
  item: ItemType;
};

export type UserDataType = {
  id?: number;
  email?: string;
  name?: string;
  password?: string;
  confirmPassword?: string;
};
