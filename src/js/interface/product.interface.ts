export interface Product {
  name: string;
  price: number;
  count: number;
}

export interface Add {
  (newProduct: Product): void;
}

export interface Update {
  (idx: number, name?: string, price?: number, count?: number): void;
}

export interface Delete {
  (idx: number): void;
}

export interface GetProducts {
  (): Product[];
}

export interface ProductDomain {
  products: Product[];

  add: Add; 

  getProducts: GetProducts; 

  update: Update;

  delete: Delete;
}
