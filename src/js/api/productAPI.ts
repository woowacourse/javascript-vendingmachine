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
      throw new Error('상품을 가져오는데 실패했습니다.');
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
      throw new Error('상품을 저장하는데 실패했습니다.');
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
      throw new Error('상품을 삭제하는데 실패했습니다.');
    }
  },

  async updateProduct(item: ItemType) {
    const response = await fetch(this.BASE_URL + this.TYPES.PRODUCTS + `/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error('상품을 수정하는데 실패했습니다.');
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
      throw new Error('잔돈을 가져오는데 실패했습니다.');
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
      throw new Error('잔돈을 업데이트하는데 실패했습니다.');
    }
  },
};

export default ProductAPI;
