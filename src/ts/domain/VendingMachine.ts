import ProductType from '../type/ProductType';
import Product from './Product';

interface VendingMachineInterface {
  products: ProductType[];
  addProduct(input: ProductType): void;
}

class VendingMachine implements VendingMachineInterface {
  products: ProductType[];

  constructor() {
    this.products = [];
  }

  addProduct(newProduct: ProductType) {
    this.products.push(new Product(newProduct));
  }
}

export default VendingMachine;
