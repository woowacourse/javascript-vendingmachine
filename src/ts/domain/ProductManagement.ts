import Product from './Product';
import { ProductInfo } from './types';

interface ProductManagementProps {
  addProduct: (newProduct: ProductInfo) => void;
  deleteProduct: (productName: string) => void;
  editProduct: (prevProductName: string, newProduct: ProductInfo) => void;
}

export default class ProductManagementDomain implements ProductManagementProps {
  #products: Product[];

  constructor() {
    this.#products = [];
  }

  get products() {
    return this.#products;
  }

  addProduct(newProduct: ProductInfo) {
    this.#products.push(new Product(newProduct));
  }

  deleteProduct(productName: string) {
    this.#products = this.#products.filter(
      product => product.name !== productName,
    );
  }

  editProduct(prevProductName: string, newProduct: ProductInfo) {
    this.#products.forEach(product => {
      if (product.name === prevProductName) {
        product.editProduct(newProduct);
      }
    });
  }
}
