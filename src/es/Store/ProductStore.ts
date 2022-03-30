import Store from './Abstract';
import { IProduct } from './Interface';

interface IState {
  products: Array<IProduct>;
}

class ProductStore extends Store {
  protected state: IState = {
    products: [],
  };

  addProduct(product: IProduct): void {
    this.setState({
      products: [...this.state.products, product],
    });
  }

  updateProduct(index, product: IProduct): void {
    const updateProducts = [...this.state.products];

    updateProducts.splice(index, 1, product);
    this.setState({
      products: updateProducts,
    });
  }

  removeProductByIndex(index: number): void {
    const updateProducts = [...this.state.products];

    updateProducts.splice(index, 1);
    this.setState({
      products: updateProducts,
    });
  }

  findProductIndexByName(name: string): number {
    return this.state.products.findIndex(product => product.name === name);
  }
}

export default new ProductStore();
