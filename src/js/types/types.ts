export interface ItemType {
  name: string;
  price: number;
  quantity: number;
  subtractQuantity?(): void;
}

export interface CoinsType {
  fiveHundred: number;
  hundred: number;
  fifty: number;
  ten: number;
}

export type RouteChangeDetailType = {
  url: string;
  page: string;
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

export type signDataType = {
  email?: string;
  name?: string;
  password: string;
  confirmPassword?: string;
};
