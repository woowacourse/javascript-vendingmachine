import { Action, CustomElement, ModifyDetail, Product } from '../../abstracts/types';
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

  #subscribers: CustomElement[] = [];

  subscribe(element: CustomElement): void {
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
    const newProducts = [...oldProducts];

    switch (type) {
      case PRODUCT_ACTION.ADD: {
        newProducts.push(detail as Product);
        break;
      }
      case PRODUCT_ACTION.MODIFY: {
        const { oldProductName, newProductInfo } = detail as ModifyDetail;
        const productIndex = this.findProductIndex(oldProductName);
        newProducts[productIndex] = newProductInfo;
        break;
      }
      case PRODUCT_ACTION.DELETE: {
        const productIndex = this.findProductIndex(detail as string);
        newProducts.splice(productIndex, 1);
        break;
      }
    }

    return newProducts;
  }

  findProductIndex(productName): number {
    return this.#products.findIndex((product) => product.name === productName);
  }

  notifySubscribers(action: Action): void {
    this.#subscribers.forEach((subscriber) => {
      subscriber.rerender(action);
    });
  }

  get products() {
    return this.#products;
  }
}

export default ProductStore;
