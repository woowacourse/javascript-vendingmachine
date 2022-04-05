import { ERROR_MESSAGE } from '../utils/constants';
import { ProductProps } from '../utils/interface';

import { Product } from './Product';

interface ProductCatalogInterface {
  getProductList(): Product[];
  addProduct(product: ProductProps): void;
  isSameProductExist(name: string): false | Error;
  findProduct(name: ProductProps['name']): Product;
  deleteProduct(name: ProductProps['name']): void;
  editProduct(targetProductName: ProductProps['name'], editedProductProps: ProductProps): void;
  buyProduct(name: ProductProps['name'], purchaseMoney: number): number;
}

export class ProductCatalog implements ProductCatalogInterface {
  #productList: Product[];

  constructor() {
    this.#productList = [new Product({ name: '콜라', price: 2000, quantity: 10 })];
  }

  getProductList() {
    return this.#productList;
  }

  addProduct(product: ProductProps): void {
    const { name } = product;
    if (this.isSameProductExist(name)) return;

    const deepCopiedProductList = this.#deepCopy(this.#productList);

    this.#productList = [...deepCopiedProductList, new Product(product)];
  }

  isSameProductExist(name: ProductProps['name']): false | Error {
    if (this.findProduct(name)) throw Error(ERROR_MESSAGE.DUPLICATE_PRODUCT_NAME_EXIST);

    return false;
  }

  #deepCopy(productList: Array<Product>): Array<Product> {
    return productList.map((product: Product): Product => new Product(product.getAllProperties()));
  }

  findProduct(name: ProductProps['name'], targetList: Product[] = this.#productList): Product {
    return targetList.find((product) => product.getName() === name);
  }

  buyProduct(name: ProductProps['name'], purchaseMoney: number): number {
    if (this.#isValidatedPurchase(name, purchaseMoney)) {
      const deepCopiedProductList = this.#deepCopy(this.#productList);

      const targetProduct = this.findProduct(name, deepCopiedProductList);
      targetProduct.decreaseQuantity();

      this.#productList = deepCopiedProductList;

      const exchange = purchaseMoney - targetProduct.getPrice();

      return exchange;
    }
  }

  #isValidatedPurchase(name: ProductProps['name'], purchaseMoney: number) {
    const price = this.findProduct(name).getPrice();

    if (purchaseMoney < price) throw new Error(ERROR_MESSAGE.MORE_PURCHASE_MONEY_NEEDED);

    return true;
  }

  deleteProduct(name: ProductProps['name']): void {
    this.#productList = this.#productList.filter((product) => product.getName() !== name);
  }

  editProduct(targetProductName: ProductProps['name'], editedProductProps: ProductProps) {
    const targetProduct = this.findProduct(targetProductName);

    if (targetProduct.isValidatedAllProp(editedProductProps)) {
      const { name, price, quantity } = editedProductProps;

      targetProduct.setName(name);
      targetProduct.setPrice(price);
      targetProduct.setQuantity(quantity);
    }
  }
}
