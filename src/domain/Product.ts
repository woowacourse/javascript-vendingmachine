interface IProduct {
  name: string;
  price: number;
  quantity: number;
}

class Product implements IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;

  constructor(product: Product, id = Math.random().toString(36).substring(2, 9)) {
    this.id = id;
    this.update(product);
  }

  update(product: IProduct) {
    this.name = product.name;
    this.price = product.price;
    this.quantity = product.quantity;
  }

  purchase() {
    this.quantity -= 1;
  }
}

export { IProduct, Product };
