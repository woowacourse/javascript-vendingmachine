import { checkProductValidation } from './validator';

export interface Product {
  name: string;
  price: number;
  quantity: number;
}

interface VendingMachine {
  products: Product[];
  addProduct(input: Product): void;
}

class VendingMachine {
  products: Product[];

  constructor() {
    this.products = [];
  }

  addProduct(product) {
    checkProductValidation(product);
    /* TODO: product 추가 */
  }
}

export default VendingMachine;
