import ProductType from '../type/ProductType';
import Product from './Product';
import { ERROR_MESSAGE } from '../constants';
import { checkDuplicatedProduct } from './validator';

export interface VendingMachineInterface {
  products: ProductType[];
  addProduct(input: ProductType): ProductType;
  deleteProduct(name: string): void;
  getProductByName(name: string): ProductType;
  editProduct(name: string, product: ProductType): void;
}

class VendingMachine implements VendingMachineInterface {
  products: ProductType[];

  constructor() {
    this.products = [];
  }

  addProduct = (newProduct: ProductType) => {
    const productToAdd = new Product(newProduct);
    checkDuplicatedProduct(this.products, productToAdd.name);
    this.products.push(productToAdd);

    return productToAdd;
  };

  deleteProduct = (name: string) => {
    const indexToDelete = this.products.findIndex((product) => product.name === name);

    this.products.splice(indexToDelete, 1);
  };

  getProductByName = (name: string) => {
    return this.products.find((product) => product.name === name);
  };

  editProduct = (targetName: string, product: ProductType) => {
    const indexToEdit = this.products.findIndex((product) => product.name === targetName);
    const editedProduct = new Product(product);
    if (editedProduct.name !== targetName) {
      checkDuplicatedProduct(this.products, product.name);
    }
    this.products[indexToEdit] = editedProduct;
  };
}

export default VendingMachine;
