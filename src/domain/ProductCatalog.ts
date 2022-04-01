import { ERROR_MESSAGE } from '../utils/constants';
import { ProductProps } from '../utils/interface';

import { Product } from './Product';

interface ProductCatalogInterface {
  getProductList(): Product[];
  addProduct(product: ProductProps): void;
  isSameProductExist(name: string): false | Error;
  findProduct(name: string): Product;
  deleteProduct(name: string): void;
  editProduct(targetProductName: string, editedProductProps: ProductProps): void;
  buyProduct(name: string, userMoney: number): number;
}

export class ProductCatalog implements ProductCatalogInterface {
  #productList: Product[];

  constructor() {
    this.#productList = [];
  }

  getProductList() {
    return this.#productList;
  }

  addProduct(product: ProductProps): void {
    const { name, price, quantity } = product;
    if (this.isSameProductExist(name)) return;
    const deepCopiedProductList = this.#deepCopy(this.#productList);

    this.#productList = [...deepCopiedProductList, new Product(name, price, quantity)];
  }

  isSameProductExist(name: string): false | Error {
    if (this.findProduct(name)) throw Error(ERROR_MESSAGE.DUPLICATE_PRODUCT_NAME_EXIST);

    return false;
  }

  #deepCopy(productList: Array<Product>): Array<Product> {
    return productList.map((product: Product): Product => {
      const { name, price, quantity } = product.getAllProperties();
      return new Product(name, price, quantity);
    });
  }

  findProduct(name: string, targetList: Product[] = this.#productList): Product {
    return targetList.find((product) => product.getName() === name);
  }

  buyProduct(name: string, userMoney: number): number {
    const deepCopiedProductList = this.#deepCopy(this.#productList);

    const targetProduct = this.findProduct(name, deepCopiedProductList);
    targetProduct.decreaseQuantity();

    this.#productList = deepCopiedProductList;

    return userMoney - targetProduct.getPrice();
  }

  deleteProduct(name: string): void {
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
