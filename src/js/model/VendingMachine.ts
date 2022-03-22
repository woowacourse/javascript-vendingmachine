interface Coin {
  coin10: number;
  coin50: number;
  coin100: number;
  coin500: number;
}

interface Product {
  name: string;
  amount: number;
  price: number;
}

export default class VendingMachine {
  products: Array<Product>; // name amount price
  changes: Coin; // 자판기가 보유하고 있는 돈 = 잔돈
  totalMoney: number;

  constructor() {
    this.products = [];
    this.changes = { coin10: 0, coin50: 0, coin100: 0, coin500: 0 };
    this.totalMoney = 0;
  }

  addProduct(product: Product) {
    const productIndex = this.findProductIndex(product.name);
    const isExist = productIndex >= 0;

    if (isExist) {
      throw new Error('이미 존재하는 이름의 상품입니다.');
      return;
    }

    this.products.push(product);
  }

  findProductIndex(name: string) {
    return this.products.findIndex(product => product.name === name);
  }

  removeProduct(product: Product) {
    const productIndex = this.findProductIndex(product.name);
    const isExist = productIndex > 0;

    if (isExist) {
      this.products.splice(productIndex, 1);
    }
  }

  modifyProduct(oldProduct: Product, newProduct: Product) {
    const oldProductIndex = this.findProductIndex(oldProduct.name);
    this.products[oldProductIndex] = newProduct;
  }

  inputChanges(money: number) {
    // 1. 돈이 10원으로 나누어지는지 -> 어디에 로직을 둘것인지 킵

    if (money > 100000) {
      alert('자판기가 보유할 수 있는 최대 금액은 100,000원 입니다.');
      return;
    }

    this.totalMoney += money;

    const coin = this.getChangeCoin(money);

    switch (coin) {
      case 500:
        this.changes.coin500 += 1;
        break;
      case 100:
        this.changes.coin100 += 1;
        break;
      case 50:
        this.changes.coin50 += 1;
        break;
      case 10:
        this.changes.coin10 += 1;
        break;
    }
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max + 1); // 0 ~ max
  }

  getChangeCoin(money: number) {
    const coins = [500, 100, 50, 10].filter(coin => coin <= money);
    const index = this.getRandomInt(coins.length - 1);
    return coins[index];
  }
}
