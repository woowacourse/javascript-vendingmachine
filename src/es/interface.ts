export interface PageManagerMethods {
  addSubscriber(subscriber: object): void;
  setState(newState: object): void;
  getState(): object;
}

export interface ProductInfo {
  name: string;
  price: number;
  quantity: number;
}

export type Coins = Array<number>;

export interface UserInfo {
  isMember? : boolean,
  id: number,
  email: string,
  name: string,
}
