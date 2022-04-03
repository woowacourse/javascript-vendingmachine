export interface IPageManager {
  addSubscriber(subscriber: object): void;
  setState(newState: object): void;
  getState(): object;
}

export interface IProduct {
  name: string;
  price: number;
  quantity: number;
}

export type TCoins = Array<number>;

export interface IUser {
  isMember? : boolean,
  id: number,
  email: string,
  name: string,
}
