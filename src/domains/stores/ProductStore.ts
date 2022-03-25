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

  // eslint-disable-next-line max-lines-per-function
  generateNewProducts(oldProducts: Product[], { type, detail }: Action): Product[] {
    const newProducts = oldProducts;

    switch (type) {
      case PRODUCT_ACTION.ADD: {
        newProducts.push(detail as Product);
        return newProducts;
      }
      case PRODUCT_ACTION.DELETE: {
        newProducts.splice(detail as number, 1);
        return newProducts;
      }
      default:
        return oldProducts;
    }
  }

  notifySubscribers({ type, detail }: Action): void {
    this.#subscribers.forEach((subscriber) => {
      switch (type) {
        case PRODUCT_ACTION.ADD: {
          const productIndex: number = this.#products.indexOf(detail as Product);
          subscriber.rerender({ type, detail }, productIndex);
          break;
        }
        case PRODUCT_ACTION.DELETE:
          subscriber.rerender({ type, detail });
      }
    });
  }
}

export default ProductStore;
