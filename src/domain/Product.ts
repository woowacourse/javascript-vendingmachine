interface IProduct {
  name: string;
  price: number;
  quantity: number;
}

class Product implements IProduct {
  name: string;
  price: number;
  quantity: number;

  constructor(product: Product) {
    this.update(product);
  }

  update(product: Product) {
    this.name = product.name;
    this.price = product.price;
    this.quantity = product.quantity;
  }
}

export default Product;
