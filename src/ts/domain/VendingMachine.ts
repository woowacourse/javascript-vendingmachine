import ProductType from '../type/ProductType';
import Product from './Product';

export interface VendingMachineInterface {
  products: ProductType[];
  addProduct(input: ProductType): ProductType;
}

class VendingMachine implements VendingMachineInterface {
  products: ProductType[];

  constructor() {
    this.products = [];
  }

  addProduct = (newProduct: ProductType) => {
    const productToAdd = new Product(newProduct);
    this.products.push(productToAdd);

    return productToAdd;
  };
}

export default VendingMachine;
