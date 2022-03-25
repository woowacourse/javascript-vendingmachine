export interface IStore {
  addSubscriber(subscriber: object): void;
  setState(newState: object): void;
  getState(): object;
}

export interface IProduct {
  name: string;
  price: number;
  quantity: number;
}
