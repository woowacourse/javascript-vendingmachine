import { ERROR_MESSAGE } from '../constants/errorConstants';
import { ItemType } from '../types/types';

const ProductAPI = {
  BASE_URL: 'https://vending-machine-kamwoo.herokuapp.com',
  TYPES: {
    PRODUCTS: '/products',
    MONEY: '/money',
  },

  async getProducts() {
    const response = await fetch(this.BASE_URL + this.TYPES.PRODUCTS, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.PRODUCT.FAILED_GET_ITEM);
    }

    const productList = await response.json();
    return productList;
  },

  async addProduct(item: ItemType) {
    const response = await fetch(this.BASE_URL + this.TYPES.PRODUCTS, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.PRODUCT.FAILED_SAVE_ITEM);
    }

    const product = await response.json();
    return product;
  },

  async deleteProduct(item: ItemType) {
    const response = await fetch(this.BASE_URL + this.TYPES.PRODUCTS + `/${item.id}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.PRODUCT.FAILED_DELETE_ITEM);
    }
  },

  async updateProduct(item: ItemType) {
    const response = await fetch(this.BASE_URL + this.TYPES.PRODUCTS + `/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.PRODUCT.FAILED_EDIT_ITEM);
    }

    const product = await response.json();
    return product;
  },

  async getMoney() {
    const response = await fetch(this.BASE_URL + this.TYPES.MONEY, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.PRODUCT.FAILED_GET_MONEY);
    }

    const { number } = await response.json();
    return number;
  },

  async updateMoney(money: number) {
    const response = await fetch(this.BASE_URL + this.TYPES.MONEY, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ number: money }),
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.PRODUCT.FAILED_UPDATE_MONEY);
    }
  },
};

export default ProductAPI;
