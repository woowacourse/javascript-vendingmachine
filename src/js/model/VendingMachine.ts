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

class VendingMachine {
  products: Array<Product>; // name amount price
  changes: Coin; // 자판기가 보유하고 있는 돈 = 잔돈

  constructor() {
    this.products = [];
    this.changes = { coin10: 0, coin50: 0, coin100: 0, coin500: 0 };
  }

  addProduct(product: Product) {
    const productIndex = this.findProductIndex(product.name);
    const isExist = productIndex > 0;

    if (isExist) {
      alert('이미 존재하는 이름의 상품입니다.');
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
}
