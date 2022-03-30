import Store from './Abstract';
import { IProduct } from './Interface';

type IState = Record<'products', Array<IProduct>>;

class ProductStore extends Store {
  protected state: IState = {
    products: [],
  };

  addProduct(product: IProduct): void {
    this.setState({
      products: [...this.state.products, product],
    });
  }

  updateProduct(index: number, replaceProduct: IProduct = null): void {
    const updateProduct = [...this.state.products];
    replaceProduct
      ? updateProduct.splice(index, 1, replaceProduct)
      : updateProduct.splice(index, 1);

    this.setState({
      products: updateProduct,
    });
  }

  findProductIndexByName(name: string): number {
    return this.state.products.findIndex(product => product.name === name);
  }
}

export default new ProductStore();
