import { IProduct } from '../manager/Interface';

class Products {
  products: Array<IProduct> = [];

  setProducts(products) {
    this.products = products;
    console.log(this.products);
  }
}

export default new Products();
