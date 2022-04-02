export interface Product {
  name: string;
  price: number;
  quantity: number;
}

export interface ProductManager {
  addProduct(newProduct: Product): void;
  getTargetProduct(name: string): Product;
  getProducts(): Product[];
  editProduct(name: string, targetProduct: Product): void;
  deleteProduct(name: string): void;
  editQuantity(editProduct: Product): void;
}
