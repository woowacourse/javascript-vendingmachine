export interface ProductPurchaseInterface {
  addUserAmount: (currentUserAmount: Number) => void;
  getUserAmount: () => number;
  spendAmount: (price: number) => void;
  setUserAmount: (currentAmount: number) => void;
}
