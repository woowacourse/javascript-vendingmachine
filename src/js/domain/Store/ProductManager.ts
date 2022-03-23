interface IProduct {
  name: string;
  price: number;
  quantity: number;
}

interface IState {
  products: Array<IProduct>;
}

interface IProductManager {
  state: IState;
  subscribers: Array<object>;

  addSubscriber() : void;
  setState(newState: IState): void;

  addProduct(name: string, price: number, quantity: number): void;
  updateProduct(name: string, price: number, quantity: number): void;
  removeProductByName(name: string): void;
  findProductByName(name: string): IProduct;
}

class ProductManager implements IProductManager {
}

export default new ProductManager();
