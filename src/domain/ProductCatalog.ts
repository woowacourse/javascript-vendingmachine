import { ERROR_MESSAGE } from '../utils/constants';
import { ProductProps } from '../utils/interface';

import { Product } from './Product';

export class ProductCatalog {
  #productList: Product[];

  constructor() {
    this.#productList = [];
  }

  getProductList() {
    return this.#productList;
  }

  addProduct(product: ProductProps) {
    const { name, price, quantity } = product;
    if (this.isSameProductExist(name)) return;

    this.#productList = [...this.#productList, new Product(name, price, quantity)];
  }

  isSameProductExist(name: string): boolean {
    if (this.findProduct(name)) throw Error(ERROR_MESSAGE.DUPLICATE_PRODUCT_NAME_EXIST);

    return false;
  }

  findProduct(name: string): Product {
    return this.#productList.find((product) => product.getName() === name);
  }

  deleteProduct(name: string) {
    this.#productList = this.#productList.filter((product) => product.getName() !== name);
  }

  editProduct(targetProductName: string, editedProductProps: ProductProps) {
    const targetProduct = this.findProduct(targetProductName);

    const { name, price, quantity } = editedProductProps;

    if (targetProduct.isValidatedAllProp(name, price, quantity)) {
      targetProduct.setName(name);
      targetProduct.setPrice(price);
      targetProduct.setQuantity(quantity);
    }
  }
}
