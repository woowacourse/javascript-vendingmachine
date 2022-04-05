import { Product } from './domain/Product';

const storage = {
  setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getLocalStorage(key: string) {
    return localStorage.getItem(key);
  },

  getProducts(): Product[] {
    return this.getLocalStorage('products') ? JSON.parse(this.getLocalStorage('products')) : [];
  },

  getAmount(): number[] {
    return this.getLocalStorage('amount') ? Object.values(JSON.parse(this.getLocalStorage('amount'))) : [0, 0, 0, 0];
  },

  getUserMoney(): number {
    return this.getLocalStorage('userMoney') ? JSON.parse(this.getLocalStorage('userMoney')) : 0;
  },

  getUserInfo() {
    return this.getLocalStorage('userInfo') ? JSON.parse(this.getLocalStorage('userInfo')) : {};
  },

  getAccessToken() {
    return this.getLocalStorage('accessToken') ? JSON.parse(this.getLocalStorage('accessToken')) : {};
  },
};

export default storage;
