import { ISingleProduct } from "./product.interface";

interface INewProduct {
  name: string;
  price: number;
  count: number;
}

export interface IAdd {
  (newProduct: INewProduct): ISingleProduct;
}

export interface IUpdate {
  (id: string, name?: string, price?: number, count?: number): ISingleProduct;
}

export interface IDelete {
  (id: string): void;
}

export interface IGetProducts {
  (): ISingleProduct[];
}

export interface IProductProcessMachine {
  products: ISingleProduct[];

  add: IAdd;

  getProducts: IGetProducts;

  update: IUpdate;

  delete: IDelete;
}
