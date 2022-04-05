import { ISingleProduct } from "./product.interface";

interface INewProduct {
  name: string;
  price: number;
  count: number;
}

type TCoinKind = "500" | "100" | "50" | "10";

export type TCoin = {
  [key in TCoinKind]: number;
};

export interface IChargeChanges {
  (money: number): void;
}

export interface IGetCoins {
  (): TCoin;
}

export interface IGenerateCoins {
  (money: number): TCoin;
}

export interface IGetTotalChanges {
  (): number;
}

export interface IAddProduct {
  (product: INewProduct): ISingleProduct;
}

export interface IUpdateProduct {
  (id: string, name?: string, price?: number, count?: number): ISingleProduct;
}

export interface IGetProducts {
  (): ISingleProduct[];
}

export interface IDeleteProduct {
  (id: string): void;
}

export interface IChargeMoney {
  (money: number): void;
}

export interface IPurchaseProduct {
  (id: number): void;
}

export interface IReturnChanges {
  (): TCoin;
}

export interface IPurchaseProductProcessMachine {
  readonly chargedMoney: number;

  chargeMoney: IChargeMoney;

  purchaseProduct: IPurchaseProduct;

  returnChanges: IReturnChanges;
}

export interface IVendingMachine {
  chargeChanges: IChargeChanges;
  getCoins: IGetCoins;
  getTotalChanges: IGetTotalChanges;
  addProduct: IAddProduct;
  updateProduct: IUpdateProduct;
  getProducts: IGetProducts;
  deleteProduct: IDeleteProduct;
  chargeMoney: IChargeMoney;
  purchaseProduct: IPurchaseProduct;
  returnChanges: IReturnChanges;
}
