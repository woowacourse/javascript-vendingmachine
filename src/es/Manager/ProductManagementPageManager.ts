import Products from '../data/Products';
import { IPageManager, IProduct } from './Interface';

interface IProductStoreState {
  products: Array<IProduct>;
}

class ProductManagementPageManager implements IPageManager {
  private subscribers = [];

  addSubscriber(subscriber: object) {
    this.subscribers.push(subscriber);
  }

  setState(newState: IProductStoreState) {
    const changeStates: Array<string> = Object.keys(newState);

    const state = { ...this.getState(), ...newState };
    if (changeStates.includes('products')) Products.setProducts(newState.products);

    this.subscribers.forEach(renderMethod => renderMethod({ state, changeStates }));
  }

  getState(): IProductStoreState {
    return {
      products: Products.products,
    };
  }

  addProduct(product: IProduct): void {
    this.setState({
      products: [...Products.products, product],
    });
  }

  updateProduct(index: number, product: IProduct): void {
    const updateProducts = [...Products.products];

    updateProducts.splice(index, 1, product);
    this.setState({
      products: updateProducts,
    });
  }

  removeProductByIndex(index: number): void {
    const updateProducts = [...Products.products];

    updateProducts.splice(index, 1);
    this.setState({
      products: updateProducts,
    });
  }

  findProductIndexByName(name: string): number {
    return Products.products.findIndex(product => product.name === name);
  }

  addOrUpdateProduct(product) {
    const productIndex = this.findProductIndexByName(product.name);

    if (productIndex === -1) {
      this.addProduct(product);
      return;
    }

    if (confirm('이미 존재하는 상품입니다.\n기존 상품 목록에서 덮어씌우시겠습니까?')) {
      this.updateProduct(productIndex, product);
    }
  }
}

export default new ProductManagementPageManager();
