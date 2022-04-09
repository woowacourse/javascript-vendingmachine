import { validProductInfo, validProductPurchase } from './validation';
import { localStore } from '../utils/storage';
import { Product, ProductManageInterface } from '../interface/productManage.interface';

export default class ProductManager implements ProductManageInterface {
  #products: Product[];

  constructor() {
    this.#products = localStore.get('products') ?? [];
  }

  #setProductsInLocalStorage(): void {
    localStore.set('products', this.#products);
  }

  addProduct(product: Product): void {
    if (!validProductInfo(product, this.#products)) return;
    this.#products.push(product);
    this.#setProductsInLocalStorage();
  }

  getProducts(): Product[] {
    return this.#products;
  }

  modifyProduct(index: number, product: Product): void {
    const productsList = [...this.#products];
    productsList.splice(index, 1);
    if (!validProductInfo(product, productsList)) return;
    this.#products.splice(index, 1, product);
    this.#setProductsInLocalStorage();
  }

  deleteProduct(index: number): void {
    this.#products.splice(index, 1);
    this.#setProductsInLocalStorage();
  }

  purchaseProduct(index: number, userAmount: number): number | void {
    const { price } = this.#products[index];
    if (!validProductPurchase(price, userAmount)) return;
    this.#products[index].quantity -= 1;
    if (this.#products[index].quantity === 0) {
      this.deleteProduct(index);
    }
    this.#setProductsInLocalStorage();
    return price;
  }
}
