export class Product {
  #name: string;
  #price: number;
  #quantity: number;

  constructor(name: string, price: number, quantity: number) {
    this.#name = name;
    this.#price = price;
    this.#quantity = quantity;
  }

  setName(name: string) {
    this.#name = name;
  }

  setPrice(price: number) {
    this.#price = price;
  }

  setQuantity(quantity: number) {
    this.#quantity = quantity;
  }
}
