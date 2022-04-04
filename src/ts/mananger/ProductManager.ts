import {
  verifyDuplicateName,
  verifyProductName,
  verifyProductPrice,
  verifyProductQuantity,
  verifyPurchaseAmount,
} from "../utils/validation";

interface ProductManagerInterface {
  getProducts(): Product[];
  getPurchaseAmount(): number;
  addProduct(product: Product): void;
  removeProduct(name: string): void;
  editProduct(editProduct: Product, prevName: string): void;
  addPurchaseAmount(amount: number): void;
}

export interface Product {
  name: string;
  price: number;
  quantity: number;
}

class ProductManager implements ProductManagerInterface {
  private products: Product[] = [];
  private purchaseAmount = 0;

  getProducts() {
    return this.products;
  }

  getPurchaseAmount() {
    return this.purchaseAmount;
  }

  addProduct(newProduct: Product) {
    verifyProductName(newProduct.name);
    verifyProductPrice(newProduct.price);
    verifyProductQuantity(newProduct.quantity);
    verifyDuplicateName(this.products, newProduct);

    this.products.push(newProduct);
  }

  removeProduct(name: string) {
    this.products = this.products.filter((product) => product.name !== name);
  }

  editProduct(editProduct: Product, prevName: string) {
    verifyProductName(editProduct.name);
    verifyProductPrice(editProduct.price);
    verifyProductQuantity(editProduct.quantity);

    this.products = this.products.filter((product) => product.name !== prevName);
    verifyDuplicateName(this.products, editProduct);
    this.products.push(editProduct);
  }

  addPurchaseAmount(amount: number) {
    verifyPurchaseAmount(amount);

    this.purchaseAmount += amount;
  }
}

export default ProductManager;
