import { Action, CustomElement, ModifyDetail, Product } from '../../abstracts/types';
import { PRODUCT_ACTION } from '../actions';

class ProductStore {
  #products: Product[] = [];

  #subscribers: CustomElement[] = [];

  subscribe(element: CustomElement) {
    this.#subscribers.push(element);
  }

  reducer = {
    [PRODUCT_ACTION.ADD]: (action) => {
      this.updateProducts(action);
      this.notifySubscribers(action);
    },
    [PRODUCT_ACTION.MODIFY]: (action) => {
      this.updateProducts(action);
      this.notifySubscribers(action);
    },
    [PRODUCT_ACTION.DELETE]: (action) => {
      this.updateProducts(action);
      this.notifySubscribers(action);
    },
    [PRODUCT_ACTION.PURCHASE]: (action) => {
      this.updateProducts(action);
      this.notifySubscribers(action);
    },
  };

  updateProducts(action: Action) {
    const newProducts = this.generateNewProducts(this.#products, action);
    this.#products = newProducts;
  }

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
        const productIndex = this.findProductIndex(detail as string);
        newProducts[productIndex].quantity -= 1;
        break;
      }
    }

    return newProducts;
  }

  findProductIndex(productName) {
    return this.#products.findIndex((product) => product.name === productName);
  }

  notifySubscribers(action: Action) {
    this.#subscribers.forEach((subscriber) => {
      subscriber.rerender(action);
    });
  }

  get products() {
    return this.#products;
  }
}

const ProductStoreInstance = new ProductStore();
export default ProductStoreInstance;
