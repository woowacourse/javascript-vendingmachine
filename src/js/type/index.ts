export interface IDeleteProductEvent {
  id: string;
}

export interface IAddProductEvent {
  name: string;
  price: number;
  count: number;
}

export interface IUpdateProductEvent extends IAddProductEvent {
  id: string;
}

export interface IChargeChangesEvent {
  money: number;
}
