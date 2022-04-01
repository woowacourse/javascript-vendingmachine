export type ItemInfoType = { itemName: string; itemPrice: number; itemQuantity: number };

export type Coin = 500 | 100 | 50 | 10;

export type ItemInputValidationInfo = {
  itemInfo: ItemInfoType;
  isAddMode: boolean;
  itemIndex?: number;
};

export type ValidationInfo = ItemInputValidationInfo | number;

export interface TestCase {
  testCase: Function;
  errorMessage: string;
}

export interface VendingMachineInterface {
  addItem: (itemInfo: ItemInfoType) => Object;
  editItem: (itemInfo: ItemInfoType, itemIndex: number) => void;
  deleteItem: (itemName: string) => void;

  chargeCoin: (rechargeCoin: number) => void;
  calculateTotalCoinAmount: () => number;
}
