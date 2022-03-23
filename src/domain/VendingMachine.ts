import Coin from './Coin';
import Product from './Product';

interface IVendingMachine {
  amount: Coin;
  products: Product[];
}

class VendingMachine implements IVendingMachine {
  amount: Coin;
  products: Product[];

  constructor() {
    this.amount = new Coin();
    this.products = [];
  }

  addProduct(product: Product) {
    this.products.push(new Product(product));
  }

  updateProduct(targetName: string, product: Product) {
    const target = this.products.find((product) => product.name === targetName);

    target.update(product);
  }

  deleteProduct(name: string) {
    this.products = this.products.filter((product) => product.name !== name);
  }

  charge(inputMoney: number) {
    this.amount.randomGenarate(inputMoney);
  }
}

export default VendingMachine;
