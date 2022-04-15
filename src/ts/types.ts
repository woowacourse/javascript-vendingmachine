export interface ItemInfoType {
  itemName: string;
  itemPrice: number;
  itemQuantity: number;
}

export type CoinKind = 500 | 100 | 50 | 10;

export interface CoinInterface {
  count: number;
  chargeCoin(count: number): void;
  useCoin(count: number): void;
}

export interface ItemInputValidationInfo {
  itemInfo: ItemInfoType;
  isAddMode: boolean;
  itemIndex?: number;
  itemList?: ItemInfoType[];
}

export interface CashInputValidationInfo {
  inputtedCashAmount: number;
}

export interface CoinRechargeInputValidationInfo extends CashInputValidationInfo {
  rechargedCoinAmount: number;
}

export interface AuthenticationInfo {
  email: string;
  name?: string;
  password: string;
  verificationPassword?: string;
}

export type ValidationInfo =
  | ItemInputValidationInfo
  | CashInputValidationInfo
  | CoinRechargeInputValidationInfo
  | AuthenticationInfo;

export interface TestCase {
  testCase: Function;
  errorMessage: string;
}

export interface VendingMachineInterface {
  itemList;
  coinCollection;
  getItemPurchaseCash: () => number;

  addItem: (itemInfo: ItemInfoType) => ItemInfoType;
  editItem: (itemInfo: ItemInfoType, itemIndex: number) => void;
  deleteItem: (itemName: string) => void;
  purchaseItem: (itemIndex: number) => void;

  chargeCoin: (rechargeCoin: number) => number;
  returnCoin: () => Record<CoinKind, CoinInterface>;
  calculateTotalCoinAmount: () => number;

  chargeCash: (chargedCash: number) => number;

  validateItemInput: (
    itemInfo: ItemInfoType,
    isAddMode?: boolean,
    itemIndex?: number | null
  ) => void;
  validateCoinRechargeInput: (rechargeCash: number) => void;
  validateItemPurchaseCashInput: (rechargedCash: number) => void;
}

export interface User {
  email: string;
  name: string;
  id: number;
}

export interface UserInfo extends User {
  accessToken: string;
}

export interface UserStoreInterface {
  getUserInfo: () => UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
  validateLoginInput: (loginInfo: AuthenticationInfo) => void;
  validateUserInfoInput: (userInfo: AuthenticationInfo) => void;
  validateEditUserInfoInput: (editUserInfoInput: AuthenticationInfo) => void;
}

export interface DOMEvent extends Event {
  target: HTMLElement;
  key?: string;
}

export type Hash =
  | ''
  | '#item-manage'
  | '#coin-recharge'
  | '#item-purchase'
  | '#login'
  | '#register'
  | '#user-info-edit';

export interface ViewInterface {
  tabHash: Hash;
  render(): void;
}

export interface VendingMachineTabInterface extends ViewInterface {
  vendingMachine: VendingMachineInterface;
  changeTabContent(contentTemplate: string): void;
}

export interface HeaderInterface {
  render(hash: Hash): void;
}
