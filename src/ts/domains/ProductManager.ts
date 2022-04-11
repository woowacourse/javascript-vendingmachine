import { ProductManager, Product } from '../types/ProductManager';
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

    this.products = this.products.map((product) =>
      product.name === targetName ? editedProduct : product
    );
  }

  deleteProduct(deleteProductName) {
    this.products = this.products.filter(
      (product) => product.name !== deleteProductName
    );
  }

  sellProduct(productName) {
    const targetProduct = this.products.find(
      (product) => product.name === productName
    );
    targetProduct.quantity -= 1;
  }

  getProductPrice(productName) {
    return this.getTargetProduct(productName).price;
  }

  getProductQuantity(productName) {
    return this.getTargetProduct(productName).quantity;
  }
}

export const productManager = new VendingMachineProductManager();
