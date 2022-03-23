interface IProduct {
  name: string;
  price: number;
  quantity: number;
}

class Product implements IProduct {
  name: string;
  price: number;
  quantity: number;

  constructor({ name, price, quantity }: Product) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  update({ name, price, quantity }: Product) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}

export default Product;
