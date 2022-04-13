import { ProductManager, Product } from '../types/vendingMachineProductManager';

import {
  checkDuplicatedProductName,
  checkEditDuplicateName,
} from '../validation/checkProduct';

export default class VendingMachineProductManager implements ProductManager {
  private products: Product[] = [];

  addProduct(newProduct: Product): void {
    checkDuplicatedProductName(this.products, newProduct);

    this.products.push(newProduct);
  }

  getTargetProduct(targetName: string): Product {
    return this.products.find((product) => product.name === targetName);
  }

  getProducts(): Product[] {
    return this.products;
  }

  editProduct(editProductName: string, targetProduct: Product): void {
    const editIndex = this.products.findIndex(
      (product) => product.name === editProductName
    );
    const duplicatedNameIndex = this.products.findIndex(
      (product) => product.name === targetProduct.name
    );

    if (editIndex === -1) return;

    checkEditDuplicateName(editIndex, duplicatedNameIndex);

    this.products.splice(editIndex, 1, targetProduct);
  }

  deleteProduct(deleteProductName: string): void {
    this.products = this.products.filter(
      (product) => product.name !== deleteProductName
    );
  }

  editQuantity(editProduct: Product): void {
    const editIndex = this.products.findIndex(
      (product) => product.name === editProduct.name
    );

    if (editIndex === -1) return;

    this.products.splice(editIndex, 1, editProduct);
  }
}
