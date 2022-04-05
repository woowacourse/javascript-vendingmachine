export type ItemInfoType = { itemName: string; itemPrice: number; itemQuantity: number };

export type Coin = 500 | 100 | 50 | 10;

export type ItemInputValidationInfo = {
  itemInfo: ItemInfoType;
  isAddMode: boolean;
  itemIndex?: number;
};

export type AuthenticationInfo = {
  email: string;
  name?: string;
  password: string;
  verificationPassword?: string;
};

export type ValidationInfo = ItemInputValidationInfo | AuthenticationInfo | number;

export interface TestCase {
  testCase: Function;
  errorMessage: string;
}

export interface VendingMachineInterface {
  itemList;
  coinCollection;

  addItem: (itemInfo: ItemInfoType) => ItemInfoType;
  editItem: (itemInfo: ItemInfoType, itemIndex: number) => void;
  deleteItem: (itemName: string) => void;

  chargeCoin: (rechargeCoin: number) => number;
  calculateTotalCoinAmount: () => number;

  validateItemInput: (
    itemInfo: ItemInfoType,
    isAddMode?: boolean,
    itemIndex?: number | null
  ) => void;
  validateCashInput: (rechargeCash: number) => void;
}

export interface UserStoreInterface {
  validateRegisterInput: (registerInfo: AuthenticationInfo) => void;
}

export type Hash =
  | ''
  | '#item-manage'
  | '#coin-recharge'
  | '#item-purchase'
  | '#login'
  | '#register';

export interface ViewInterface {
  tabHash: Hash;
  render(): void;
}
export interface VendingMachineTabInterface extends ViewInterface {
  vendingMachine: VendingMachineInterface;
  changeTabContent(contentTemplate: string): void;
  changeHashUrl(hash: Hash): void;
}

export interface HeaderInterface {
  render(hash: Hash): void;
  changeThumbnail(): void;
}

export type EventType = number;
