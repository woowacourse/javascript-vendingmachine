import { IProduct, TProduct } from './types';
import { ERROR_MSG } from '../utils/constants';
const { generateNonDuplicatedId } = (function () {
  const memo = {};
  function generateId(name: string) {
    return `${name}${[...new Array(10)].map(() => Math.floor(Math.random() * 10)).join('')}`;
  }
  return {
    generateNonDuplicatedId(name: string) {
      let id = generateId(name);
      while (memo[id]) {
        id = generateId(name);
      }
      memo[id] = id;
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

  purchaseProduct() {
    if (this.product.quantity === 0) {
      throw new Error(ERROR_MSG.PRODUCT_SOLD_OUT);
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
