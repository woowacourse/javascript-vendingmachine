import ProductType from '../type/ProductType';
import Product from './Product';

export interface VendingMachineInterface {
  products: ProductType[];
  addProduct(input: ProductType): ProductType;
  deleteProduct(name: string): void;
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

  deleteProduct = (name: string) => {
    const indexToDelete = this.products.findIndex((product) => product.name === name);

    this.products.splice(indexToDelete, 1);
  };
}

export default VendingMachine;
