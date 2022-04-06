import { ProductInfo } from '../interface';

class Products {
  products: Array<ProductInfo> = [];

  setProducts(products) {
    this.products = products;
  }
}

export default new Products();
