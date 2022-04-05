import { Action, CustomElement, ModifyDetail, Product } from '../../abstracts/interfaces';
import { PRODUCT_ACTION } from '../actions';

class ProductStore {
  static _instance: null | object = null;

  static get instance() {
    if (!ProductStore._instance) {
      ProductStore._instance = new ProductStore();
    }

    return ProductStore._instance;
  }

  #products: Product[] = [];

  #subscribers: CustomElement<Action>[] = [];

  subscribe(element: CustomElement<Action>) {
    this.#subscribers.push(element);
  }

  dispatch(action: Action) {
    this.updateProducts(action);
    this.notifySubscribers(action);
  }

  updateProducts(action: Action) {
    const newProducts = this.generateNewProducts(this.#products, action);

    this.#products = newProducts;
  }

  // eslint-disable-next-line max-lines-per-function
  generateNewProducts(oldProducts: Product[], { type, detail }: Action) {
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
      case PRODUCT_ACTION.PURCHASE: {
        const productName = detail as string;
        const productIndex = this.findProductIndex(productName);
        newProducts[productIndex].quantity -= 1;
      }
    }

    return newProducts;
  }

  findProductIndex(productName) {
    return this.#products.findIndex((product) => product.name === productName);
  }

  notifySubscribers(action: Action) {
    this.#subscribers.forEach((subscriber) => subscriber.rerender(action));
  }

  get products() {
    return this.#products;
  }
}

export default ProductStore;
