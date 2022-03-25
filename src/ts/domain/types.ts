export interface ProductInfo {
  name: string;
  price: number;
  quantity: number;
}

export type ProductInfoUnionType = keyof ProductInfo;
