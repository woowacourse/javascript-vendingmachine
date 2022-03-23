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

  addSubscriber(subscriber: object): void;
  setState(newState: IState): void;
  getState(): IState;

  addProduct(name: string, price: number, quantity: number): void;
  updateProduct(name: string, price: number, quantity: number): void;
  removeProductByName(name: string): void;
  findProductIndexByName(name: string): number;
}

class ProductManager implements IProductManager {
  state = {
    products: [],
  };

  subscribers = [];

  addSubscriber(subscriber: object) {
    this.subscribers.push(subscriber);
  }

  setState(newState: IState) {
    this.state = { ...this.state, ...newState };
    this.subscribers.forEach(subscriber => subscriber(this.state));
  }

  getState(): IState {
    return { ...this.state };
  }

  addProduct(name: string, price: number, quantity: number) {
    this.setState({
      products: [...this.state.products, { name, price, quantity }],
    });
  }

  updateProduct(name: string, price: number, quantity: number) {
    const targetIndex = this.findProductIndexByName(name);
    const updateProducts = [...this.state.products].splice(targetIndex, 1, {
      name,
      price,
      quantity,
    });

    this.setState({
      products: updateProducts,
    });
  }

  removeProductByName(name: string) {
    const targetIndex = this.findProductIndexByName(name);
    const updateProducts = [...this.state.products].splice(targetIndex, 1);

    this.setState({
      products: updateProducts,
    });
  }

  findProductIndexByName(name: string): number {
    return this.state.products.findIndex(product => product.name === name);
  }
}

export default new ProductManager();
