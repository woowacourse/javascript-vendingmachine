import { Action, Product } from '../../abstracts/interfaces';
import { PRODUCT_ACTION } from '../actions';

class ProductStore {
  static _instance: null | object = null;

  static get instance(): object {
    if (!ProductStore._instance) {
      ProductStore._instance = new ProductStore();
    }

    return ProductStore._instance;
  }

  #products: Product[] = [];

  #subscribers: any[] = [];

  subscribe(element: any): void {
    this.#subscribers.push(element);
  }

  dispatch(action: Action): void {
    this.updateProducts(action);
    this.notifySubscribers(action);
  }

  updateProducts(action: Action): void {
    const newProducts = this.generateNewProducts(this.#products, action);

    this.#products = newProducts;
  }

  generateNewProducts(oldProducts: Product[], { type, detail }: Action): Product[] {
    const newProducts = oldProducts;

    switch (type) {
      case PRODUCT_ACTION.ADD:
        newProducts.push(detail);
        return newProducts;
      default:
        return newProducts;
    }
  }

  notifySubscribers({ detail }: Action): void {
    this.#subscribers.forEach((subscriber) => {
      subscriber.rerender(detail);
    });
  }
}

export default ProductStore;
