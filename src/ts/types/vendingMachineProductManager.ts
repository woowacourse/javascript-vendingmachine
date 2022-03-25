export interface product {
  name: string;
  price: number;
  quantity: number;
}

export interface ProductManager {
  addProduct(newProduct: product): void;
  getTargetProduct(name: string): product;
  getProducts(): product[];
  editProduct(name: string, targetProduct: product): void;
  deleteProduct(name: string): void;
}
