interface Product {
  name: string;
  price: number;
  count: number;
  id: number;
}

interface Add {
  (newProduct: Product): void;
}

interface Update {
  (id: number, name?: string, price?: number, count?: number): void;
}

interface Delete {
  (id: number): void;
}

export interface ProductDomain {
  product: Product[];

  add: Add; // 상품이 추가됨

  update: Update; // 상품을 수정할수 있음

  delete: Delete; // 상품을 삭제할수 있음
}
