import { IStore } from '@Domain/Store/interface';

interface IProduct {
  name: string;
  price: number;
  quantity: number;
}

interface IState {
  products: Array<IProduct>;
}

class ProductStore implements IStore {
  state: IState = {
    products: [],
  };

  subscribers = [];

  addSubscriber(subscriber: object) {
    this.subscribers.push(subscriber);
  }

  setState(newState: IState) {
    const changeStates = Object.entries(newState).map(([key]) => key);

    this.state = { ...this.state, ...newState };
    this.subscribers.forEach(renderMethod => renderMethod({ state: this.state, changeStates }));
  }

  getState(): IState {
    return { ...this.state };
  }

  addProduct(name: string, price: number, quantity: number): void {
    this.setState({
      products: [...this.state.products, { name, price, quantity }],
    });
  }

  updateProduct(name: string, price: number, quantity: number): void {
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

  removeProductByName(name: string): void {
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

export default new ProductStore();
