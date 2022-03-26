export interface Product {
  name: string;
  price: number;
  quantity: number;
}

export interface ProductManageInterface {
  addProduct: (product: Product) => void;
  getProducts: () => Product[];
  modifyProduct: (index: number, product: Product) => void;
  deleteProduct: (index: number) => void;
}
