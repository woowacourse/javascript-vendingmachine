import { IProduct, TProduct } from './types';
import { ERROR_MSG } from '../utils/constants';

class Product implements IProduct {
  product: TProduct;
  constructor(name, price, quantity) {
    this.product = {
      id: this.generateProductId(name),
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
  editProductInfo({ name, price, quantity }) {
    this.product = {
      ...this.product,
      name: name ?? this.product.name,
      price: price ?? this.product.price,
      quantity: quantity ?? this.product.quantity,
    };
  }
  generateProductId(name) {
    /** 나중에 중복 점검 필요 */
    return `${name}${[...new Array(10)].map(() => Math.floor(Math.random() * 10)).join('')}`;
  }
}

export default Product;
