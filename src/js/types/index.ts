export type ItemType = {
  name: string;
  price: number;
  quantity: number;
};

export type CoinsType = {
  fiveHundred: number;
  hundred: number;
  fifty: number;
  ten: number;
};

export type RouteChangeDetailType = {
  targetId: string;
};

export type MoneyDetailType = {
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
