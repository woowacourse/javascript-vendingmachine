import { IStore, IProduct } from './Interface';

interface IProductStoreState {
  products: Array<IProduct>;
}

class ProductStore implements IStore {
  private state: IProductStoreState = {
    products: [],
  };

  private subscribers = [];

  addSubscriber(subscriber: object) {
    this.subscribers.push(subscriber);
  }

  setState(newState: IProductStoreState) {
    const changeStates: Array<string> = Object.entries(newState).map(([key]) => key);

    this.state = { ...this.state, ...newState };
    this.subscribers.forEach(renderMethod => renderMethod({ state: this.state, changeStates }));
  }

  getState(): IProductStoreState {
    return { ...this.state };
  }

  addProduct(product: IProduct): void {
    this.setState({
      products: [...this.state.products, product],
    });
  }

  updateProduct(index: number, product: IProduct): void {
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

  takeOutProductByIndex(index: number, count = 1) {
    const updatedProduct = this.state.products[index];
    updatedProduct.quantity -= count;
    this.updateProduct(index, updatedProduct);
  }
}

export default new ProductStore();
