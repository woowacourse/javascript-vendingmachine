export interface ItemType {
  name: string;
  price: number;
  quantity: number;
  subtractQuantity?(): void;
}

export type CoinsType = {
  fiveHundred: number;
  hundred: number;
  fifty: number;
  ten: number;
};

export type RouteChangeDetailType = {
  $navButton: HTMLButtonElement;
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
