export interface IStore {
  state: object;
  subscribers: Array<object>;

  addSubscriber(subscriber: object): void;
  setState(newState: object): void;
  getState(): object;
}

export interface IProduct {
  name: string;
  price: number;
  quantity: number;
}
