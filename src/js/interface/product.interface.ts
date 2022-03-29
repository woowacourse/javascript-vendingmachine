export interface IProduct {
  id: string;
  name: string;
  price: number;
  count: number;
}

export interface IGet {
  (): IProduct;
}

export interface IGetId {
  (): string;
}

export interface IUpdateName {
  (name: string): void;
}

export interface IUpdatePrice {
  (price: number): void;
}

export interface IUpdateCount {
  (count: number): void;
}

export interface ISingleProduct extends IProduct {
  readonly id: string;

  get: IGet;
  getId: IGetId;
  updateName: IUpdateName;
  updatePrice: IUpdatePrice;
  updateCount: IUpdateCount;
}
