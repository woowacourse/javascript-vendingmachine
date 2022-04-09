import { ERROR_MSG } from '../utils/constants/error';
import { IProduct, TProduct } from './types';
const { generateNonDuplicatedId } = (function () {
  const history = new Set();
  function generateId(name: string) {
    return `${name}${[...new Array(10)].map(() => Math.floor(Math.random() * 10)).join('')}`;
  }
  return {
    generateNonDuplicatedId(name: string) {
      history.forEach(item => console.log(item));
      let id = generateId(name);
      while (history.has(id)) {
        id = generateId(name);
      }
      history.add(id);
      return id;
    },
  };
})();
class Product implements IProduct {
  product: TProduct;
  constructor(name: string, price: number, quantity: number) {
    this.product = {
      id: generateNonDuplicatedId(name),
      name,
      price,
      quantity,
    };
  }

  purchaseProduct(money) {
    if (this.product.quantity === 0) {
      throw new Error(ERROR_MSG.PRODUCT_SOLD_OUT);
    }

    if (money < this.product.price) {
      throw new Error(ERROR_MSG.NOT_ENOUGH_MONEY);
    }

    this.product.quantity--;
  }

  getProductInfo() {
    return this.product;
  }

  editProductInfo({ name, price, quantity }: { name: string; price: number; quantity: number }) {
    this.product = {
      ...this.product,
      name: name ?? this.product.name,
      price: price ?? this.product.price,
      quantity: quantity ?? this.product.quantity,
    };
  }
}

export default Product;
