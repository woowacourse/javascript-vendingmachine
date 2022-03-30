import { ProductManager, Product } from '../types/vendingMachineProductManager';
import {
  checkDuplicatedEditName,
  checkDuplicatedProductName,
} from './validator';

export default class VendingMachineProductManager implements ProductManager {
  private products: Product[] = [];

  addProduct(newProduct) {
    checkDuplicatedProductName(this.products, newProduct);

    this.products.push(newProduct);
  }

  getTargetProduct(targetName) {
    return this.products.find((product) => product.name === targetName);
  }

  getProducts() {
    return this.products;
  }

  editProduct(targetName, editedProduct) {
    checkDuplicatedEditName(this.products, targetName, editedProduct.name);

    const targetIndex = this.products.findIndex(
      ({ name }) => name === targetName
    );
    this.products.splice(targetIndex, 1, editedProduct);
  }

  deleteProduct(deleteProductName) {
    this.products = this.products.filter(
      (product) => product.name !== deleteProductName
    );
  }
}

export const productManager = new VendingMachineProductManager();
