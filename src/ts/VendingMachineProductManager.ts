import { ProductManager, product } from './types/vendingMachineProductManager';

import {
  checkDuplicatedProductName,
  checkEditDuplicateName,
} from './utils/utils';

export default class VendingMachineProductManager implements ProductManager {
  private products: product[] = [];

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

  editProduct(editProductName, targetProduct) {
    const editIndex = this.products.findIndex(
      (product) => product.name === editProductName
    );
    const duplicatedNameIndex = this.products.findIndex(
      (product) => product.name === targetProduct.name
    );

    checkEditDuplicateName(editIndex, duplicatedNameIndex);

    this.products.splice(editIndex, 1, targetProduct);
  }

  deleteProduct(deleteProductName) {
    this.products = this.products.filter(
      (product) => product.name !== deleteProductName
    );
  }
}
