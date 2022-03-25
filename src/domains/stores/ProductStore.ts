import { Action, ModifyDetail, Product } from '../../abstracts/interfaces';
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
        break;
      }
      case PRODUCT_ACTION.MODIFY: {
        const { productIndex, newProductInfo } = detail as ModifyDetail;
        newProducts[productIndex] = newProductInfo;
        break;
      }
      case PRODUCT_ACTION.DELETE: {
        newProducts.splice(detail as number, 1);
        break;
      }
    }

    return newProducts;
  }

  // eslint-disable-next-line max-lines-per-function
  notifySubscribers({ type, detail }: Action): void {
    // eslint-disable-next-line max-lines-per-function
    this.#subscribers.forEach((subscriber) => {
      switch (type) {
        case PRODUCT_ACTION.ADD: {
          const productIndex: number = this.#products.indexOf(detail as Product);
          subscriber.rerender({ type, detail }, productIndex);
          break;
        }
        case PRODUCT_ACTION.MODIFY: {
          const productIndex: number = this.#products.indexOf((detail as ModifyDetail).newProductInfo);
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
