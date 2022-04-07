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

export interface IInputMoneyEvent {
  money: number;
}

export interface IPurchaseProductEvent {
  id: string;
}

export interface ISignUpEvent {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginEvent {
  email: string;
  password: string;
}
