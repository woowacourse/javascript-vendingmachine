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

export interface Buy {
  (name: string): Product;
}

export interface ProductDomain {
  products: Product[];

  add: Add; // 상품이 추가됨

  getProducts: GetProducts; // 상품을 가져옴

  update: Update; // 상품을 수정할수 있음

  delete: Delete; // 상품을 삭제할수 있음

  buy: Buy; // 상품을 구매할수 있음
}
